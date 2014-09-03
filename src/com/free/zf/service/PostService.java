package com.free.zf.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Post;
import com.free.zf.dto.Post.Status;
import com.free.zf.dto.Topic;

@Service
public class PostService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  public List<Post> list(Topic topic) {
    return list(topic.getId());
  }

  public List<Post> list(int tid) {
    StringBuilder sb = new StringBuilder("select p from Post p ").append(" left outer join fetch p.creator pc")
        .append(" left outer join fetch pc.profile pcp").append(" where p.topic.id = ? and p.status <> ? ")
        .append(" order by p.dateline asc");
    return dao.find(Post.class, sb.toString(), tid, Post.Status.D);
  }

  public Post get(Integer id) {
    StringBuilder sb = new StringBuilder("select p").append(" from Post p").append(" left outer join fetch p.topic t")
        .append(" left outer join fetch t.forum f").append(" where p.id = ? and p.status <> ?");
    List<Post> l = dao.find(Post.class, sb.toString(), id, Post.Status.D);
    return l.size() > 0 ? l.get(0) : null;
  }

  public void add(Post post) {
    dao.add(post);
  }

  public void save(Post post) {
    dao.save(post);
  }

  public void delete(Post post) {
    post = get(post.getId());
    post.setStatus(Status.D);
    dao.save(post);
    dao.flush();
  }
}
