package com.free.zf.ajax;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.Application;
import com.free.zf.dto.Forum;
import com.free.zf.service.ForumService;

@Controller
@RequestMapping(value = "/forum")
public class ForumController {

  @RequestMapping(value = "/list", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> list(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    ForumService fs = Application.getBean(ForumService.class);
    List<Forum> forums = fs.list();
    r.put("forums", forums);
    return r;
  }
}
