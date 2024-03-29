package com.free.zf.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Log;

/**
 * use package rather than com.free.zf.service to exclude operations of this
 * class from transaction management
 * 
 * @author Harry Sun harrysun2006@gmail.com
 */
@Service
public class JpaLoggerService {

  /**
   * use daoZF2 to write log to db in another transaction, refer to
   * zf-spring3.xml for detail!!!
   */
  @Autowired
  @Qualifier("daoZF2")
  protected JpaDao dao;

  public void add(Log log) {
    dao.add(log);
  }
}