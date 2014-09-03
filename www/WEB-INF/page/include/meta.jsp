<%@page contentType="text/html; charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>${APP_TITLE}</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="keywords" content="ZF, 择房系统, Free, 福瑞"  />
<meta name="description" content="福瑞软件(苏州)择房系统" />
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/jquery-1.7.1.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/jquery.json-2.3.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/jquery.hoverIntent.minified.js"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/jquery.bgiframe.min.js"></script>
<!--[if IE]><script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/excanvas.js"></script><![endif]-->
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/jquery.bt.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/jquery.easing-1.3.pack.js"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/ajaxupload.3.6.js"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/grid/jquery.jqGrid.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/grid/grid.locale-cn.js"></script>
<!-- script type="text/javascript" src="${APP_CONTEXT_PATH}/js/grid/grid.addons.js"></script>
<script type="text/javascript" src="${APP_CONTEXT_PATH}/js/grid/jquery.searchFilter.js"></script-->
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/main.js?ver=${APP_VER}"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/file.js?ver=${APP_VER}"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/itip.js?ver=${APP_VER}"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/app-header.js?ver=${APP_VER}"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/ckeditor/ckeditor.js?ver=${APP_VER}"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/ckeditor/adapters/jquery.js?ver=${APP_VER}"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/hoverIntent.js?ver=${APP_VER}"></script>
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/superfish.js?ver=${APP_VER}"></script>
<link rel="stylesheet" type="text/css" href="${APP_CONTEXT_PATH}/js/jquery/jquery.bt.css?ver=${APP_VER}" />
<link rel="stylesheet" type="text/css" href="${APP_CONTEXT_PATH}/js/jquery/redmond/jquery-ui-1.8.18.custom.css?ver=${APP_VER}" />
<link rel="stylesheet" type="text/css" href="${APP_CONTEXT_PATH}/css/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" id="css_main" href="${APP_CONTEXT_PATH}/css/main.css?ver=${APP_VER}" />
<link rel="stylesheet" type="text/css" id="css_menu" href="${APP_CONTEXT_PATH}/css/superfish.css?ver=${APP_VER}"  media="screen"/>
<script type="text/javascript">
// 定义全局常量/变量
var APP_TITLE = '${APP_TITLE}';
var APP_VER = '${APP_VER}';
var APP_CONTEXT_PATH = '${APP_CONTEXT_PATH}';
var APP_USE_VCODE = ${APP_USE_VCODE};
var APP_ACC = ${APP_ACC};
var APP_PAGE = '${APP_PAGE}';
var APP_ALL = {code:'@ALL', text:''};
var APP_CSS = {};
var APP_CSSS = {
  width:{
    '.mid':-1,
    '#half_right':-220,
  	'.m7':-180,
  	'.m8':-95,
  	'#yxta_box':-235,
  	'#ggxx_box':-235,
  	'.box textarea':-20,
  	'.box1':-3,
  	'.box1 .wmax':-20,
  	'.box4':-220,
  	'.box4 textarea':-240,
  	'.box5':-15,
  	'.box7':-3,
  	'.boxc':-178
  },
  1024:{ // 994*85
  	'#banner':{background:'url("../image/banner1024.png") no-repeat center', height:'85px', width:'994px', display:'block'},
		width:994,
		height:85
  },
  1280:{ // 1250*107
  	'#banner':{background:'url("../image/banner1280.png") no-repeat center', height:'107px', width:'1250px', display:'block'},
		width:1250,
		height:107
  },
  1600:{ // 1570*134
  	'#banner':{background:'url("../image/banner1600.png") no-repeat center', height:'134px', width:'1570px', display:'block'},
  	width:1570,
  	height:134
  }
};

// 通过JSTL方式将输出字符串转变为JSON对象,暂时不用这种方式!
var APP_DATA = ${APP_DATA};

// BeatyTips全局配置
// $.bt.options.ajaxLoading = '<img src="/images/throbber.gif" width="40" height="40" />';
// $.bt.options.closeWhenOthersOpen = true;

// jQueryGrid全局配置
$.extend($.jgrid.defaults, {
  altRows: true
});

$.jgrid.extend({
  selectedItems: function() {
    var data = [];
    if (typeof(this.getGridParam) != 'function') return data;
    var options = this.getGridParam();
    var sels = options['multiselect'] ? options['selarrrow'] 
      : (options['selrow'] ? [options['selrow']] : []);
    var i, map = options['map'] ? options['map'] : {};
    for (i = 0; i < sels.length; i++) {
      data.push(map[sels[i]]);
    }
    return data;
  }
});

// jQueryUI DatePicker全局配置
$.datepicker.regional['zh-CN'] = {
	closeText: '关闭',
	prevText: '&#x3c;上月',
	nextText: '下月&#x3e;',
	currentText: '今天',
	monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
	monthNamesShort: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
	dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
	dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
	dayNamesMin: ['日','一','二','三','四','五','六'],
	weekHeader: '周',
	dateFormat: 'yy-mm-dd',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: true,
	yearSuffix: '&nbsp;年&nbsp;'
};
$.datepicker.setDefaults($.datepicker.regional['zh-CN']);

$.extend($.datepicker._defaults, {
  buttonImage: APP_CONTEXT_PATH + 'image/calendar.gif',
  buttonImageOnly: true,
  changeMonth: true,
  changeYear: true,
  dateFormat: 'yy-mm-dd',
  showOn: 'both',
  showOtherMonths: true,
  selectOtherMonths: true
});

// customize ckeditor
CKEDITOR.on('dialogDefinition', function(e1) {
  var dn = e1.data.name;
  var dd = e1.data.definition;
  var dg = dd.dialog;
  if (dn == 'image') {
    dd.removeContents('advanced');
    dd.removeContents('Link');
		var it = dd.getContents('info');
		it.add({
			type: 'button',
			id: 'btnUpload',
      align: 'center',
      style: 'display:inline-block;margin-top:10px;',
      label: '上传图片'
    }, 'browse'); //place front of the browser button
    // 必须放在show事件中, show之前对象未生成!!!
    dg.on('show', function(e3) {
      var ckUrl = dg.getContentElement('info', 'txtUrl');
      var ckUp = dg.getContentElement('info', 'btnUpload'); // CKEDITOR对象
      var dUp = ckUp.getElement().$; // DOM对象
      var jUp = $(dUp); // jQuery对象, jUp[0] = dUp
      var fs = function(file, ret, params) {
        ckUrl.setValue('/image?id=' + ret.files[0].id);
      };
      var uparams = {qobj:jUp, params:{event:fs}};
      $.APP_FILE.iup(uparams);
    });
  }
});

// 包装成类, 更好地控制调用访问接口
(function($) {

  // 根据客户端分辨率载入不同的css, 支持3种分辨率: 1600*900, 1280*720, 1024*768; 维护比较麻烦
  function loadCss()
  {
  	var name = '';
  	if (screen.width < 1024) name = '';
  	else if (screen.width < 1280) name = '1024';
  	else if (screen.width < 1600) name = '1280';
  	else name = '1600';
  	var href = '${APP_CONTEXT_PATH}/css/main_' + name + '.css'; // 使用此种方法动态改变css不能加?xx=xx
  	var css = $('#css_main');
  	css.attr('href', href);
  }

  function detectScreen()
  {
    var dc = {schema:0, width:1024, height:768, xscale:1, yscale:1, wc:0, adj:true};
    try {
      if (screen.deviceXDPI != screen.logicalXDPI) dc.xscale = screen.deviceXDPI/screen.logicalXDPI;
      if (screen.deviceYDPI != screen.logicalYDPI) dc.yscale = screen.deviceYDPI/screen.logicalYDPI;
    } catch (e) {}
    dc.width = screen.width * dc.xscale;
    dc.height = screen.height * dc.yscale;
  	if (dc.width < 1024) dc.schema = 0;
  	else if (dc.width < 1280) dc.schema = 1024;
  	else if (dc.width < 1600) dc.schema = 1280;
  	else dc.schema = 1600;
  	var msg = '系统警告:';
  	if (dc.xscale != 1 && APP_PAGE == 'index') {
  	  msg += '\n' + (++dc.wc) + '. 系统检测到你的浏览器使用了缩放: X-ZOOM(' + (dc.xscale*100) + '%),请将缩放比置为100%以获得最佳显示效果!';
  	}
  	if (!APP_CSSS.hasOwnProperty(dc.schema) && APP_PAGE == 'index') {
  	  dc.adj = false;
  	  msg += '\n' + (++dc.wc) + '. 系统不能很好的支持您的浏览器分辨率(' + screen.width + '*' + screen.height + '),请调整至1024*768以上!';
  	}
  	if (dc.wc > 0) MessageBox(msg, null, MB_ICONERROR, MB_OK, null, 0);
  	return dc;
  }

  // 根据客户端分辨率修改css; 维护比较简单, 可以方便的扩充分辨率支持!
  function changeCss()
  {
  	var i, css = null;
  	for (i = 0; i < document.styleSheets.length; i++) {
  	  css = document.styleSheets[i];
  	  if (css.id == 'css_main' || css.href.indexOf('/css/main.css') >= 0) break;
  	}
  	if (!css) return;
  	var rules = css.rules ? css.rules : (css.cssRules ? css.cssRules : null);
  	if (!rules) return;
  	for (i = 0; i < rules.length; i++) {
  	  APP_CSS[rules[i].selectorText] = rules[i];
  	}
  	var dc = detectScreen();
  	var ow = APP_CSSS[dc.schema], style;
  	for (var n in ow) {
  	  if (!APP_CSS[n]) continue;
  	  style = APP_CSS[n].style;
  	  for (var p in ow[n]) {
  		  try {
  		     style[p] = ow[n][p];
  		  } catch (e) {}
  	  }
  	}
  	adjustWidth(dc.schema);
  }

  function adjustWidth(id)
  {
    if (!APP_CSSS.hasOwnProperty(id)) return;
    var ow = APP_CSSS[id];
    var w = ow.width;
    var h = ow.height;
    var ww = APP_CSSS.width;
  	for (var n in ww) {
  	  if (!APP_CSS[n]) continue;
  	  style = APP_CSS[n].style;
  	  if (typeof(ww[n]) == 'string') style.width = ww[n];
  	  else if (typeof(ww[n]) == 'number') style.width = (w+ww[n]) + 'px';
  	}
  }

  function init()
  {
		 // loadCss();
		 changeCss();
  }

  $.META = $.META || {version: '1.0.0', name: 'META'};
  $.extend($.META, {
    init:init
  });
})(jQuery);

$(function() {
  $.META.init();
  if ($('#staffmenu')) $('#staffmenu').superfish();
});
</script>
</head>
