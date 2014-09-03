package com.free.zf.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Plot;

@Service
public class PlotService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  
  public void save(Plot p) {
    dao.save(p);
  }
  
  public void add(Plot p) {
    try {
      dao.add(p);
      dao.flush(); // 没有flush(), tx-advice.order = Integer.MAX??, AjaxAdvisor会先拦截
    } catch (Exception e) {
      throw new RuntimeException("已有相同名称的地块!", e); 
    }
  }

  public List<Plot> search(Map<String, Object> params) {
    StringBuilder hql = new StringBuilder("select p from Plot p");
    return dao.find(Plot.class, hql.toString());
  }

}
