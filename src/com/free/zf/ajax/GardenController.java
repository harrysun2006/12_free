package com.free.zf.ajax;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.free.zf.dto.Garden;

@Controller
@RequestMapping("/garden")
public class GardenController {


@RequestMapping(value = "/add", method = { RequestMethod.GET,
		RequestMethod.POST })
public @ResponseBody
Map<String, Object> add(@RequestBody Map<String, Object> data) {
	Map<String, Object> r = new HashMap<String, Object>();
	String no = (String) data.get("no");
	String name = (String) data.get("name");
	String shortname = (String) data.get("shortname");
	String address = (String) data.get("address");
	String memo=(String) data.get("memo");
	Garden g=new Garden();
	r.put("data", "test");
	return r;
		// @ResponseBody 会自动的将返回值转换成JSON格式
		// 但是你必须添加jackson的jar包!!!
	}
}
