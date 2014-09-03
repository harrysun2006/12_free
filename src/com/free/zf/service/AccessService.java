package com.free.zf.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Access;
import com.free.zf.dto.Access.Role;
import com.free.zf.dto.User;

@Service
public class AccessService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  public Access get(User u, Role r) {
    Map<String, Object> q = new HashMap<String, Object>();
    StringBuilder hql = new StringBuilder("select a from Access a left outer join fetch a.user u where 1=1");
    if (u.getId() != null) {
      hql.append(" and u.id=:uid");
      q.put("uid", u.getId());
    }
    if (u.getUsername() != null) {
      hql.append(" and u.username=:uname");
      q.put("uname", u.getUsername());
    }
    hql.append(" and a.role=:role");
    q.put("role", r);
    List<Access> l = dao.find(Access.class, hql.toString(), q);
    return l.size() > 0 ? l.get(0) : null;
  }

  public Set<String> roles(User u) {
    Set<String> roles = new HashSet<String>();
    List<Access> l = list(u);
    for (Access a : l) {
      roles.add(a.getRole().name());
    }
    return roles;
  }

  public List<Access> list(User u) {
    Map<String, Object> q = new HashMap<String, Object>();
    StringBuilder hql = new StringBuilder("select a from Access a left outer join fetch a.user u where 1=1");
    if (u != null) {
      if (u.getId() != null) {
        hql.append(" and u.id=:uid");
        q.put("uid", u.getId());
      }
      if (u.getUsername() != null) {
        hql.append(" and u.username=:uname");
        q.put("uname", u.getUsername());
      }
    }
    return dao.find(Access.class, hql.toString(), q);
  }

}
