package com.free.zf.ajax;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.free.Application;
import com.free.Setting;
import com.free.util.JSONUtil;
import com.free.zf.dto.User;
import com.free.zf.service.UserService;

@Controller
// implements ServletContextAware有问题, 导致controller无法正常工作???
public class PageController {

  /**
   * 设置全局变量, 应用程序的配置等 传递JSON数据对象可以通过2种方法: 1. 使用pageContext对象, javascript中定义var
   * APP_DATA = $.evalJSON('${APP_DATA}'); 2. 使用Ajax调用 方法1虽然减少1次请求, 但需要处理'/",
   * 查看页面源码可以看到数据, 程序出错会影响正常界面显示 还是倾向于使用方法2, APP_DATA暂时保留
   * 
   * @param name
   * @param data
   * @return
   */
  public ModelAndView mav(String name, Map<String, Object> data) {
    ModelAndView mav = new ModelAndView(name);
    String title = Application.getString("app.title", Application.get("app.title"));
    User u = UserService.getLoginedAccount();
    mav.addObject("APP_TITLE", title);
    mav.addObject("APP_VER", Application.VERSION);
    mav.addObject("APP_CONTEXT_PATH", Application.CONTEXT_PATH);
    mav.addObject("APP_PAGE", name);
    mav.addObject("APP_DATA", "{}");
    mav.addObject("APP_USE_VCODE", Setting.getBoolean(Setting.APP_USE_VCODE));
    mav.addObject("APP_ACC", u == null ? false : getJSON(u));
    mav.addObject("APP_USER",u == null ? false : u.getNickname());
    return mav;
  }

  public ModelAndView mav(String name) {
    return mav(name, null);
  }

  public String getJSON(Object data) {
    String r = "", t;
    try {
      r = JSONUtil.getJSON(data);
      r = r.replace("'", "\\'");
      r = r.replace("\\\"", "\\\\\"");
      // System.out.println(r);
    } catch (Exception e) {
      t = e.getMessage();
      t = t.replace("\"", "\\\\\"");
      r = "{\"error\": \"" + t + "\"}";
    }
    return r;
  }

  /**
   * 检查系统是否有管理用户, 如果没有, 则跳到setup页面; 否则进入index页面
   * 
   * @return
   */
  @RequestMapping(value = "", method = RequestMethod.GET)
  public ModelAndView index() {
    UserService us = Application.getBean(UserService.class);
    ModelAndView mav;
    if (us.countAdmin() == 0) {
      mav = mav("setup");
    } else {
      Subject cu = SecurityUtils.getSubject();
      if (cu.isAuthenticated()) mav = mav("index");
      else mav = mav("login");
    }
    return mav;
  }

  @RequestMapping(value = "/login", method = RequestMethod.GET)
  public ModelAndView login(HttpServletRequest request, HttpServletResponse response) throws IOException {
    ModelAndView mav = index();
    if ("XMLHttpRequest".equals(request.getHeader("x-requested-with"))) {
      Writer w = response.getWriter();
      response.addHeader("ERROR-CODE", "not.login");
      w.write("not.login"); // 必须输出非json格式的内容, 否则客户端$.ajax将回调success
      w.flush();
      w.close();
    }
    return mav;
  }

  @RequestMapping(value = "/logout", method = {RequestMethod.GET, RequestMethod.POST})
  public ModelAndView logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService.logout();
    ModelAndView mav = index();
    return mav;
  }

  @RequestMapping(value = "/plot", method = RequestMethod.GET)
  public ModelAndView plot() {
    return mav("plot");
  }
  
  @RequestMapping(value = "/garden", method = RequestMethod.GET)
  public ModelAndView garden() {
    return mav("garden");
  }

  @RequestMapping(value = "/bbs", method = RequestMethod.GET)
  public ModelAndView bbs() {
    return mav("bbs");
  }

  @RequestMapping(value = "/profile", method = RequestMethod.GET)
  public ModelAndView profile() {
    return mav("profile");
  }

  @RequestMapping(value = "/admin", method = RequestMethod.GET)
  public ModelAndView admin() {
    return mav("admin");
  }

  @RequestMapping(value = "/test", method = RequestMethod.GET)
  public ModelAndView test(HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> data = new HashMap<String, Object>();
    ModelAndView mav = mav("test", data);
    // 之后还会有RequestDispatcher,
    // 此处的request和response和页面中的${pageContext.request}/${pageContext.response}不一样!!!
    mav.addObject("userAgent", request.getHeader("userAgent"));
    mav.addObject("contentType", response.getContentType());
    return mav;
  }

  @RequestMapping(value = "/error", method = RequestMethod.GET)
  public ModelAndView error(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Map<String, Object> data = new HashMap<String, Object>();
    ModelAndView mav = mav("error", data);
    mav.addObject("ERROR", getJSON(request.getAttribute("error")));
    return mav;
  }

}
