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
import com.free.zf.dto.Post;
import com.free.zf.dto.Topic;
import com.free.zf.dto.User;
import com.free.zf.service.PostService;
import com.free.zf.service.TopicService;
import com.free.zf.service.UserService;

@Controller
@RequestMapping(value = "/post")
public class PostController {

  @RequestMapping(value = "/list", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> list(HttpEntity<Topic> entity) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      PostService ps = Application.getBean(PostService.class);
      TopicService ts = Application.getBean(TopicService.class);
      Topic topic = entity.getBody();
      Topic topic0 = ts.get(topic.getId());
      List<Post> posts = ps.list(topic.getId());
      topic0.setCntView(topic0.getCntView() + 1);
      ts.save(topic0);
      r.put("topic", topic0);
      r.put("posts", posts);
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
      PostService ps = Application.getBean(PostService.class);
      TopicService ts = Application.getBean(TopicService.class);
      String cmd = (String) data.get("command");
      User me = UserService.getLoginedAccount();
      Post post = new Post((Map<String, Object>) data.get("post"));
      Post post0 = post.getId() == null ? null : ps.get(post.getId());
      Topic topic0 = post.getTopicId() == null ? null : ts.get(post.getTopicId());
      if ("add".equals(cmd)) {
        post.setTopic(topic0);
        post.setCreator(me);
        post.setDateline(Calendar.getInstance());
        post.setIp(request.getRemoteAddr());
        ps.add(post);
        topic0.setLastPost(post);
        topic0.setCntReply(topic0.getCntReply() + 1);
        ts.save(topic0);
      } else if ("update".equals(cmd)) {
        post0.setContent(post.getContent());
        ps.save(post0);
      } else if ("delete".equals(cmd)) {
        ps.delete(post0);
      } else {
        throw new Exception(String.format("无效的命令%s!", new Object[] { cmd }));
      }
      r.put("topic", topic0);
      r.put("posts", ps.list(post.getTopicId()));
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

}
