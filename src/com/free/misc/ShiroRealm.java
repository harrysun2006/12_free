package com.free.misc;

import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.SimpleAccount;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.SimpleByteSource;

import com.free.Application;
import com.free.zf.dto.User;
import com.free.zf.service.UserService;

/**
 * 自定义Realm实现特殊需求: 1. IDS.ACCOUNT表中无对应工号的用户时从HR.EMP导入, HR.EMP无对应工号抛错! 2.
 * 未指定超级用户时, 默认超级用户为admin/admin; 指定之后admin/admin无效! 3.
 * shiro.ini中配置[users]会自动创建IniRealm实例! 4. shiro.ini中可以定义多个Realm, 但抛错不好甄别!
 * 查代码ModularRealmAuthenticator
 * .doMultiRealmAuthentication()/AbstractAuthenticator.authenticate()
 * 
 * @author Harry Sun harrysun2006@gmail.com
 */
public class ShiroRealm extends AuthorizingRealm {

  @Override
  public boolean supports(AuthenticationToken token) {
    return true;
  }

  @Override
  protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
    String username = (String) token.getPrincipal();
    AuthenticationInfo info = null;
    UserService us = Application.getBean(UserService.class);

    if (username == null) {
      throw new AccountException("ERROR: null username is NOT allowed!");
    }
    User u = us.get(username);
    String password;
    ByteSource csalt;
    // 父类AuthorizingRealm会调用CredentialsMatcher进行匹配
    if (u != null) {
      if (User.Status.X.equals(u.getStatus()))
        throw new DisabledAccountException("ERROR: user[" + username + "] is disabled!");
      password = u.getPassword();
      csalt = new SimpleByteSource(u.getSalt());
      info = new SimpleAuthenticationInfo(u, password, csalt, getName());
    } else {
      throw new UnknownAccountException("ERROR: user [" + username + "] NOT found!");
    }
    return info;
  }

  @Override
  protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
    User u = (principals.getPrimaryPrincipal() instanceof User) ? (User) principals.getPrimaryPrincipal() : null;
    SimpleAccount sa = (u == null) ? null : new SimpleAccount(u, u.getPassword(), this.getName());
    if (u != null && sa != null) {
      sa.setRoles(u.getRoles());
    }
    return sa;
  }

}
