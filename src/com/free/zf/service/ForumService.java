package com.free.zf.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Forum;

@Service
public class ForumService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  public Forum get(String name) {
    List<Forum> forums = dao.find(Forum.class, "select f from Forum f where f.name = ?", name);
    return forums.size() > 0 ? forums.get(0) : null;
  }

  public void add(Forum f) {
    dao.add(f);
  }

  public void save(Forum f) {
    dao.save(f);
  }

  public List<Forum> list() {
    return dao.find(Forum.class, "select f from Forum f order by f.idx asc");
  }

}
