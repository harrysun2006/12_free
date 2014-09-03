package com.free.zf.ajax;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.Application;
import com.free.zf.dto.Notice;
import com.free.zf.service.NoticeService;

@Controller
@RequestMapping(value = "/notice")
public class NoticeController {

  // 公告信息
  @RequestMapping(value = "/get", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> getNotice(HttpEntity<Notice> entity) {
    Map<String, Object> r = new HashMap<String, Object>();
    NoticeService ns = Application.getBean(NoticeService.class);
    try {
      Notice notice = entity.getBody();
      notice = ns.get(notice.getId());
      r.put("notice", notice);
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

}
