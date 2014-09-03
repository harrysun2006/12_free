package com.free.zf.ajax;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.zf.dto.Access;
import com.free.zf.dto.Attachment;
import com.free.zf.dto.BuildType;
import com.free.zf.dto.ChooseCon;
import com.free.zf.dto.ChooseHouse;
import com.free.zf.dto.ChooseLog;
import com.free.zf.dto.ChoosePlan;
import com.free.zf.dto.Config;
import com.free.zf.dto.Contract;
import com.free.zf.dto.Dict;
import com.free.zf.dto.File;
import com.free.zf.dto.Forum;
import com.free.zf.dto.Garden;
import com.free.zf.dto.House;
import com.free.zf.dto.Log;
import com.free.zf.dto.Notice;
import com.free.zf.dto.Owner;
import com.free.zf.dto.Person;
import com.free.zf.dto.Plot;
import com.free.zf.dto.Post;
import com.free.zf.dto.Profile;
import com.free.zf.dto.Topic;
import com.free.zf.dto.User;

/**
 * 检测抛出415: Unsupported Media Type错误的类(overload setter)
 */
@Controller
@RequestMapping(value = "/test")
public class TestController {

  @RequestMapping(value = "/access", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> access(HttpEntity<Access> entity) {
    return _dump(Access.class, entity);
  }

  @RequestMapping(value = "/attachment", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> attachment(HttpEntity<Attachment> entity) {
    return _dump(Attachment.class, entity);
  }

  @RequestMapping(value = "/build_type", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> build_type(HttpEntity<BuildType> entity) {
    return _dump(BuildType.class, entity);
  }

  @RequestMapping(value = "/choose_con", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> choose_con(HttpEntity<ChooseCon> entity) {
    return _dump(ChooseCon.class, entity);
  }

  @RequestMapping(value = "/choose_house", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> choose_house(HttpEntity<ChooseHouse> entity) {
    return _dump(ChooseHouse.class, entity);
  }

  @RequestMapping(value = "/choose_log", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> choose_log(HttpEntity<ChooseLog> entity) {
    return _dump(ChooseLog.class, entity);
  }

  @RequestMapping(value = "/choose_plan", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> choose_plan(HttpEntity<ChoosePlan> entity) {
    return _dump(ChoosePlan.class, entity);
  }

  @RequestMapping(value = "/config", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> config(HttpEntity<Config> entity) {
    return _dump(Config.class, entity);
  }

  @RequestMapping(value = "/contract", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> contract(HttpEntity<Contract> entity) {
    return _dump(Contract.class, entity);
  }

  @RequestMapping(value = "/dict", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> dict(HttpEntity<Dict> entity) {
    return _dump(Dict.class, entity);
  }

  @RequestMapping(value = "/file", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> file(HttpEntity<File> entity) {
    return _dump(File.class, entity);
  }

  @RequestMapping(value = "/forum", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> forum(HttpEntity<Forum> entity) {
    return _dump(Forum.class, entity);
  }

  @RequestMapping(value = "/garden", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> garden(HttpEntity<Garden> entity) {
    return _dump(Garden.class, entity);
  }

  @RequestMapping(value = "/house", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> house(HttpEntity<House> entity) {
    return _dump(House.class, entity);
  }

  @RequestMapping(value = "/log", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> log(HttpEntity<Log> entity) {
    return _dump(Log.class, entity);
  }

  @RequestMapping(value = "/notice", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> notice(HttpEntity<Notice> entity) {
    return _dump(Notice.class, entity);
  }

  @RequestMapping(value = "/owner", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> owner(HttpEntity<Owner> entity) {
    return _dump(Owner.class, entity);
  }

  @RequestMapping(value = "/person", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> person(HttpEntity<Person> entity) {
    return _dump(Person.class, entity);
  }

  @RequestMapping(value = "/plot", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> plot(HttpEntity<Plot> entity) {
    return _dump(Plot.class, entity);
  }

  @RequestMapping(value = "/post", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> post(HttpEntity<Post> entity) {
    return _dump(Post.class, entity);
  }

  @RequestMapping(value = "/profile", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> profile(HttpEntity<Profile> entity) {
    return _dump(Profile.class, entity);
  }

  @RequestMapping(value = "/topic", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> topic(HttpEntity<Topic> entity) {
    return _dump(Topic.class, entity);
  }

  @RequestMapping(value = "/user", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> account(HttpEntity<User> entity) {
    return _dump(User.class, entity);
  }

  @RequestMapping(value = "/map", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> map(@RequestBody Map<String, Object> map) {
    Map<String, Object> r = new HashMap<String, Object>();
    r.put("dump", map.toString());
    return r;
  }

  @RequestMapping(value = "/list", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> list(@RequestBody List<Object> list) {
    Map<String, Object> r = new HashMap<String, Object>();
    r.put("dump", list.toString());
    return r;
  }

  protected <T> Map<String, Object> _dump(Class<T> clazz, HttpEntity<T> entity) {
    Map<String, Object> r = new HashMap<String, Object>();
    T obj = entity.getBody();
    r.put("data", obj);
    r.put("dump", obj.toString());
    return r;
  }
}
