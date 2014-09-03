package com.free.zf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;

@Service
public class ProfileService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

}
