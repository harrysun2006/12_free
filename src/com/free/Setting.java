package com.free;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.free.util.CommonUtil;
import com.free.util.FileUtil;
import com.free.util.JSONUtil;
import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Config;
import com.free.zf.dto.Dict;
import com.free.zf.dto.Forum;
import com.free.zf.service.ConfigService;
import com.free.zf.service.DictService;
import com.free.zf.service.ForumService;

/**
 * 应用程序全局设置 -- CONFIG
 * 
 * @author Harry Sun harrysun2006@gmail.com
 * 
 */
@Component
public class Setting {

  // 设置
  public static final Map<String, Config> SETTINGS = new LinkedHashMap<String, Config>();

  public static final String APP_USE_VCODE = "app.use.vcode";

  private static final String INIT_DATA_FILE = "data/init.json";

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  // 检查并初始化系统设置
  @SuppressWarnings("unchecked")
  protected static void seed() throws IOException {
    String s = FileUtil.read(INIT_DATA_FILE);
    Map<String, Object> data = JSONUtil.getObject(s, Map.class);
    ConfigService cs = Application.getBean(ConfigService.class);
    Config conf;
    List<Map<String, Object>> items, l;
    // T_DICT:
    items = (List<Map<String, Object>>) data.get("T_DICT");
    DictService ds = Application.getBean(DictService.class);
    Dict dict;
    Dict.Cat dc;
    for (Map<String, Object> d1 : items) {
      dc = Dict.Cat.valueOf((String) d1.get("cat"));
      if (dc == null)
        continue;
      l = (List<Map<String, Object>>) d1.get("items");
      for (Map<String, Object> d2 : l) {
        dict = ds.get(dc, (String) d2.get("code"));
        if (dict == null) {
          dict = new Dict();
          dict.setAttributes(d2);
          dict.setCat(dc);
          ds.add(dict);
        }
      }
    }
    /**
     * T_CONFIG:ids.use.vcode(是否启用验证码) zf.use.vcode: {"name":"zf.use.vcode",
     * "description":"是否使用验证码", "value":"false", "readOnly":false, "hint":
     * "{\"type\":\"select\",\"list\":[{\"text\":\"启用\",\"value\":\"true\"},{\"text\":\"禁用\",\"value\":\"false\"}]}"
     * }
     */
    items = (List<Map<String, Object>>) data.get("T_CONFIG");
    String name, value, description, hint;
    boolean readOnly = false;
    Integer idx;
    for (Map<String, Object> c1 : items) {
      if (!c1.containsKey("name") || !c1.containsKey("value"))
        continue;
      name = (String) c1.get("name");
      value = (String) c1.get("value");
      readOnly = c1.containsKey("readOnly") ? (Boolean) c1.get("readOnly") : true;
      description = c1.containsKey("description") ? (String) c1.get("description") : null;
      hint = c1.containsKey("hint") ? (String) c1.get("hint") : null;
      conf = cs.get(name);
      if (conf == null) {
        conf = new Config(name, value, description, hint, readOnly);
        cs.add(conf);
      } else if (readOnly) { // readonly=true的配置通过init.json修改, 其他通过后台管理修改
        conf.setValue(value);
        conf.setReadOnly(readOnly);
        conf.setDescription(description);
        conf.setHint(hint);
        cs.save(conf);
      }
    }
    // T_FORUM
    items = (List<Map<String, Object>>) data.get("T_FORUM");
    ForumService fs = Application.getBean(ForumService.class);
    Forum f;
    for (Map<String, Object> f1 : items) {
      if (!f1.containsKey("name"))
        continue;
      name = (String) f1.get("name");
      description = f1.containsKey("description") ? (String) f1.get("description") : name;
      idx = f1.containsKey("idx") ? (Integer) f1.get("idx") : 0;
      f = fs.get(name);
      if (f == null) {
        f = new Forum(name, description, idx);
        fs.add(f);
      } else {
        f.setDescription(description);
        f.setIdx(idx);
        fs.save(f);
      }
    }
  }

  public static void load() {
    ConfigService cs = Application.getBean(ConfigService.class);
    List<Config> confs = cs.getConfigs();
    for (Config conf : confs)
      SETTINGS.put(conf.getName(), conf);
  }

  public static void reload() {
    SETTINGS.clear();
    load();
  }

  public static Config get(String name) {
    return SETTINGS.get(name);
  }

  public static void set(String name, Config conf) {
    SETTINGS.put(name, conf);
  }

  public static String getValue(String name) {
    Config conf = get(name);
    return conf == null ? "" : conf.getValue();
  }

  public static void setValue(String name, String value) {
    Config conf = get(name);
    ConfigService cs = Application.getBean(ConfigService.class);
    if (conf == null) {
      conf = new Config(name);
      conf.setValue(value);
      cs.add(conf);
    } else {
      conf.setValue(value);
      cs.save(conf);
    }
    SETTINGS.put(name, conf);
  }

  public static Integer getInteger(String name) {
    return getInteger(name, null);
  }

  public static Integer getInteger(String name, Integer def) {
    Config conf = get(name);
    return conf == null ? def : CommonUtil.getInt(conf.getValue());
  }

  public static boolean getBoolean(String name) {
    return getBoolean(name, false);
  }

  public static boolean getBoolean(String name, boolean def) {
    Config conf = get(name);
    return conf == null ? def : CommonUtil.getBoolean(conf.getValue());
  }

  public static void setBoolean(String name, boolean b) {
    Config conf = get(name);
    if (conf == null)
      conf = new Config(name);
    conf.setValue(String.valueOf(b));
    ConfigService cs = Application.getBean(ConfigService.class);
    cs.save(conf);
    SETTINGS.put(name, conf);
  }

}
