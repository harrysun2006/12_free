package com.free.zf.ajax;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.Application;
import com.free.Setting;
import com.free.zf.dto.Notice;
import com.free.zf.dto.User;
import com.free.zf.service.NoticeService;
import com.free.zf.service.UserService;

@Controller
public class MiscController {

  @RequestMapping(value = "/data", method = { RequestMethod.POST })
  @ResponseBody
  public Map<String, Object> data(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("APP_TITLE", Application.getString("app.title", Application.get("app.title")));
    data.put("APP_VER", Application.VERSION);
    data.put("APP_CONTEXT_PATH", request.getContextPath());
    data.put("APP_USE_VCODE", Setting.getBoolean(Setting.APP_USE_VCODE));
    User u = UserService.getLoginedAccount();
    data.put("APP_ACC", (u == null) ? false : u);
    return data;
  }

  @RequestMapping(value = "/data/index", method = { RequestMethod.POST })
  @ResponseBody
  public Map<String, Object> index(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Map<String, Object> data = new HashMap<String, Object>();
    NoticeService ns = Application.getBean(NoticeService.class);
    List<Notice> notices = ns.list();
    data.put("notices", notices);
    return data;
  }

  @RequestMapping(value = "/install", method = { RequestMethod.POST })
  @ResponseBody
  public Map<String, Object> install(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Map<String, Object> data = new HashMap<String, Object>();
    NoticeService ns = Application.getBean(NoticeService.class);
    List<Notice> notices = ns.list();
    data.put("notices", notices);
    return data;
  }
}
