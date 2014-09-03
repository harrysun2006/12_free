package com.free.zf.ajax;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mortbay.jetty.Request;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.Application;
import com.free.zf.dto.Forum;
import com.free.zf.dto.Topic;
import com.free.zf.dto.User;
import com.free.zf.service.TopicService;
import com.free.zf.service.UserService;

@Controller
@RequestMapping(value = "/topic")
public class TopicController {

  @RequestMapping(value = "/list", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> list(HttpEntity<Forum> entity) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      Forum forum = entity.getBody();
      TopicService ts = Application.getBean(TopicService.class);
      List<Topic> topics = ts.list(forum);
      r.put("topics", topics);
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

  @SuppressWarnings("unchecked")
  @RequestMapping(value = "/process", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> process(@RequestBody Map<String, Object> data, Request request) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      TopicService ts = Application.getBean(TopicService.class);
      String cmd = (String) data.get("command");
      User me = UserService.getLoginedAccount();
      Topic topic = new Topic((Map<String, Object>) data.get("topic"));
      Topic topic0 = topic.getId() == null ? null : ts.get(topic.getId());
      Forum forum = topic0 == null ? topic.getForum() : topic0.getForum();
      if ("add".equals(cmd)) {
        topic.setCreator(me);
        topic.setDateline(Calendar.getInstance());
        topic.setIp(request.getRemoteAddr());
        ts.add(topic);
      } else if ("update".equals(cmd)) {
        topic0.setTitle(topic.getTitle());
        topic0.setContent(topic.getContent());
        ts.save(topic0);
      } else if ("delete".equals(cmd)) {
        ts.delete(topic0);
      } else if ("top".equals(cmd)) { // 置顶
        topic0.setTop(true);
        ts.save(topic0);
      } else if ("bottom".equals(cmd)) { // 取消置顶
        topic0.setTop(false);
        ts.save(topic0);
      } else if ("up".equals(cmd)) { // 加星
        topic0.setUp(1);
        ts.save(topic0);
      } else if ("down".equals(cmd)) { // 取消加星
        topic0.setUp(0);
        ts.save(topic0);
      } else {
        throw new Exception(String.format("无效的命令%s!", new Object[] { cmd }));
      }
      r.put("forum", forum);
      r.put("topics", ts.list(forum.getId()));
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

}
