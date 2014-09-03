package com.free.zf.service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.Application;
import com.free.annotation.MethodCache;
import com.free.annotation.RequiresRoles;
import com.free.exception.CommonRuntimeException;
import com.free.util.CryptUtil;
import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Access;
import com.free.zf.dto.Access.Role;
import com.free.zf.dto.User;
import com.free.zf.dto.User.Status;

@Service
public class UserService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  @MethodCache(name = "USER_LIST")
  public List<User> list() {
    String hql = "select u from User u left outer join fetch u.person p";
    return dao.find(User.class, hql);
  }

  @MethodCache(name = "USER")
  public User get(String username) {
    StringBuilder hql = new StringBuilder("select u from User u left outer join fetch u.person p where u.username=?");
    List<User> l = dao.find(User.class, hql.toString(), username);
    User u = l.size() > 0 ? l.get(0) : null;
    if (u != null) {
      AccessService as = Application.getBean(AccessService.class);
      u.setRoles(as.roles(u));
    }
    return u;
  }

  public Long countAdmin() {
    Map<String, Object> params = new HashMap<String, Object>();
    params.put("status", Status.U);
    params.put("role", new Role[] { Role.admin });
    return count(params);
  }

  /**
   * 返回系统中满足条件的用户数
   * 
   * @return
   */
  protected Long count(Map<String, Object> params) {
    StringBuilder hql = new StringBuilder("select count(u) from User u where 1=1");
    if (params == null)
      return 0L;
    Map<String, Object> q = new HashMap<String, Object>();
    Object o;
    Status[] ss;
    Role[] rs;
    int i;
    if (params.containsKey("status")) {
      o = params.get("status");
      if (o instanceof Status)
        ss = new Status[] { (Status) o };
      else if (o instanceof Status[])
        ss = (Status[]) o;
      else
        ss = new Status[] {};
      for (i = 0; i < ss.length; i++) {
        hql.append(" and u.status=:s" + i);
        q.put("s" + i, ss[i]);
      }
    }
    if (params.containsKey("role")) {
      o = params.get("role");
      if (o instanceof Role)
        rs = new Role[] { (Role) o };
      else if (o instanceof Role[])
        rs = (Role[]) o;
      else
        rs = new Role[] {};
      for (i = 0; i < rs.length; i++) {
        hql.append(" and exists (select 1 from Access a where a.user.id = u.id and a.role=:r" + i + ")");
        q.put("r" + i, rs[i]);
      }
    }
    return dao.findSingle(Long.class, hql.toString(), q);
  }

  public void add(User u) {
    if (u.getSalt() == null) u.setSalt(CryptUtil.genSalt());
    dao.add(u);
    dao.flush();
  }

  public void save(User u) {
    dao.save(u);
  }

  @RequiresRoles(value = { Role.admin })
  public void disable(User u) {
    u.setStatus(Status.X);
    dao.save(u);
  }

  @RequiresRoles(value = { Role.admin, Role.poweruser })
  public void enable(User u) {
    u.setStatus(Status.U);
    dao.save(u);
  }

  public void addRole(User u, Role r) {
    Access a = new Access();
    a.setUser(u);
    a.setRole(r);
    dao.add(a);
  }
  
  public void addRoles(User u, Role[] rs) {
    for (Role r : rs)
      addRole(u, r);
  }

  public void delRole(User u, Role r) {
    delRoles(u, new Role[] { r });
  }

  public void delRoles(User u) {
    delRoles(u, null);
  }

  public void delRoles(User u, Role[] rs) {
    AccessService as = Application.getBean(AccessService.class);
    List<Access> la = as.list(u);
    Set<Role> s = new HashSet<Role>();
    if (rs != null) {
      for (Role r : rs)
        s.add(r);
    }
    for (Access a : la) {
      if (s.contains(a.getRole()) || rs == null)
        dao.delete(a);
    }
  }

  public static User login(String username, String password) throws CommonRuntimeException {
    return login(username, password, false);
  }

  public static User login(String username, String password, boolean rememberMe) throws CommonRuntimeException {
    AuthenticationToken token = new UsernamePasswordToken(username, password, rememberMe);
    return login(token);
  }

  public static User login(AuthenticationToken token) throws RuntimeException {
    Subject cu = SecurityUtils.getSubject();
    User u = null;
    if (!cu.isAuthenticated()) {
      try {
        cu.login(token);
      } catch (IncorrectCredentialsException ice) {
        throw new RuntimeException("密码错误!");
      } catch (DisabledAccountException dae) {
        throw new RuntimeException("此账号已被禁用!");
      } catch (UnknownAccountException uae) {
        throw new RuntimeException("系统未找到对应用户!");
      } catch (AuthenticationException ae) {
        throw new RuntimeException("其他验证错误!");
      }
    }
    if (cu.isAuthenticated()) {
      u = UserService.getLoginedAccount(true);
    }
    return u;
  }

  public static void logout() {
    Subject cu = SecurityUtils.getSubject();
    /**
     * logout后session会被销毁, 再登陆时vcode=null, 需要处理一下, 可以: - logout前保存vcode,
     * logout后将vcode放入session, 或 - 使用javascript进行控制
     */
    cu.logout();
  }

  public static User getLoginedAccount() {
    return getLoginedAccount(false);
  }

  public static User getLoginedAccount(boolean refresh) {
    Subject cu = SecurityUtils.getSubject();
    /**
     * System.out.println(cu.getSession(false).getId() + ":" +
     * cu.isAuthenticated() + ":" + cu.getPrincipal()); IE/Chrome下session
     * id会变??? FF下正常!!! 1. securityManager.sessionMode = http时session在各浏览器中正常
     * securityManager.sessionMode = native时IE/Chrome不正常(session id会变), FF下正常,
     * 需要配置cache??? 2. session过期后从cookie中取到的cu未经过验证, 需要程序进行自动登录!!!??? 3.
     * authc是认证用户(rememberMe的用户也必须再次登录才能访问该url), 配置成user才能让rememberMe用户也可以访问!!!
     * 4. 配置成user后不检验密码, 需要自定义Filter检验密码是否修改, 如改过需要重新验证 5.
     * SubjectContext无法在程序中获取?? 6. 最佳方案: 自定义Filter使用cookie中取到的cu进行自动登录(hash比较),
     * 失败后重新登录 - 解决session问题 - 验证通过后, 模拟org
     * .apache.shiro.subject.support.DefaultSubjectContext. setAuthenticated
     * ()方法或者通过realm?
     */
    /*
     * Account acc1, acc2; acc1 = cu.getPrincipal() != null ? (Account)
     * cu.getPrincipal() : null; AccountService as =
     * Application.getBean(AccountService.class); acc2 = acc1 != null ?
     * as.get(acc1.getPernr()) : null; // 修改密码后需要重新登录!!! if (acc1 != null &&
     * acc2 != null && !acc1.getPassword().equals(acc2.getPassword())) {
     * cu.logout(); acc2 = null; } vars.put("IDS_ACC", (acc2 == null) ? false :
     * acc2);
     */
    User u = (cu.getPrincipal() != null && cu.isAuthenticated()) ? (User) cu.getPrincipal() : null;
    if (refresh) {
      UserService as = Application.getBean(UserService.class);
      Session sess = cu.getSession();
      u.setLastLogin(Calendar.getInstance());
      u.setLastLoginIp(sess.getHost());
      as.save(u);
    }
    return u;
  }
}
