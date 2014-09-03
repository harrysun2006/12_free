package com.free.zf.ajax;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.Application;
import com.free.Setting;
import com.free.util.CacheUtil;
import com.free.zf.dto.Log;
import com.free.zf.dto.Notice;
import com.free.zf.service.LogService;
import com.free.zf.service.MiscService;
import com.free.zf.service.NoticeService;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

  @RequestMapping(value = "/nextId", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> nextId(HttpEntity<String> entity) {
    Map<String, Object> r = new HashMap<String, Object>();
    String name = entity.getBody();
    MiscService ms = Application.getBean(MiscService.class);
    Integer id = ms.nextId(name);
    if (id == null)
      r.put("error", String.format("无法获取%s的ID序列值!", new Object[] { name }));
    else
      r.put("id", id);
    return r;
  }

  // 公告信息列表
  @RequestMapping(value = "/notice/list", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> listNotices(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      NoticeService ns = Application.getBean(NoticeService.class);
      List<Notice> notices = ns.list();
      r.put("notices", notices);
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

  // 公告信息管理
  @SuppressWarnings("unchecked")
  @RequestMapping(value = "/notice/process", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> processNotice(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    String message = "";
    try {
      NoticeService ns = Application.getBean(NoticeService.class);
      Notice n = new Notice((Map<String, Object>) data.get("notice"));
      String command = (String) data.get("command");
      n.setDateline(Calendar.getInstance());
      if ("delete".equals(command)) { // 删除公告
        ns.delete(n);
        message = String.format("已成功删除公告信息[%s]!", new Object[] { n.getTitle() });
      } else if ("add".equals(command)) {
        ns.add(n);
        message = String.format("已成功发布公告信息[%s]!", new Object[] { n.getTitle() });
      } else if ("edit".equals(command)) {
        ns.save(n);
        message = String.format("已成功保存公告信息[%s]!", new Object[] { n.getTitle() });
      } else {
        r.put("error", String.format("系统不支持公告信息的[%s]操作,请联系管理员!", command));
      }
    } catch (Exception e) {
      r.put("error", e);
    }
    r.put("message", message);
    return r;
  }

  private static final Map<String, String> CACHE_DESCRIPTIONS = new HashMap<String, String>();
  static {
    CACHE_DESCRIPTIONS.put("CONFIG_ALL", "所有系统设置");
    CACHE_DESCRIPTIONS.put("DICT_ALL", "所有列表数据");
    CACHE_DESCRIPTIONS.put("DICT_CAT", "%s的列表数据");
    CACHE_DESCRIPTIONS.put("EMP_ALL", "所有员工");
    CACHE_DESCRIPTIONS.put("EMP_TEAM_EMPS", "Team[%s]的所有员工列表");
    CACHE_DESCRIPTIONS.put("EMP_GROUP_EMPS", "Group[%s]的所有员工列表");
    CACHE_DESCRIPTIONS.put("EMP_DEPT_EMPS", "Dept[%s]的所有员工列表");
    CACHE_DESCRIPTIONS.put("EMP_TEAMS", "组织架构Team-Group-Dept");
    CACHE_DESCRIPTIONS.put("EMP_PLEAD", "Dept[%s]的Part Manager");
    CACHE_DESCRIPTIONS.put("EMP_GLEAD", "Group[%s]的Group Manager");
    CACHE_DESCRIPTIONS.put("EMP_LEAD", "Dept/Group[%s]的Manager");
    CACHE_DESCRIPTIONS.put("EMP_LEADS", "P/G长列表");
  }

  // 缓存列表
  @RequestMapping(value = "/cache/list", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> listCaches(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      List<Object> keys = CacheUtil.list();
      List<Map<String, String>> items = new ArrayList<Map<String, String>>();
      Map<String, String> item;
      String k0, k1, k2, d;
      String[] ks;
      for (Object key : keys) {
        item = new HashMap<String, String>();
        k0 = key.toString();
        ks = k0.split("#");
        if (ks.length > 1) {
          k1 = ks[0];
          k2 = ks[1];
          d = CACHE_DESCRIPTIONS.containsKey(k1) ? String.format(CACHE_DESCRIPTIONS.get(k1), k2) : "";
        } else {
          k1 = ks[0];
          d = CACHE_DESCRIPTIONS.containsKey(k1) ? CACHE_DESCRIPTIONS.get(k1) : "";
        }
        item.put("k", k0);
        item.put("d", d);
        items.add(item);
      }
      r.put("items", items);
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

  // 清除缓存
  @RequestMapping(value = "/cache/clear", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> clearCaches(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      CacheUtil.clear();
      Setting.reload();
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

  // 系统设置
  @RequestMapping(value = "/config/list", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> listConfigs(HttpServletRequest request) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      r.put("configs", Setting.SETTINGS.values());
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

  // 保存系统设置
  @SuppressWarnings("unchecked")
  @RequestMapping(value = "/config/save", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> saveConfig(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      List<Map<String, String>> configs = (List<Map<String, String>>) data.get("configs");
      for (Map<String, String> c : configs) {
        if (!c.containsKey("name") || !c.containsKey("value"))
          continue;
        Setting.setValue(c.get("name"), c.get("value"));
      }
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

  // 查看系统日志
  @RequestMapping(value = "/log/list", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> listLogs(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      LogService ls = Application.getBean(LogService.class);
      List<Log> logs = ls.list();
      r.put("logs", logs);
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }

  // 清除系统日志
  @RequestMapping(value = "/log/clear", method = RequestMethod.POST)
  public @ResponseBody
  Map<String, Object> clearLogs(@RequestBody Map<String, Object> data) {
    Map<String, Object> r = new HashMap<String, Object>();
    try {
      LogService ls = Application.getBean(LogService.class);
      ls.clear();
    } catch (Exception e) {
      r.put("error", e);
    }
    return r;
  }
}
