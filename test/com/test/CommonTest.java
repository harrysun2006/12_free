package com.test;

import java.sql.Connection;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.free.Application;
import com.free.misc.Mocker;
import com.free.util.CacheUtil;
import com.free.util.CryptUtil;
import com.free.util.JDBCUtil;
import com.free.zf.dto.Access.Role;
import com.free.zf.dto.User;
import com.free.zf.service.UserService;
import com.jolbox.bonecp.BoneCPDataSource;
import com.test.aop.AOPTest;
import com.test.service.AService;
import com.test.service.BServiceImpl;

/**
 * 测试一些组件用法等
 * 
 * @author Harry Sun <harrysun2006@gmail.com>
 */
public class CommonTest {

  private String name;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  // 测试UUID
  protected static void test01() throws Exception {
    // 82f24d0e-cae6-44a2-9471-5ca74a003868
    // 1ccc2e21-a19c-49f8-bb8e-94acb82b934e
    String id = UUID.randomUUID().toString();
    System.out.println(id);
    long l = Integer.MAX_VALUE;
    System.out.println(l);
  }

  // 测试AOP, 使用spring定义切面
  protected static void test02() throws Exception {
    ApplicationContext ctx = new ClassPathXmlApplicationContext("test-aop1.xml");
    AOPTest test = new AOPTest();
    test.setAService((AService) ctx.getBean("aService"));
    test.setBService((BServiceImpl) ctx.getBean("bService"));
    test.testCall();
    test.testThrow();
  }

  // 测试AOP, 使用spring定义切面, 切面类使用注解
  protected static void test03() throws Exception {
    ApplicationContext ctx = new ClassPathXmlApplicationContext("test-aop2.xml");
    AOPTest test = new AOPTest();
    test.setAService((AService) ctx.getBean("aService"));
    test.setBService((BServiceImpl) ctx.getBean("bService"));
    test.testCall();
    test.testThrow();
  }

  // 测试UserService
  protected static void test05() throws Exception {
    UserService us = Application.getBean(UserService.class);
    List<User> l = us.list();
    System.out.println(String.format("Total %d users in system!", l.size()));
    for (User u : l)
      System.out.println(u);
  }

  // 测试BoneCP数据源
  protected static void test06() throws Exception {
    BoneCPDataSource ds = new BoneCPDataSource();
    // ds.setJdbcUrl("jdbc:h2:tcp://localhost/h2/db;schema=IDS");
    // ds.setUsername("sa");
    // ds.setPassword("sa");
    ds.setDriverClass("oracle.jdbc.driver.OracleDriver");
    ds.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:XE");
    ds.setUsername("ZF");
    ds.setPassword("admin");
    ds.setMaxConnectionsPerPartition(1);
    ds.setMinConnectionsPerPartition(1);
    Connection conn = ds.getConnection();
    String sql = "SELECT * FROM T_DICT";
    Object[] data = JDBCUtil.query(conn, sql);
    conn.close();
    ds.close();
    for (Object d : data)
      System.out.println(d);
  }

  // add user
  protected static void test07() throws Exception {
    String salt = CryptUtil.genSalt();
    User u = new User();
    u.setNickname("test");
    u.setUsername("test");
    u.setSalt(salt);
    u.setPassword(new Md5Hash("123456", salt).toBase64());
    u.setLastLogin(Calendar.getInstance());
    u.setLastLoginIp("127.0.0.1");
    UserService us = Application.getBean(UserService.class);
    us.add(u);
    us.addRoles(u, new Role[] { Role.worker, Role.view });
  }

  // add user's roles
  protected static void test08() throws Exception {
    UserService us = Application.getBean(UserService.class);
    User u = us.get("test");
    us.addRoles(u, new Role[] { Role.worker, Role.view, Role.admin, Role.poweruser });
    // us.addRole(u, Role.admin);
  }

  // remove user's roles
  protected static void test09() throws Exception {
    UserService us = Application.getBean(UserService.class);
    User u = us.get("test");
    // us.delRoles(u, new Role[]{Role.view, Role.admin});
    us.delRoles(u);
  }

  // get admin's count
  protected static void test10() throws Exception {
    UserService us = Application.getBean(UserService.class);
    System.out.println("admin count: " + us.countAdmin());
  }

  // shiro aop at @Service
  protected static void test11() throws Exception {
    UserService us = Application.getBean(UserService.class);
    UserService.login("admin", "123456");
    User u = us.get("admin");
    us.enable(u);
  }

  // cache aop
  protected static void test12() throws Exception {
    System.out.println(new Md5Hash("123456", "DCBA").toBase64());
    UserService us = Application.getBean(UserService.class);
    List<User> l = us.list();
    User u = us.get("admin");
    System.out.println(l.size() + ": " + u);
    List<Object> caches = CacheUtil.list();
    System.out.println(caches.size());
  }

  public static void main(String[] argv) throws Exception {
    try {
      // test12(); System.exit(0);
      // Mocker.init("test");
      Mocker.init();
      test07();
    } catch (Exception e) {
      e.printStackTrace();
    }
    System.exit(0);
  }

}
