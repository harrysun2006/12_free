package com.test.service;

/**
 * 接口A的实现类
 */
public class AServiceImpl implements AService {

  public void barA() {
    System.out.println("AServiceImpl.barA()");
  }

  public void fooA(String _msg) {
    System.out.println("AServiceImpl.fooA(msg:" + _msg + ")");
  }
}