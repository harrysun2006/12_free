package com.free.zf.ajax;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.Application;
import com.free.util.CryptUtil;
import com.free.zf.dto.Access.Role;
import com.free.zf.dto.User;
import com.free.zf.service.UserService;

@Controller
@RequestMapping("/setup")
public class SetupController {

	/**
	 * 系统初始化 -- 添加管理员用户
	 */
	@RequestMapping(value = "/admin", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Map<String, Object> admin(HttpEntity<User> entity, HttpServletRequest request) {
	  Map<String, Object> r = new HashMap<String, Object>();
	  User u = entity.getBody();
    String p = u.getPassword();
	  String salt = CryptUtil.genSalt(6);
	  u.setSalt(salt);
	  u.setPassword(new Md5Hash(p, salt).toBase64());
	  u.setLastLogin(Calendar.getInstance());
	  u.setLastLoginIp(request.getRemoteAddr());
		UserService us = Application.getBean(UserService.class);
		us.add(u);
		us.addRole(u, Role.admin);
		AuthenticationToken token = new UsernamePasswordToken(u.getUsername(), p, false);
    u = UserService.login(token);
    if (u != null) r.put("APP_ACC", u);
    return r;
	}



}
