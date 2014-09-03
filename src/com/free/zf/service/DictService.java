package com.free.zf.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.annotation.MethodCache;
import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Dict;

@Service
public class DictService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  @MethodCache(name = "DICT_ALL")
  public List<Dict> getDicts() {
    return getDicts(null);
  }

  @MethodCache(name = "DICT_CAT")
  public List<Dict> getDicts(Dict.Cat cat) {
    return getDicts1(cat);
  }

  protected List<Dict> getDicts1(Dict.Cat cat) {
    StringBuilder hql = new StringBuilder("select d from Dict d where 1=1");
    if (cat != null)
      hql.append(" and d.cat = ? order by d.idx");
    return dao.find(Dict.class, hql.toString(), cat);
  }

  protected List<Dict> getDicts2(Dict.Cat cat) {
    if (cat == null) {
      return dao.query(Dict.class, "Dict.All");
    } else {
      Map<String, Object> params = new HashMap<String, Object>();
      params.put("cat", cat);
      return dao.query(Dict.class, "Dict.Cat", params);
    }
  }

  public Dict get(Dict.Cat cat, String code) {
    String hql = "select d from Dict d where d.cat = ? and d.code = ?";
    List<Dict> l = dao.find(Dict.class, hql, cat, code);
    return l.size() > 0 ? l.get(0) : null;
  }

  public void add(Dict dict) {
    dao.add(dict);
  }

}
