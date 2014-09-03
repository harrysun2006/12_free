package com.free.zf.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Notice;
import com.free.zf.dto.Notice.Flag;

@Service
public class NoticeService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  public List<Notice> list() {
    return list(null);
  }

  /**
   * Notice.content在列表中缺省不返回!!!
   * 
   * @param options
   * @return
   */
  public List<Notice> list(Map<String, Object> options) {
    if (options == null)
      options = new HashMap<String, Object>();
    StringBuilder sb = new StringBuilder(
        "select new com.sess.ids.dto.Notice(n.id, n.cat, n.dateline, n.sender, n.receiver, n.title, n.flag, n.idx");
    if (options.containsKey("@content"))
      sb.append(", n.content");
    sb.append(") from Notice n ").append(" where n.cat = :cat and n.flag <> :flag").append(" order by n.dateline desc");
    Map<String, Object> params = new HashMap<String, Object>();
    params.put("cat", Notice.Cat.PUBLIC);
    params.put("flag", Notice.Flag.DELETE);
    // params.put("#class", Notice.class);
    return dao.find(Notice.class, sb.toString(), params);
  }

  public Notice get(Integer id) {
    return dao.get(Notice.class, id);
  }

  public void add(Notice notice) {
    dao.add(notice);
  }

  public void save(Notice notice) {
    dao.save(notice);
  }

  public void delete(Notice notice) {
    notice = get(notice.getId());
    notice.setFlag(Flag.DELETE);
    dao.save(notice);
  }
}
