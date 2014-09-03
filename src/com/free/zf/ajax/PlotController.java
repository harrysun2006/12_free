package com.free.zf.ajax;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.Application;
import com.free.zf.dto.Plot;
import com.free.zf.dto.User;
import com.free.zf.service.PlotService;
import com.free.zf.service.UserService;

@Controller
@RequestMapping("/plot")
public class PlotController {

  @RequestMapping(value = "/add", method = { RequestMethod.GET, RequestMethod.POST })
  public @ResponseBody
  Map<String, Object> add(HttpEntity<Plot> entity) {
    Map<String, Object> r = new HashMap<String, Object>();
    PlotService ps = Application.getBean(PlotService.class);
    User me = UserService.getLoginedAccount();
    Plot p = entity.getBody();
    p.setCreator(me);
    p.setCreateTime(Calendar.getInstance());
    ps.add(p);
    r.put("data", "Successful");
    return r;
  }
  
  @RequestMapping(value = "/search", method = { RequestMethod.GET, RequestMethod.POST })
  public @ResponseBody
  Map<String, Object> search(@RequestBody Map<String, Object> params) {
    Map<String, Object> r = new HashMap<String, Object>();
    PlotService ps = Application.getBean(PlotService.class);
    r.put("data", ps.search(params));
    return r;
  }

}
