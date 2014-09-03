/**
 * 定义公用的JavaScript常量/变量/方法及类扩展方法
 */
var APP_ERROR = '系统错误';
var APP_INFO = '系统信息';
var APP_WARNING = '系统警告';
var APP_TIMEOUT = 0;
var APP_FORMAT_DATE = 'Y-m-d';
var APP_FORMAT_DATETIME = 'Y-m-d H:i:s';

/** 字符串扩展 **/
// 删除左右两端的空格
String.prototype.trim = function()
{
  return this.replace(/(^\s*)(\s*$)/g, '');
};

// 删除左边的空格
String.prototype.ltrim = function()
{
  return this.replace(/(^\s*)/g, '');
};

// 删除左边的空格
String.prototype.rtrim = function()
{
  return this.replace(/(\s*$)/g, '');
};

// 重复连接字串
String.prototype.repeat = function(count)
{
  var r = '';
  if (count <= 0 || this == '') return r;
  for (var i = 0 ; i < count; i++) {
    r = r.concat(this);
  }
  return r;
};

// 计算文本最宽行的字符数
String.prototype.width = function()
{
  var ss = this.split('\n');
  var max = 0;
  for (var i = 0; i < ss.length; i++) {
    max = Math.max(max, ss[i].length);
  }
  return max;
};

// 将字符串中的html标签进行替换
String.prototype.text = function()
{
  return this.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
};

function isEmpty(s) 
{
  return !s || /^\s*$/.test(s);
}

// 判断是否是空内容, 不处理全角空格
String.prototype.empty = function()
{
  return isEmpty(this);
};

Function.prototype.empty = function()
{
  return false;
};

/** 对象及数组扩展 **/
// clone对象, deep: 深or浅?
function cloneObject(obj, deep, exclude)
{
  var dd = typeof(deep) == 'undefined' ? true : (deep ? true : false);
  var ex = typeof(exclude) != 'object' ? {} : exclude;
  var ret = new Object();
  var c;
  for (var n in obj) {
    c = getClass(obj[n]);
    if (ex[n]) continue;
    else if (c == 'Object' && dd) ret[n] = cloneObject(obj[n], dd);
    else if (c == 'Array' && dd) ret[n] = cloneArray(obj[n], dd);
    else ret[n] = obj[n];
  }
  return ret;
}
/**
 * Object.prototype.clone定义和jQuery-ui冲突, IE6下报错, 其他浏览器下dialog无法工作!!!
 * jQuery中的clone实现不一样!!!???
 */
// Object.prototype.clone = function(deep) {return cloneObject(this, deep);};

//clone数组, deep: 深or浅
function cloneArray(arr, deep)
{
  var dd = typeof(deep) == 'undefined' ? true : (deep ? true : false);
  var ret = new Array();
  var c;
  for (var i = 0; i < arr.length; i++) {
    c = getClass(arr[i]);
    if (c == 'Object' && dd) ret[i] = cloneObject(arr[i], dd);
    else if (c == 'Array' && dd) ret[i] = cloneArray(arr[i], dd);
    else ret[i] = arr[i];
  }
  return ret;
}
Array.prototype.clone = function(deep) {return cloneArray(this, deep);};

//取arr中t后的一个元素
function findNext(arr, t, wrap)
{
  if (!arr || getClass(arr) != 'Array' || arr.length <= 0) return null;
  if (typeof(t) == 'undefined') return arr[0];
  if (typeof(wrap) == 'undefined') wrap = true;
  var i = 0, f = 0, r = 0;
  while (r < 1 && i < arr.length) {
    if (f) return (arr[i] == t) ? null : arr[i];
    if (arr[i] == t) f = 1;
    if (++i >= arr.length && wrap) {i = 0; r++;}
  }
  return null;
}
Array.prototype.next = function(t, wrap) {return findNext(this, t, wrap);};

// 取arr中t前的一个元素
function findPrev(arr, t, wrap)
{
  if (!arr || getClass(arr) != 'Array' || arr.length <= 0) return null;
  if (typeof(t) == 'undefined') return arr[arr.length-1];
  if (typeof(wrap) == 'undefined') wrap = true;
  var i = arr.length, f = 0, r = 0;
  while (r < 1 && i >= 0) {
    if (f) return (arr[i] == t) ? null : arr[i];
    if (arr[i] == t) f = 1;
    if (--i < 0 && wrap) {i = arr.length-1; r++;}
  }
  return null;
}
Array.prototype.prev = function(t, wrap) {return findPrev(this, t, wrap);};

/**
 * 从数组构建map, 便于快速查找
 * @param arr: 数据数组
 * @param param: 参数, {key:..}
 * @returns
 */
function buildMap(arr, param)
{
  var r = new Object();
  if (!arr || getClass(arr) != 'Array') return r;
  var item, key;
  var fk = param && param.key ? param.key : 'key';
  for (var i = 0; i < arr.length; i++) {
    item = arr[i];
    key = typeof(item[fk]) != 'undefined' ? item[fk] : item;
    r[key] = item;
  }
  return r;
}
Array.prototype.map = function(param) {return buildMap(this, param);};

function formatDate(format, date, opts)  {
  var token = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
  timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
  timezoneClip = /[^-+\dA-Z]/g,
  msDateRegExp = new RegExp("^\/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)\/$"),
  msMatch = ((typeof date === 'string') ? date.match(msDateRegExp): null),
  pad = function (value, length) {
    value = String(value);
    length = parseInt(length,10) || 2;
    while (value.length < length)  { value = '0' + value; }
    return value;
  },
  ts = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0, u:0},
  timestamp=0, dM, k,hl,
  dateFormat=["i18n"];
  if (!opts) opts = {
    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat", 
               "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                 "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    AmPm : ["am","pm","AM","PM"],
    S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';}
  };
  // Internationalization strings
  dateFormat.i18n = {
    dayNames: opts.dayNames,
    monthNames: opts.monthNames
  };
  if(date.constructor === Number) {
    //Unix timestamp
    if(String(format).toLowerCase() == "u") {
      date = date*1000;
    }
    timestamp = new Date(date);
  } else if(date.constructor === Date) {
    timestamp = date;
    // Microsoft date format support
  } else if( msMatch !== null ) {
    timestamp = new Date(parseInt(msMatch[1], 10));
    if (msMatch[3]) {
      var offset = Number(msMatch[5]) * 60 + Number(msMatch[6]);
      offset *= ((msMatch[4] == '-') ? 1 : -1);
      offset -= timestamp.getTimezoneOffset();
      timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
    }
  } else {
    date = String(date).split(/[\\\/:_;.,\t\T\s-]/);
    format = format.split(/[\\\/:_;.,\t\T\s-]/);
    // parsing for month names
    for(k=0,hl=format.length;k<hl;k++){
      if(format[k] == 'M') {
        dM = $.inArray(date[k],dateFormat.i18n.monthNames);
        if(dM !== -1 && dM < 12){date[k] = dM+1;}
      }
      if(format[k] == 'F') {
        dM = $.inArray(date[k],dateFormat.i18n.monthNames);
        if(dM !== -1 && dM > 11){date[k] = dM+1-12;}
      }
      if(date[k]) {
        ts[format[k].toLowerCase()] = parseInt(date[k],10);
      }
    }
    if(ts.f) {ts.m = ts.f;}
    if( ts.m === 0 && ts.y === 0 && ts.d === 0) {
      return "&#160;" ;
    }
    ts.m = parseInt(ts.m,10)-1;
    var ty = ts.y;
    if (ty >= 70 && ty <= 99) {ts.y = 1900+ts.y;}
    else if (ty >=0 && ty <=69) {ts.y= 2000+ts.y;}
    timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
  }
  
  var 
    G = timestamp.getHours(),
    i = timestamp.getMinutes(),
    j = timestamp.getDate(),
    n = timestamp.getMonth() + 1,
    o = timestamp.getTimezoneOffset(),
    s = timestamp.getSeconds(),
    u = timestamp.getMilliseconds(),
    w = timestamp.getDay(),
    Y = timestamp.getFullYear(),
    N = (w + 6) % 7 + 1,
    z = (new Date(Y, n - 1, j) - new Date(Y, 0, 1)) / 86400000,
    flags = {
      // Day
      d: pad(j),
      D: dateFormat.i18n.dayNames[w],
      j: j,
      l: dateFormat.i18n.dayNames[w + 7],
      N: N,
      S: opts.S(j),
      //j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th',
      w: w,
      z: z,
      // Week
      W: N < 5 ? Math.floor((z + N - 1) / 7) + 1 : Math.floor((z + N - 1) / 7) || ((new Date(Y - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
      // Month
      F: dateFormat.i18n.monthNames[n - 1 + 12],
      m: pad(n),
      M: dateFormat.i18n.monthNames[n - 1],
      n: n,
      t: '?',
      // Year
      L: '?',
      o: '?',
      Y: Y,
      y: String(Y).substring(2),
      // Time
      a: G < 12 ? opts.AmPm[0] : opts.AmPm[1],
      A: G < 12 ? opts.AmPm[2] : opts.AmPm[3],
      B: '?',
      g: G % 12 || 12,
      G: G,
      h: pad(G % 12 || 12),
      H: pad(G),
      i: pad(i),
      s: pad(s),
      u: u,
      // Timezone
      e: '?',
      I: '?',
      O: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
      P: '?',
      T: (String(timestamp).match(timezone) || [""]).pop().replace(timezoneClip, ""),
      Z: '?',
      // Full Date/Time
      c: '?',
      r: '?',
      U: Math.floor(timestamp / 1000)
    };
  return format.replace(token, function ($0) {
    return $0 in flags ? flags[$0] : $0.substring(1);
  });     
}
Date.prototype.format = function(format, opts) {return formatDate(format, this, opts);};

function parseDate(format, date) {
  var tsp = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0},k,hl,dM, regdate = /[\\\/:_;.,\t\T\s-]/;
  if (!date || date == null || date == '' || date == undefined) return null;
  date = $.trim(date);
  date = date.split(regdate);
  format = format.split(regdate);
  var dfmt  = $.jgrid.formatter.date.monthNames;
  var afmt  = $.jgrid.formatter.date.AmPm;
  var h12to24 = function(ampm, h){
    if (ampm === 0){ if (h == 12) { h = 0;} }
              else { if (h != 12) { h += 12; } }
    return h;
  };
  for(k=0,hl=format.length;k<hl;k++){
    if(format[k] == 'M') {
      dM = $.inArray(date[k],dfmt);
      if(dM !== -1 && dM < 12){date[k] = dM+1;}
    }
    if(format[k] == 'F') {
      dM = $.inArray(date[k],dfmt);
      if(dM !== -1 && dM > 11){date[k] = dM+1-12;}
    }
    if(format[k] == 'a') {
      dM = $.inArray(date[k],afmt);
      if(dM !== -1 && dM < 2 && date[k] == afmt[dM]){
        date[k] = dM;
        tsp.h = h12to24(date[k], tsp.h);
      }
    }
    if(format[k] == 'A') {
      dM = $.inArray(date[k],afmt);
      if(dM !== -1 && dM > 1 && date[k] == afmt[dM]){
        date[k] = dM-2;
        tsp.h = h12to24(date[k], tsp.h);
      }
    }
    if(date[k] !== undefined) {
      tsp[format[k].toLowerCase()] = parseInt(date[k],10);
    }
  }
  tsp.m = parseInt(tsp.m,10)-1;
  var ty = tsp.y;
  if (ty >= 70 && ty <= 99) {tsp.y = 1900+tsp.y;}
  else if (ty >=0 && ty <=69) {tsp.y= 2000+tsp.y;}
  return new Date(tsp.y, tsp.m, tsp.d, tsp.h, tsp.i, tsp.s,0);
}
String.prototype.parseDate = function(format) {return parseDate(format, this);};

//取对象的实际类型名称
function getClass(obj)
{
  if (obj != undefined && obj.constructor && obj.constructor.toString()) {
    m = obj.constructor.toString().match(/function\s*(\w+)/);
    if(m && m.length == 2) return m[1];
    m = obj.constructor.toString().match(/object\s*(\w+)/);
    if(m && m.length == 2) return m[1];
  }
  return typeof(obj);
}

// MessageBox按钮常量 
var MB_OK = 1;
var MB_CANCEL = 2;
var MB_OKCANCEL = 3;
var MB_YES = 4;
var MB_NO = 8;
var MB_YESNO = 12;
var MB_YESNOCANCEL = 14;

var ID_OK = 1;
var ID_CANCEL = 2;
var ID_YES = 4;
var ID_NO = 8;

// MessageBox按钮文本 
var MB_OK_TEXT = '确定'; 
var MB_CANCEL_TEXT = '取消'; 
var MB_YES_TEXT = ' 是 '; 
var MB_NO_TEXT = ' 否 '; 

var BUTTON_OK;
var BUTTON_YES;
var BUTTON_NO;
var BUTTON_CANCEL;

// MessageBox图标
var MB_ICONERROR = MB_ICONSTOP = '/image/icon-error.gif';
var MB_ICONINFORMATION = '/image/icon-info.gif';
var MB_ICONQUESTION = '/image/icon-question.gif';
var MB_ICONWARNING = '/image/icon-warning.gif';

/**
 * 显示一个基于jQuery-UI dialog的MessageBox
 * 参数格式:
 * 1) msg, title, icon, button, callback, timeout
 * 2) options
 *    - msg: 消息内容
 *    - title: 消息标题, 未定义或null时=APP_TITLE
 *    - icon: 图标, 缺省为MB_ICONINFORMATION, 未定义或0/false/''/null时不显示图标
 *    - button: 按钮, 0/false/''/null时无按钮
 *    - callback: function(ret), 回调函数, ret为ID_OK/ID_CANCEL/ID_YES/ID_NO之一
 *    - timeout: 自动关闭延时, 0时不自动关闭
 * 无返回, 使用callback进行回调; 关闭对话框可以使用: MessageBox()/MessageBox(0/''/null/false)
 * @param options
 * @returns
 */
function MessageBox()
{
  var mb = $(document.createElement('div'));
  var cf1 = function() {mb.dialog('destroy');};
  cf1();
  var cf2 = function() {mb.dialog('close').dialog('destroy');};
  if (arguments.length == 0 || !arguments[0]) return;
  var options = arguments[0];
  if (typeof(options) != 'object') {
    options = {
      msg: options.toString()
    };
  }
  var ret = 0;
  var html = options.msg ? options.msg.replace(/\n/g, '<br>') : '';
  var width = options.msg ? options.msg.width() * 8 : 320;
  if (width < 320) width = 320;
  else if (width > 800) width = 800;
  var title = typeof(options.title) != 'undefined' ? options.title : 
    (typeof(arguments[1]) != 'undefined' ? arguments[1] : APP_TITLE);
  if (title == null) title = APP_TITLE;
  var icon = typeof(options.icon) == 'string' ? options.icon :
    (typeof(arguments[2]) == 'string' ? arguments[2] : null);
  if (icon) icon = APP_CONTEXT_PATH + icon + '?' + APP_VER;
  var button = options.button ? options.button :
    (arguments[3] ? arguments[3] : 0);
  var buttons = [];
  BUTTON_OK = {text: MB_OK_TEXT, click: function(){ret = ID_OK; $(this).dialog("close");}};
  BUTTON_YES = {text: MB_YES_TEXT, click: function(){ret = ID_YES; $(this).dialog("close");}};
  BUTTON_NO = {text: MB_NO_TEXT, click: function(){ret = ID_NO; $(this).dialog("close");}};
  BUTTON_CANCEL = {text: MB_CANCEL_TEXT, click: function(){ret = ID_CANCEL; $(this).dialog("close");}};
  if (button & MB_OK) buttons.push(BUTTON_OK);
  if (button & MB_YES) buttons.push(BUTTON_YES);
  if (button & MB_NO) buttons.push(BUTTON_NO);
  if (button & MB_CANCEL) buttons.push(BUTTON_CANCEL);
  var callback = options.callback && $.isFunction(options.callback) ? options.callback :
    (arguments[4] && $.isFunction(arguments[4]) ? arguments[4] : null);
  var timeout = typeof(options.timeout) == 'number' ? options.timeout :
    (typeof(arguments[5]) == 'number' ? arguments[5] : APP_TIMEOUT); // 0 - 不自动关闭
  timeout = parseFloat(timeout);
  var params;
  if ($.browser.msie && $.browser.version < 7) {
    params = {
      buttons: buttons,
      closeOnEscape: true,
      draggable: true,
      resizable: true,
      width: width,
      zIndex: 99999
    };
  } else {
    params = {
      bgiframe: true,
      buttons: buttons,
      closeOnEscape: true,
      draggable: true,
      modal: true,
      resizable: true,
      width: width,
      zIndex: 99999
    };
  }
  if (callback) params.close = function() {callback(ret);};
  html = '<div class=\'left\'>'
    + '<div class=\'left ui-dialog-content-icon\'><img id=\'mb_icon\' src=\'' + icon + '\'/></div>'
    + '<div class=\'left\'>' + html + '</div>'
    + '</div>';
  mb.dialog('destroy').attr('title', title).html(html).dialog(params);
  var mp = mb.parent();
  var h0 = mp.height();
  var h1 = $('div.ui-dialog-titlebar', mp).height();
  var h2 = $('div.ui-dialog-buttonset > button', mp).height();
  mb.height(h0 - h1 - h2 - 32);
  if (timeout > 0) {
    setTimeout(cf2, timeout*1000);
  }
}

window._alert = window.alert;
window.alert = function(msg) {MessageBox(msg, APP_ERROR, MB_ICONERROR, MB_OK, null, 0);};
window._error = function(msg) {MessageBox(msg, APP_ERROR, MB_ICONERROR, MB_OK, null, 0);};

/**
 * AJAX统一出错处理
 * @param request: 数组[XmlHttpRequest, code, text]
 * @param data: ajax请求的对象
 * @returns
 */
function ajaxError(request, data, timeout)
{
  var r = getAjaxError(request, data, timeout);
  MessageBox(r.error, APP_TITLE, MB_ICONERROR, MB_OK, r.callback, timeout);
}

function getAjaxError(request, data, timeout)
{
  var req = request.length > 0 ? request[0] : null;
  var code = request.length > 1 ? request[1] : null;
  var text = request.length > 2 ? request[2] : null;
  var clazz = getClass(req);
  var status;
  var s = '抱歉, 系统发生错误: \n';
  var f = null;
  if (code) s += '错误代码: ' + code + '\n';
  if (typeof(text) == 'string') {
    m = text.match(/(.*?):/);
    if (m) s += '错误详情: ' + m[1] + '...\n';
    else s += '错误详情: ' + text + '\n';
  } else if (getClass(text) == 'SyntaxError') {
    s += text + '\n';
  }
  if (data.type) s += '请求类型: ' + data.type + '\n';
  if (data.url) s += '请求URL: ' + data.url + '\n';
  if (clazz == 'XMLHttpRequest' && req.status != 200) {
    s += '返回状态: ' + req.status + '(' + req.statusText + ')\n'
      + '响应头: ' + req.getAllResponseHeaders() + '\n';
  }
  s += '请联系系统管理员!';
  if (typeof(timeout) == 'undefined') timeout = 0;
  if (req) {
    code = req.getResponseHeader("ERROR-CODE");
    if (code == 'not.login') {
      s = "您尚未登录或会话已经过期!\n请重新登录!";
      f = function(ret) {window.location.href = APP_CONTEXT_PATH + "/";};
    }
    status = req.status;
    if (status == 401) {
      s = "您的账号未经授权!\n请使用具有相关权限的账号登录!";
      f = function(ret) {window.location.href = APP_CONTEXT_PATH + "/";};
    }
  }
  return {error:s, callback:f};
}

function getErrorMessage(error)
{
  return !error ? ''
    : (error.rootCause && error.rootCause.localizedMessage ? error.rootCause.localizedMessage
    : (error.message ? error.message
    : (typeof(error) == 'string' ? error : '发生错误!')));
}

// 查看对象内容
function debug(obj, level)
{
  var f = function(obj, indent, depth) {
    if (typeof(obj) == 'function') return 'fucntion..';
    else if (typeof(obj) != 'object' || depth <= 0) return typeof(obj) == 'string' ? obj.text() : obj;
    var r = '\n';
    for (var x in obj) {
      r = r.concat('&nbsp;'.repeat(indent), x, '[', getClass(obj[x]), ']: ', f(obj[x], indent+2, depth-1), '\n');
    }
    return r;
  };
  if (typeof(level) == 'undefined') level = 1;
  var info = 'type: ' + typeof(obj) + ', class: ' + getClass(obj) + ', detail:\n' + f(obj, 0, level);
  // _alert(info);
  MessageBox(info, APP_INFO, MB_ICONINFORMATION, MB_OK, null, 0);
}

// 绑定一组jQuery对象
function bind(params)
{
  if (!params || !params.controls) return;
  var controls = params.controls;
  var accepts = {blur:1, focus:1, focusin:1, focusout:1, load:1, resize:1, scroll:1, unload:1, 
    click:1, dblclick:1, mousedown:1, mouseup:1, mousemove:1, mouseover:1, mouseout:1, mouseenter:1, 
    mouseleave:1, change:1, select:1, submit:1, keydown:1, keypress:1, keyup:1, error:1, controls: 0
  };
  var types = {};
  for (var n in params) {
    if (!accepts[n] || typeof(params[n]) != 'function') continue;
    types[n] = params[n];
  }
  /**
   * 注意: 
   * jQuery对象: var a = $('#pernr'); var b = $('#pernr'); a <> b!!
   * DOM对象: a[0] == b[0]
   */
  var dcs = []; // DOM对象数组
  for (var x in controls) {
    c = controls[x];
    if (!c || typeof(c) != 'object' || typeof(c[0]) != 'object') continue;
    dcs.push(c[0]);
  }
  params['#controls'] = dcs;
  var c;
  for (var x in controls) {
    c = controls[x];
    if (!c || typeof(c) != 'object' || typeof(c.bind) != 'function') continue;
    for (var y in types) {
      c.bind(y, params, types[y]);
    }
  }
}

// 解除一组jQuery对象上绑定的事件
function unbind(params)
{
  if (!params || !params.controls) return;
  var controls = params.controls;
  var accepts = {blur:1, focus:1, focusin:1, focusout:1, load:1, resize:1, scroll:1, unload:1, 
    click:1, dblclick:1, mousedown:1, mouseup:1, mousemove:1, mouseover:1, mouseout:1, mouseenter:1, 
    mouseleave:1, change:1, select:1, submit:1, keydown:1, keypress:1, keyup:1, error:1, controls: 0
  };
  var types = {};
  for (var n in params) {
    if (!accepts[n] || typeof(params[n]) != 'function') continue;
    types[n] = params[n];
  }
  var c;
  for (var x in controls) {
    c = controls[x];
    if (!c || typeof(c) != 'object' || typeof(c.bind) != 'function') continue;
    for (var y in types) {
      c.unbind(y, types[y]);
    }
  }
}

// TODO: 获得可输入的子控件数组
function getInputableItems(dobj)
{
  return null;
}

var VK_ENTER = 13;
var VK_UP = 38;
var VK_DOWN = 40;

/**
 * 一般按键处理, UP:上一个控件, DOWN/ENTER:下一个控件, 按钮自动click
 */
function genericKeyDown(event)
{
  if (!event) return;
  var data = event.data ? event.data : 
    (event.currentTarget ? getInputableItems(event.currentTarget) : null);
  if (!data || getClass(data.controls) != 'Array') return;
  var t = event.target;   // DOM控件
  var dcs = data['#controls'];
  var kc = event.keyCode;
  var ff = function(c, kc) {
    var jc = $(c);        // jQuery控件
    if (!jc) return;
    if (typeof(jc.focus) == 'function') jc.focus();
    if (typeof(jc.click) == 'function' && kc == VK_ENTER) jc.click();
    if (typeof(jc.btOn) == 'function') jc.btOn();
  };
  if (kc == VK_ENTER || kc == VK_DOWN) {
    ff(dcs.next(t), kc);
  } else if (kc == VK_UP) {
    ff(dcs.prev(t), kc);
  }
}

/** jQuery扩展 **/
// 将表单的数据返回成JSON格式对象
$.fn.serialize = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
   if (o[this.name]) {
     if (!o[this.name].push) {
       o[this.name] = [ o[this.name] ];
     }
     o[this.name].push(this.value || '');
   } else {
     o[this.name] = this.value || '';
   }
  });
  return o;
};

/**
* 增加select列表的option选项
* @param options: 选项数据数组或对象
* @param params: 参数, {value:.., text:.., svalue:.., stext:..}
* @returns
*/
$.fn.addOptions = function(options, params) {
  try {
    var select = $(this);
    if ((select[0].tagName != 'SELECT' && select[0].tagName != 'OPTGROUP') || !options) return;
    var def_params = {value:'code', text:'text', svalue:null, stext:null, clear:true, children:null, blank:false};
    if (typeof(options) != 'object') options = [options];
    if (typeof(params) == 'undefined') params = {};
    params = $.extend(def_params, params);
    var option, item, value, text, data, cc;
    cc = params.children;
    if (params.clear) select.children().remove();
    if (params.blank) {
      option = $(document.createElement('option'));
      option.val('');
      option.text('');
      select.append(option);
    }
    for (var i in options) { // 兼容数组和对象[a,b,c]/{a:a,b:b,c:c}
      item = options[i];
      if (typeof(item) == 'object') {
        value = item[params.value];
        text = item[params.text];
        data = item;
      } else if (typeof(item) == 'function') {
        continue;
      } else {
        value = text = item;
        data = null;
      }
      if (!value) continue;
      if (cc && item.hasOwnProperty(cc)) {
        option = $(document.createElement('optgroup'));
        option.attr('label', text);
        $(option).addOptions(item[cc], params);
      } else {
        option = $(document.createElement('option'));
        option.val(value);
        option.text(text);
        if (data) option.data(data);
        if (params.svalue == value || params.stext == text) option.attr('selected', true);
      }
      select.append(option);
    }
  } catch (e) {alert(e);}
};

// DIV中增加一组buttons(<a>)
$.fn.addButtons = function(buttons, params) {
  var i, div = $(this);
  if (!div || div[0].tagName != 'DIV' || !buttons) return;
  var def_params = {clear:true, data:[]};
  if (typeof(buttons) != 'object') buttons = [buttons];
  if (typeof(params) == 'undefined') params = {};
  params = $.extend(def_params, params);
  if (params.clear) div.children().remove();
  var align = div.css('float');
  var cc = function(event) {
    var data = event.data;
    if (!data || data.length <= 0) return;
    var button = data[data.length-1];
    if (typeof(button.click) == 'function') button.click.apply(this, data);
  };
  var ff = function(button) {
    var a = $(document.createElement('a'));
    a.addClass('button');
    a.text(button.text);
    if (button.id) a.attr('id', button.id);
    if (button.title) a.attr('title', button.title);
    if (typeof(button.click) == 'function') {
      a.addClass('enabled');
      // 此处必须使用通过event.data传参数的方式
      // 使用a.click(function() {button.click(...);})方式不行!!
      a.click(params.data.concat([button]), cc);
    } else if (button.href) {
      a.addClass('enabled');
      a.attr('href', button.href);
    } else {
      a.addClass('disabled');
    }
    /*
    button['#button'] = a;
    button['disable'] = function() {
      var b0 = this['#button'];
      if (!b0) return;
      b0.removeClass('enabled');
      b0.addClass('disabled');
    }
    button['enable'] = function() {
      var b0 = this['#button'];
      if (!b0) return;
      b0.removeClass('disabled');
      b0.addClass('enabled');
    }
    if (button.disabled) button.disable();
    */
    return a;
  };
  if (typeof(buttons) == 'undefined' || buttons.length <= 0) {
    div.hide();
  } else {
    if (align == 'right') { // 右对齐, 反过来加
      for (i = buttons.length - 1; i >= 0; i--) div.append(ff(buttons[i]));
    } else {
      for (i = 0; i < buttons.length; i++) div.append(ff(buttons[i]));
    }
    div.show();
  }
  // div.data['#buttons'] = buttons;
};

//TABLE中增加一行(<tr>)
$.fn.addRow = function(row, params) {
  var i, table = $(this);
  if (!table || table[0].tagName != 'TABLE' || !row) return;
  var tr = $(document.createElement('tr'));
  for (i = 0; i < row.length; i++) tr.addCell(row[i], params);
  if (typeof(params) == 'undefined') params = {};
  if (params.cssClass) tr.addClass(params.cssClass);
  var attrs = {id:1};
  for (p in params) if (attrs[p]) tr.attr(p, params[p]);
  $(this).append(tr);
  return tr;
};

// TABLE的一行TR增加一个单元格(<td>)
$.fn.addCell = function(cell, params) {
  var i, s, tr = $(this);
  if (typeof(cell) == 'string') cell = {text: cell};
  var td = $(document.createElement('td'));
  if (cell.text) td.text(cell.text);
  if (cell.html) td.html(cell.html);
  if (cell.cssClass) td.addClass(cell.cssClass);
  var attrs = {align:1, colspan:1, rowspan:1, width:1};
  for (p in cell) if (attrs[p]) td.attr(p, cell[p]);
  if (typeof(cell.callback) == 'function') cell.callback(td);
  if (cell.obj) {
    var c = getClass(cell.obj);
    var objs = c == 'Array' ? cell.obj : [cell.obj];
    for (i = 0; i < objs.length; i++) {
      if (typeof(objs[i]) == 'string') {
        s = objs[i];
        objs[i] = $(document.createElement('span'));
        objs[i].text(s);
      }
      td.append(objs[i]);
    }
  }
  tr.append(td);
  return td;
};

$.fn.test = function() {
  // use this[0].tagName to judge it's called by an element or static
  var s = this[0] && this[0].tagName ? this[0].tagName : '$.fn';
  return s + ': Hello World!';
};

/**
 * 生成DOM元素
 * id, name, text, value, style, css, title, disabled, hidden, readonly, data, hint, preCreate, postCreate, onShow, #base{...}
 **/
$.fn.addElement = function(def) {
  if (!def) return null;
  var appendable = this[0] && this[0].tagName && this.append;
  var ies = {input:1, textarea:1};
  var hint = def.hint ? $.evalJSON(def.hint) : null;
  var list = hint && hint.list && hint.list.length > 0 ? hint.list : null;
  var d0 = $.extend({type:'input', disabled:false, hidden:false, readonly:false}, def['#base']);
  var d2 = $.extend(d0, def);
  var i, list, opt;
  for (var n in def) if (!d2.hasOwnProperty(n)) d2[n] = def[n];
  if (d2.type == 'input' && !d2.style) d2.style = 'width:99%';
  if (hint && d2.type != 'span') {
    if (hint.type == 'select' && hint.list && hint.list.length > 0) {
      d2.type = 'select';
      d2.style = hint.style;
    }
  }
  if (!d2.text && d2.value && ies[d2.type] != 1) d2.text = d2.value;
  if (!d2.value && d2.text && ies[d2.type] == 1) d2.value = d2.text;
  if (d2.params && getClass(d2.params) != 'Array') d2.params = [d2.params];
  if (typeof(d2.preCreate) == 'function') d2.preCreate(d2);
  var ele = $(document.createElement(d2.type));
  if (d2.id) ele.attr('id', d2.id);
  if (d2.text && ele.text) ele.text(d2.text);
  if (d2.value && ele.val) ele.val(d2.value);
  var ss = d2.css ? d2.css.split(',') : [];
  for (i = 0; i < ss.length; i++) ele.addClass(ss[i]);
  if (d2.style) ele.attr('style', d2.style);
  // ele.attr('class', '96wp'); // 无效!!
  // ele.addClass('96wp'); // 无效!!
  if (d2.title) ele.attr('title', d2.title);
  if (d2.disabled) ele.attr('disabled', true);
  if (d2.disabled && ies[d2.type] == 1) ele.css('background-color', '#808080');
  if (d2.hidden) ele.attr('type', 'hidden');
  if (d2.readonly) ele.attr('readonly', true); 
  if (d2.readonly && ies[d2.type] == 1) ele.css('color', '#808080');
  if (d2.type == 'select' && list) {
    for (i = 0; i < list.length; i++) {
      opt = $(document.createElement('option'));
      opt.text(list[i].text);
      opt.val(list[i].value);
      if (list[i].value == d2.value) opt.attr('selected', true);
      ele.append(opt);
    }
  }
  if (d2.html) ele.html(d2.html);
  if (typeof(d2.postCreate) == 'function') d2.postCreate(d2, ele);
  if (appendable) this.append(ele);
  // 绑定事件
  var fb = function(id, event, call, params) {
    $('#'+id).bind(event, params, call);
  };
  var self = this;
  if (appendable && typeof(d2.onShow) == 'function') setTimeout(function() {d2.onShow(self, d2.id, d2.params);}, 200);
  if (typeof(d2.click) == 'function') setTimeout(function() {fb(d2.id, 'click', d2.click, d2.params)}, 200);
  return ele;
};

$._ajax = $.ajax;

$.ajax = function(url, options) {
  var _us = url ? url.success : null;
  var _bs = typeof(_us) == 'function';
  var sf = function(result) {
    if (result.ERROR) {
      MessageBox(getErrorMessage(result.ERROR), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
    } else {
      if (_bs) _us.apply(this, arguments);
    }
  };
  if (_bs) url.success = sf;
  $._ajax(url, options);
};