package com.free.zf.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Forum;
import com.free.zf.dto.Topic;
import com.free.zf.dto.Topic.Status;

@Service
public class TopicService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  public List<Topic> list(Forum forum) {
    return list(forum, null);
  }

  public List<Topic> list(Forum forum, Map<String, Object> options) {
    return list(forum.getId(), options);
  }

  public List<Topic> list(int fid) {
    return list(fid, null);
  }

  public List<Topic> list(int fid, Map<String, Object> options) {
    return list2(fid, options);
  }

  @SuppressWarnings({ "unchecked", "rawtypes" })
  protected List<Topic> list1(final int fid, Map<String, Object> options) {
    return (List<Topic>) dao.getJpaTemplate().execute(new JpaCallback() {

      @Override
      public Object doInJpa(EntityManager em) throws PersistenceException {
        Query q = em.createNamedQuery("Topic.ListNoContent");
        // q.setParameter(1, fid);
        // q.setParameter(2, Topic.Status.D);
        List l = q.getResultList();
        System.out.println(l.size());
        return new ArrayList<Topic>();
      }
    });
  }

  protected List<Topic> list2(int fid, Map<String, Object> options) {
    if (options == null)
      options = new HashMap<String, Object>();
    StringBuilder sb = new StringBuilder("select new com.sess.ids.dto.Topic(")
        .append("t.id, t.dateline, t.ip, t.title, t.cntView, t.cntReply")
        .append(", t.flag, t.status, t.up, t.down, t.value, t.top").append(", f.id, tc.pernr, tc.name")
        .append(", lp.id, lp.dateline, lpc.pernr, lpc.name");
    if (options.containsKey("@content"))
      sb.append(", t.content, lp.content");
    sb.append(") from Topic t ").append(" left outer join t.forum f").append(" left outer join t.creator tc ")
        .append(" left outer join t.lastPost lp ").append(" left outer join lp.creator lpc ")
        .append(" where t.forum.id = ? and t.status <> ?").append(" order by t.top desc, t.up desc, t.dateline desc");
    return dao.find(Topic.class, sb.toString(), fid, Topic.Status.D);
  }

  public Topic get(Integer id) {
    StringBuilder sb = new StringBuilder("select t").append(" from Topic t").append(" left outer join fetch t.forum f")
        .append(" left outer join fetch t.creator tc").append(" left outer join fetch tc.profile tcp")
        .append(" left outer join fetch t.lastPost lp").append(" left outer join fetch lp.creator lpc")
        .append(" left outer join fetch lpc.profile lpcp").append(" where t.id = ? and t.status <> ?");
    List<Topic> l = dao.find(Topic.class, sb.toString(), id, Topic.Status.D);
    return l.size() > 0 ? l.get(0) : null;
  }

  public void add(Topic topic) {
    dao.add(topic);
  }

  public void save(Topic topic) {
    dao.save(topic);
  }

  public void delete(Topic topic) {
    topic = get(topic.getId());
    topic.setStatus(Status.D);
    dao.save(topic);
    dao.flush();
  }
}
