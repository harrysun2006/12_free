<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="include/meta.jsp" />
<script type="text/javascript" charset="utf-8" src="${APP_CONTEXT_PATH}/js/jquery/jquery.fancybox-1.3.4.pack.js"></script>
<link rel="stylesheet" type="text/css" href="${APP_CONTEXT_PATH}/js/jquery/jquery.fancybox-1.3.4.css?ver=${APP_VER}" />
<style type="text/css">
.u1 {background:url("/image/line01.gif") repeat; border:#6F6F6F 1px solid; border-right:none; height:16px; padding:3px; vertical-align:middle;}
.u2 {border:#6F6F6F 1px solid; border-left: none; background:url("/image/line01.gif") repeat; font-size:14px; height:18px; padding:2px; vertical-align:middle; outline:none; width:90px;}
.br {border:red 1px solid;}
.bb {border:blue 1px solid;}
.bc {border:black 1px solid;}
#bd3 {width:96px;}
html {background:#FFFFFF; text-align:left;}
body {text-align:left; font: 16px Arial,lucida,Sans-Serif; color:#000000; padding:10px; margin:0 auto; width:100%;}
input {height:24px; width:120px; margin-bottom:0px; padding:0px;}
textarea {height:360px; width:600px;}
</style>
<body>
User-Agent: ${userAgent}, <%= request.getHeader("User-Agent") %><br>
Content-Type: ${contentType}, <%= response.getContentType() %><br>
<a href="${APP_CONTEXT_PATH}/test/hello1">Say Hello(No Annotation)</a><br>
<a href="${APP_CONTEXT_PATH}/test/hello2">Say Hello(Annotation)</a><br>
<a href="${APP_CONTEXT_PATH}/test/ajax1">Ajax Test1</a><br>
<a href="${APP_CONTEXT_PATH}/test/ajax2">Ajax Test2</a><br>
<div class="clear"></div>
<div id="info19" class="test">message...</div>
<div>
	<div class="left"><img class="u1" src="/image/user.gif"></img><input id="t1" name="t1" type="text" class="u2" value="Merlin" /></div>&nbsp;&nbsp;
	<div class="left">日期: <input type="text" id="date" name="date" size="12" readonly="readonly"/></div>&nbsp;&nbsp;
	<div class="left">&nbsp;&nbsp;<a href="#" id="bd1">click???</a>&nbsp;&nbsp;<input type="text" id="bd2"/>&nbsp;&nbsp;<select id="bd3"></select></div>
	<div class="left"><input id="btnClear" type="button" value="Clear"/></div>
</div>
<div class="clear"></div>
<div>
	<form method="post" action="${APP_CONTEXT_PATH}/upload" enctype="multipart/form-data">
		<input type="text" name="name" value="Oracle" />
		<input type="file" name="file" />
		<input type="submit" value="Submit" />
	</form>
</div>
<div><a href="#" id="uploader">上传附件</a></div>
<div>
	<a href="javascript:test01()" title='getClass'>test01</a>&nbsp;&nbsp;
	<a href="javascript:test02()" title='undefined'>test02</a>&nbsp;&nbsp;
	<a id="inline" href="#data" title='FancyBox'>test03</a>&nbsp;&nbsp;
	<a href="javascript:test05()" title='Array'>test05</a>&nbsp;&nbsp;
	<a href="javascript:test06()" title='Object'>test06</a>&nbsp;&nbsp;
	<a href="javascript:test07()" title='MessageBox'>test07</a>&nbsp;&nbsp;
	<a href="javascript:test08()" title='数组/对象遍历'>test08</a>&nbsp;&nbsp;
	<a href="javascript:test09()" title='验证'>test09</a>&nbsp;&nbsp;
	<a href="javascript:test10()" title='String.repeat/width'>test10</a>&nbsp;&nbsp;
	<a href="javascript:test11()" title='Array.next/prev'>test11</a>&nbsp;&nbsp;
	<a href="javascript:test12()" title='RegEx?Prime/Sum'>test12</a>&nbsp;&nbsp;
</div>
<div>
	<a href="javascript:test15()" title='intip'>test15</a>&nbsp;&nbsp;
	<a href="javascript:test16()" title='Date format'>test16</a>&nbsp;&nbsp;
	<a href="javascript:test17()" title='bind'>test17</a>&nbsp;&nbsp;
	<a href="javascript:test18()" title='unbind'>test18</a>&nbsp;&nbsp;
	<a href="javascript:test19()" title="dyna css">test19</a>&nbsp;&nbsp;
	<a href="javascript:test20()" title="dyna style">test20</a>&nbsp;&nbsp;
	<a href="javascript:test21()" title="extend">test21</a>&nbsp;&nbsp;
	<a href="javascript:test22()" title="concat">test22</a>&nbsp;&nbsp;
	<a href="javascript:test23()" title="ajax">test23</a>&nbsp;&nbsp;
	<a href="javascript:test24()" title="div">test24</a>&nbsp;&nbsp;
	<a href="javascript:test25()" title="json">test25</a>&nbsp;&nbsp;
</div>
<div>
	<a href="javascript:test26()" title="plot">test26</a>&nbsp;&nbsp;
	<a href="javascript:test27()" title="plots">test27</a>&nbsp;&nbsp;
	<a href="javascript:test28()" title="date@jqGrid">test28</a>&nbsp;&nbsp;
	<div style="display:none"><div id="data">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></div>
</div>
<div><textarea id="console" cols="120" rows="20"></textarea></div>
<div class="clear"></div>
<div class="left full"><table id="tt_data"></table><div id="tt_pager"></div></div>
<table class="bc"><tr><td id="tt24"></td></tr></table>

<jsp:include page="include/tool.jsp" />
<script type="text/javascript">
function JSClass()
{
}

function trace(s)
{
  var t = $('#console').val();
  var c = getClass(s);
  if (c == 'Array') {
    for (var i = 0; i < s.length; i++) t += s[i] + '\n';
  } else if (c == 'Object') {
    for (var x in s) t += s[x] + '\n';
  } else {
    t += s + '\n';
  }
  $('#console').val(t);
}

function clear()
{
  $('#console').val('');
}

function test01()
{
	var objs = [new JSClass(), null, true, false, 3, 'Hello World!', [], {}, new Date()];
	var dess = ['new JSClass()', 'null', 'true', 'false', '3', 'Hello World!', '[]', '{}', 'new Date()'];
	trace('====== test01 ======');
	for (var i = 0; i < objs.length; i++) {
	  trace(dess[i] + ': ' + 'typeof -> ' + typeof(objs[i]) + '; getClass -> ' + getClass(objs[i]));
	}
}

function test02()
{
  var objs = [0, 1, 'Hello', '', null, true, false];
  var idxs = [];
  var f1, f2, f3, f4;
  for (var i = 0; i < objs.length; i++) {
    idxs.push(i);
  }
  idxs.push(99);
  trace('====== test02 ======');
  for (var j = 0; j < idxs.length; j++) {
    i = idxs[j];
    f1 = objs[i] == null ? 'N' : ' ';
    f2 = objs[i] == undefined ? 'U' : ' ';
    f3 = objs[i] ? ' ' : 'F';
    f4 = typeof(objs[i]) == 'undefined' ? 'X' : ' ';
    trace(f1 + ',' + f2 + ',' + f3 + ',' + f4 + ' -- objs[' + i + ']=' + objs[i]);
  }
}

function test05()
{
  var arr1 = [1,2,3];
  var arr2 = arr1.concat();
  trace('====== test05 ======');
  trace('SIMPLE:');
  trace('arr1: ' + arr1);
  arr2.push(6);
  trace('arr1: ' + arr1);
  trace('arr2: ' + arr2);
  var f1 = function() {alert(111);};
  var f2 = function() {alert(222);};
  var arr5 = [0, false, null, '', f1, {A1: 'A1', A2: {A21: 'A21'}}, {B1: {B11: 'B11'}, B2: 'B2'}, {C1 : {C11 : {C111: 'C111'}}}];
  var arr6 = arr5;              // 同一对象
  var arr7 = arr5.concat();     // 另一数组, 已有元素同一对象
  var arr8 = arr5.clone(false); // 另一数组, 浅克隆
  var arr9 = arr5.clone();      // 另一数组, 深克隆
  trace('BEFORE:');
  trace('arr5: ' + $.toJSON(arr5));
  trace('arr6: ' + $.toJSON(arr6));
  trace('arr7: ' + $.toJSON(arr7));
  trace('arr8: ' + $.toJSON(arr8));
  trace('arr9: ' + $.toJSON(arr9));
  arr5[0] = 1;
  arr5[1] = true;
  arr5[2] = undefined;
  arr5[3] = 'Oracle';
  arr5[4] = f2;
  arr5[5].A1 = 'X1';
  arr5[6].B1.B11 = 'Y11';
  arr5[6].B1.Z12 = 'Z12';
  arr5[7].C1.C11.C111 = 'S111';
  arr5[8] = {D1: 'D1'};
  trace('AFTER:');
  trace('arr5: ' + $.toJSON(arr5));
  trace('arr6: ' + $.toJSON(arr6));
  trace('arr7: ' + $.toJSON(arr7));
  trace('arr8: ' + $.toJSON(arr8));
  trace('arr9: ' + $.toJSON(arr9));
}

function test06()
{
  var obj1 = {name: 'Harry Sun', gender: 'Male', son: {name: 'Authur', gender: 'Boy'}};
  var obj2 = obj1;                     // 同一对象
  var obj3 = cloneObject(obj1, false); // 浅克隆
  var obj4 = cloneObject(obj1);        // 深克隆
  trace('====== test06 ======');
  trace('BEFORE:');
  trace('obj1: ' + $.toJSON(obj1));
  trace('obj2: ' + $.toJSON(obj2));
  trace('obj3: ' + $.toJSON(obj3));
  trace('obj4: ' + $.toJSON(obj4));
  obj1.age = 36;
  obj1.son.age = 7;
  trace('AFTER:');
  trace('obj1: ' + $.toJSON(obj1));
  trace('obj2: ' + $.toJSON(obj2));
  trace('obj3: ' + $.toJSON(obj3));
  trace('obj4: ' + $.toJSON(obj4));
}

function test07()
{
  var f = function(ret) {
    var msg = '';
    switch(ret) {
    case ID_YES:
      msg = 'select YES';
      break;
    case ID_NO:
      msg = 'select NO';
      break;
    case ID_CANCEL:
      msg = 'select CANCEL';
      break;
    default:
      msg = 'no select';
    	break;
    }
    trace('@test07:' + msg);
  };
  MessageBox('Hello World 1', null, MB_ICONQUESTION, MB_YESNOCANCEL, f, 0);
  MessageBox('Hello World 2', null, MB_ICONWARNING, MB_YESNOCANCEL, f, 0);
}

// 可以使用for (var x in any) 来访问数组和对象!
function test08()
{
  var a = {name: "AAA"};
  var b = {name: "BBB"};
  var c = {name: "CCC"};
  var obj = {a:a,b:b,c:c};
  var arr = [a,b,c];
  trace('====== test08 ======');
  for (var x in obj) trace(x + ':' + $.toJSON(obj[x]));
  for (var y in arr) trace(y + ':' + $.toJSON(arr[y]));
  for (var i = 0; i < arr.length; i++) trace(i + ":" + $.toJSON(arr[i]));
}

function test09(event)
{
  if (event && event.data) {
    _alert(event.data.foo);
    return;
  }
  trace('====== test09 ======');
  var arr = ['', '   ', '	', '  a	'];
  for (var x in arr) {
    if (typeof(arr[x]) == 'string') trace(arr[x] + ': ' + arr[x].empty());
  }
}

function test10()
{
  trace('====== test10 ======');
	trace('abc, 10: ' + 'abc'.repeat(10));
	var s = 'a\nbc\ndef\n\ghij\nklmnoz\npqrs\ntuv\nwx\ny\n';
	trace('s :' + s + ', width: ' + s.width());
	// debug($('#console'));
	var f = function() {_alert('Hello World!');};
	trace('f: ' + typeof(f) + ', ' + getClass(f));
	$('#console').bind('keydown', {foo:'bar'}, test09);
}

function test11()
{
  trace('====== test11 ======');
  var o = {a:'AAA'};
  var d = new Date(2012,0,1,0,0,0,0);
  var f = function() {_alert(123);};
  var arrs = [[6], [null, undefined, 6, 'Hello', d, o, f, true]];
  var ts = [6, 8, 'Hello', o];
  for (var i = 0; i < arrs.length; i++) {
    trace(arrs[i]);
  	trace('  next(): ' + arrs[i].next());
  	trace('  prev(): ' + arrs[i].prev());
    for (var j = 0; j < ts.length; j++) {
    	trace('  next(' + ts[j] + '): ' + arrs[i].next(ts[j]));
    	trace('  prev(' + ts[j] + '): ' + arrs[i].prev(ts[j]));
    }
  }
}

function test12()
{
  // find prime numbers between 1 and 100
  var re = /^1?$|^(11+)\1+$/g;
  var s = '';
  for (var i = 1; i <= 100; i++) {
    if (!'1'.repeat(i).match(re)) s = s + i + ',';
  }
  trace(s);
  debug(APP_DATA, 2);
}

function test15()
{
  var obj = {'#name': 'Harry Sun', '#age': 36, '#hello': function() {_alert('Hello: ' + this['#name']);}};
  obj['#hello']();
  // debug($('#console'));
  // debug($.itip);
  _alert('#console.val=' + $('#console').val() + '; #t1.val=' + $('#t1').val());
  // _alert($('#console').data('name'));
  // confirm('yes or no?');
}

function initUploader()
{
  try {
    /*
    var uploader = new qq.FileUploader({
      button: $('#uploader')[0],
      element: $('#uploader')[0],
      action: APP_CONTEXT_PATH + '/upload',
      params: {cat: 'JOB', owner: 1001},
      allowedExtensions: [],
      sizeLimit: 0,
      minSizeLimit: 0
      debug: true,
      onSubmit: function(id, fileName){},
      onProgress: function(id, fileName, loaded, total){},
      onComplete: function(id, fileName, responseJSON){},
      onCancel: function(id, fileName){},
      showMessage: function(message){}
    });*/
		new AjaxUpload('#uploader', {
		  // button: $('#uploader')[0],
		  action : APP_CONTEXT_PATH + '/upload',
		  data : {
		    cat: 'JOB',
		    owner: 1001,
		    idx: 0
		  }
    });
  } catch (e) { _alert(e); }
}

function beforeUnload()
{
  // _alert(arguments.length);
}

function test16()
{
  var now = new Date(1319328606000);
  _alert(now.format('Y-m-d H:i:s'));
}

function test17()
{
  $('#bd1').bind('click', function(){trace(111);});
  $('#bd1').bind('click', function(){trace(222);});
  $('#bd2').bind('change', function(){trace('aaa');});
  $('#bd2').bind('change', function(){trace('bbb');});
  init17();
  $('#bd3').bind('change', ['AAA'], tell17);
  init17();
  $('#bd3').bind('change', ['BBB'], tell17);
}

function init17()
{
  var col3 = [];
  for (var i = 1; i <= 10; i++) col3.push({id: i, name: 'Item ' + i});
  $('#bd3').children().remove();
  $('#bd3').addOptions(col3, {value: 'id', text: 'name'});
}

function tell17(event)
{
  var msg = event.data[0];
  trace(msg);
}

function test18()
{
  $('#bd1').unbind('click');
  $('#bd2').unbind('change');
  $('#bd3').unbind('change');
}

function test19()
{
  var name = '';
  // 支持3种分辨率: 1600*900, 1280*720, 1024*768
  if (screen.width < 1024) name = '';
  else if (screen.width < 1280) name = '1024';
  else if (screen.width < 1600) name = '1280';
  else name = '1600';
  var href = APP_CONTEXT_PATH + '/css/main_' + name + '.css'; // 使用此种方法动态改变css不能加?xx=xx
  $('#info19').text(screen.width + '*' + screen.height + ':' + href);
  $('#css_main').attr('href', href);
}

var g_color = 1;

function test20()
{
  g_color = !g_color;
  // in chrome, APP_CSS['.test'].style.color = 'rgb(255, 0, 255)'
  APP_CSS['.test'].style.color = (g_color ? '#00FF00' : '#FF00FF'); 
}

function test21()
{
  var a = {name:'A', value:1};
  var b = {name:'B', text:'bbb'};
  var c = $.extend(cloneObject(a), b);
  debug([a,b,c],2);
}

function test22()
{
  var arr1 = ['A', 'B', 'C'];
  var arr2 = ['X', 'Y', 'Z'];
  var arr3 = arr1.concat(arr2);
  var arr4 = arr2.concat(arr1);
  trace('arr1: ' + $.toJSON(arr1));
  trace('arr2: ' + $.toJSON(arr2));
  trace('arr3: ' + $.toJSON(arr3));
  trace('arr4: ' + $.toJSON(arr4));
}

function test23()
{
  var i;
  var arr = [
    {id:1, text:'access', data:{id:1, user:{username:'admin'}, role:'worker'}, url:'/test/access'},
  	{id:2, text:'attachment', data:{id:2, cat:'NOTICE', owner:66, name:'1.txt'}, url:'/test/attachment'},
  	{id:3, text:'build_type', data:{id:3, name:'二室一厅'}, url:'/test/build_type'},
  	{id:5, text:'choose_con', data:{id:5, contract:{no:'ZF_CC_0002'}, plan:{no:'ZF_CP_0003', batch:2}}, url:'/test/choose_con'},
  	{id:6, text:'choose_house', data:{id:6, planNo:'ZF_CP_0003', house:{no:'ZF_H_1001'}}, url:'/test/choose_house'},
  	{id:7, text:'choose_log', data:{id:7, plan:{no:'ZF_CP_0003', batch:2}, con:{contract:{no:'ZF_CC_0002'}}}, url:'/test/choose_log'},
  	{id:8, text:'choose_plan', data:{id:8, no:'ZF_CP_0003', batch:2}, url:'/test/choose_plan'},
  	{id:9, text:'config', data:{id:9, name:'score.template.default', value:'DEFAULT_TEMPLATE'}, url:'/test/config'},
  	{id:10, text:'contract', data:{id:10, no:'ZF_CC_0002', signer:{id:21, no:'99', name:'王二'}}, url:'/test/contract'},
  	{id:11, text:'dict', data:{id:11, cat:'CERT_TYPE', code:'ID', text:'身份证'}, url:'/test/dict'},
  	{id:12, text:'file', data:{id:12, filename:'\\24\\71\\60\\1.png', dateline:new Date(2012,2,8,6,6,6)}, url:'/test/file'},
  	{id:15, text:'forum', data:{id:15, name:'系统资讯', description:'员工对提案系统有疑问的地方，可以进行提问'}, url:'/test/forum'},
  	{id:16, text:'garden', data:{id:16, name:'沧浪新城', no:'CLXC'}, url:'/test/garden'},
  	{id:17, text:'house', data:{id:17, garden:{name:'沧浪新城'}, no:'ZF_H_10010', regNo:'SZF_123456'}, url:'/test/house'},
  	{id:18, text:'log', data:{id:18, clazz:'com.sess.misc.CronTask', method:'notifyScorers', line:74}, url:'/test/log'},
  	{id:19, text:'notice', data:{id:19, cat:'PUBLIC', title:'Discuz! X2.5RC 全新安装图文教程'}, url:'/test/notice'},
  	{id:20, text:'owner', data:{id:20, house:{id:17, garden:{name:'沧浪新城'}, no:'ZF_H_10010', regNo:'SZF_123456'}, person:{id:21, no:'99', name:'王二'}}, url:'/test/owner'},
  	{id:21, text:'person', data:{id:21, no:'99', name:'王二'}, url:'/test/person'},
  	{id:22, text:'plot', data:{id:22, no:'SGYYD6-23', name:'苏工业园地6-23', shortname:'GYYD6-23'}, url:'/test/plot'},
  	{id:23, text:'post', data:{id:23, flag:'H', status:'N'}, url:'/test/post'},
  	{id:24, text:'profile', data:{pernr:'02580349', karma:5}, url:'/test/profile'},
  	{id:25, text:'topic', data:{id:25, title:'北京三月飞雪空气“小清新” 气温将整体回暖'}, url:'/test/topic'},
  	{id:26, text:'user', data:{id:26, username:'admin'}, url:'/test/user'},
  	{id:27, text:'map', data:{name:'Harry Sun', age:36}, url:'/test/map'},
  	{id:28, text:'list', data:['blue', 6, new Date(1976,2,8)], url:'/test/list'}
  ];
  var _log = [];
  var _cnt = 0;
  var fs = function(result, ajax) {
    if (result.error) _log[ajax.id] = 'ERROR(' + ajax.url + '): ' + getErrorMessage(result.error);
    else _log[ajax.id] = 'SUCCESS(' + ajax.url + '): ' + result.dump;
    _cnt++;
    if (_cnt == arr.length) {
      for (i = 0; i < _log.length; i++) trace(_log[i]);
    }
  };
  var fe = function() {
    var error = getAjaxError(arguments, this);
    trace('ERROR: ' + error.error);
  };
	for (i = 0; i < arr.length; i++) {
	  try {
		  $.ajax({
		    id: i,
		    type : 'POST',
		    contentType : 'application/json',
		    data: $.toJSON(arr[i].data),
		    dataType: 'json',
		    url : APP_CONTEXT_PATH + arr[i].url,
		    success : function(result) {fs(result, this);},
		    error : fe
		  });
	  } catch(e) {trace('EXCEPTION: ' + e);}
	}
}

function test24()
{
  var td = $('#tt24');
  var d0 = $(document.createElement('div'));
  var d1 = d0.addElement({id:'tt24_1', type:'div', css:'left,m0', style:'border:1px solid red'});
  var d2 = d1.addElement({id:'tt24_2', type:'div', css:'left,m0', html:'abc<BR>xyz', style:'border:1px solid blue'});
  td.html(d0.html());
}

function test25()
{
  var data = ${APP_DATA};
  debug(data, 2);
  _alert(data.memo);
}

function test26()
{
  var plot = {id:22, no:'SGYYD6-23', name:'苏工业园地6-23', shortName:'GYYD6-23'};
  $.ajax({
    type : 'POST',
    contentType : 'application/json',
    data: $.toJSON(plot),
    dataType: 'json',
    url : APP_CONTEXT_PATH + '/test/plot',
    success : function(result) {debug(result, 2);},
    error : function() {ajaxError(arguments, this);}
  });
}

function test27()
{
  var params = {};
  var ff = function(result) {
    // debug(result, 3);
    var i, grid = $('#tt_data');
    grid.jqGrid({
      autowidth: false,
      datatype: 'local',
      data: result.data,
      height: 'auto',
      colNames: ['名称', '注册日期'],
      colModel: [
        {name:'name', width:100, fixed:true, search:true, sortable:false, align:'center'},
        {name:'regTime', width:160, formatter:'date', formatoptions:{newformat: 'Y-m-d'}, sortable:false, align:'center'}
      ],
      loadui: true,
      multiselect: false,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true,
      rowNum: 10,
      rowList: [10,20,30],
      pager: '#tt_pager',
      recordpos: 'left',
      pagerpos: 'center',
      viewrecords: true
    });
  };
  $.ajax({
    type : 'POST',
    contentType : 'application/json',
    data: $.toJSON(params),
    dataType: 'json',
    url : APP_CONTEXT_PATH + '/plot/search',
    success : ff,
    error : function() {ajaxError(arguments, this);}
  });
}

function test28()
{
  var dd = [{name:'Tom', birthday:'1980-06-07'.parseDate('Y-m-d')}];
  var i, grid = $('#tt_data');
  grid.jqGrid({
    autowidth: false,
    datatype: 'local',
    data: dd,
    height: 'auto',
    colNames: ['名称', '生日'],
    colModel: [
      {name:'name', width:100, fixed:true, search:true, sortable:false, align:'center'},
      {name:'birthday', width:160, formatter:'date', formatoptions:{newformat: 'Y#m#d'}, sortable:false, align:'center'}
    ],
    loadui: true,
    multiselect: false,
    scroll: false,
    scrollOffset: 0,
    altclass: 'jqgrow-odd',
    altRows: true,
    rowNum: 10,
    rowList: [10,20,30],
    pager: '#tt_pager',
    recordpos: 'left',
    pagerpos: 'center',
    viewrecords: true
  });
}

function removeCss(names)
{
	var i, css = null;
	for (i = 0; i < document.styleSheets.length; i++) {
	  css = document.styleSheets[i];
	  if (css.id == 'css_main' || css.href.indexOf('/css/main.css') >= 0) break;
	}
	if (!css) return;
	var rules = css.rules ? css.rules : (css.cssRules ? css.cssRules : null);
	if (!rules) return;
	var nm = {};
	for (i = 0; i < names.length; i++) {
	  nm[names[i]] = true;
	}
	for (i = 0; i < rules.length; i++) {
	  if (nm[rules[i].selectorText]) continue;
	  rules[i].cssText='';
	}
}

$(function() {
  $("a#inline").fancybox();
  initUploader();
  $('#console').itip('控制台日志');
  $('#console').data('name', 'Harry');
  $('#btnClear').click(clear);
  document.body.onbeforeunload = beforeUnload;
  $('#css_main').href = APP_CONTEXT_PATH + '/css/mac.css';
  // removeCss(['html','body','select','textarea','input']);
});

$('#date').datepicker({
  showOn: 'button',
  buttonImage: APP_CONTEXT_PATH + 'image/calendar.gif',
  buttonImageOnly: true,
  changeMonth: true,
  changeYear: true,
  dateFormat: 'yy-mm-dd',
  minDate: new Date(),
  showOn: 'both',
  showOtherMonths: true,
  selectOtherMonths: true
});
</script>
</body>
</html>