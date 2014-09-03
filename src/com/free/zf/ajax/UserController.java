package com.free.zf.ajax;

import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.Constants;
import com.free.Setting;
import com.free.exception.CommonRuntimeException;
import com.free.zf.dto.User;
import com.free.zf.service.UserService;

@Controller
@RequestMapping(value = "/account")
public class UserController {

  @RequestMapping(value = "/login", method = { RequestMethod.GET, RequestMethod.POST })
  public @ResponseBody
  Map<String, Object> login(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    String ivcode = data.containsKey("vcode") ? (String) data.get("vcode") : null;
    boolean rememberMe = data.containsKey("rememberMe") ? (Boolean) data.get("rememberMe") : true;
    String username = (String) data.get("username");
    String password = (String) data.get("password");
    Subject cu = SecurityUtils.getSubject();
    Session sess = cu.getSession();
    String vcode = (String) sess.getAttribute(Constants.CAPTCHA_SESSION_KEY);
    if (Setting.getBoolean(Setting.APP_USE_VCODE, false) && (vcode == null || !vcode.equalsIgnoreCase(ivcode))) {
      throw new CommonRuntimeException("验证码错误!");
    }
    AuthenticationToken token = new UsernamePasswordToken(username, password, rememberMe);
    User u = UserService.login(token);
    if (u != null) r.put("APP_ACC", u);
    return r;
  }

  @RequestMapping(value = "/logout", method = {RequestMethod.GET, RequestMethod.POST})
  public @ResponseBody
  Map<String, Object> logout() {
    Map<String, Object> r = new HashMap<String, Object>();
    UserService.logout();
    return r;
  }

}
