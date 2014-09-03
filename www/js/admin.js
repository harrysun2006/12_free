(function($) {
  var TOTAL_PAGE = 9;
  var PAGES = [];
  var MENU_DATA = [
    {id:10, text:'用户管理', level:0, parent:0, isLeaf:true, expanded:false, ff:setPage1, url:'user'},
    {id:20, text:'相关链接', level:0, parent:0, isLeaf:true, expanded:false, ff:setPage2, url:'link'},
    {id:30, text:'公告信息', level:0, parent:0, isLeaf:true, expanded:false, ff:setPage3, url:'notice'},
    {id:50, text:'积分设置', level:0, parent:0, isLeaf:true, expanded:false, ff:setPage5, url:'karma'},
    {id:60, text:'评分模板', level:0, parent:0, isLeaf:true, expanded:false, ff:setPage6, url:'score'},
    {id:70, text:'缓存管理', level:0, parent:0, isLeaf:true, expanded:false, ff:setPage7, url:'cache'},
    {id:80, text:'系统设置', level:0, parent:0, isLeaf:true, expanded:false, ff:setPage8, url:'config'},
    {id:90, text:'系统日志', level:0, parent:0, isLeaf:true, expanded:false, ff:setPage9, url:'log'}
  ];
  var MENUS = {};

  // 显示其中1个页面, 隐藏其他页面
  function showPage(p) {
    if (typeof(p) != 'number') {
      try {p = parseInt(p);} catch(e) {}
    }
    for (var i = 0; i < PAGES.length; i++) {
      if (i == p-1) PAGES[i].show();
      else PAGES[i].hide();
    }
  }

  function init(p) {
    var i, item;
    var menu = $('#treemenu');
    // 一共TOTAL_PAGE个页面, 页面0为错误提示页面
    for (i = 0; i < TOTAL_PAGE; i++) PAGES[i] = $('#adm_p' + (i+1));
    for (i = 0; i < MENU_DATA.length; i++) {
      item = MENU_DATA[i];
      if (typeof(item.id) == 'undefined') continue;
      MENUS[item.id] = item;
    }
    menu.jqGrid({
      datatype: 'jsonstring',
      datastr: MENU_DATA,
      height: 'auto',
      pager: false,
      loadui: true,
      colNames: ['id', '管理项目'],
      colModel: [
        {name:'id', width:1, hidden:true, key:true, stype:false},
        {name:'text', width:100, resizable: false, sortable:false, stype:false}
      ],
      treeGrid: true,
      treeGridModel: 'adjacency',
      treedatatype: 'local',
      gridview: true,
      caption: '',
      sortname: 'id',
      ExpandColumn: 'text',
      autowidth: true,
      //width: 180,
      ExpandColClick: true,
      treeIcons: {leaf:'ui-icon-document-b'},
      multiselect: false,
      onSelectRow: openRow,
      jsonReader: {
        repeatitems: false,
        root: function (obj) { return obj; },
        page: function (obj) { return 1; },
        total: function (obj) { return 1; },
        records: function (obj) { return obj.length; }
      }
    });
    if (typeof(p) == 'number' && MENUS.hasOwnProperty(p)) {
      menu.setSelection(p);
    }
  }

  function openRow(rowid, status) {
    var item = $('#treemenu').getRowData(rowid);
    var id = item.id ? item.id : 0;
    if (typeof(id) != 'number') {
      try {id = parseInt(id);} catch(e) {}
    }
    if (typeof(id) == 'undefined') return;
    item = MENUS[id];
    if (typeof(item.ff) == 'function') item.ff(item);
    else if (typeof(item.pp) == 'number') showPage(item.pp);
  }

  function getEles(table, i, nn) {
    var j, ii, d = {};
    var VAL_ELES = {INPUT:1, SELECT:1};
    for (j = 0; j < nn.length; j++) {
      ii = $('#'+nn[j].id+i, table);
      d[nn[j].name] = VAL_ELES.hasOwnProperty(ii[0].tagName) ? ii.val() : ii.text();
    }
    return d;
  }

  // 用户管理
  function listAccounts(data) {
    var accs = data.accs;
    var i, grid = $('#ap1_data');
    grid.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['ID', '工号', '姓名', '职位', 'MYSIN', '部门'],
      colModel: [
        {name:'id', hidden:true},
        {name:'pernr', width:100, fixed:true, sortable:false, align:'center'},
        {name:'emp.name', width:120, fixed:true, sortable:false, align:'left'},
        {name:'emp.duty', width:180, fixed:true, sortable:false, align:'center'},
        {name:'emp.mysin', width:220, fixed:true, sortable:false},
        {name:'emp.dept', sortable:false, align:'left'}
      ],
      loadui: true,
      multiselect: false,
      onSelectRow: openAccount,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true,
      rowNum: 10,
      rowList: [10,20,30],
      pager: '#ap1_pager',
      recordpos: 'left',
      pagerpos: 'center',
      viewrecords: true
    });
    for (i = 0; i < accs.length; i++) accs[i].id = i;
    grid.setGridParam({data:accs, page:1});
    grid.trigger('reloadGrid');
    // Toggles a selection of the row with id = rowid; if onselectrow is true (the default) then the event onSelectRow is launched, otherwise it is not.
    grid.setSelection(0);
    $('#ap1_total').text('Total: ' + accs.length + '个用户账号!');
  }

  function openAccount(rowid, status) {
    var grid = $('#ap1_data');
    var data = grid.getGridParam('data');
    // 注意翻页后rowid为当前页的第rowid行!!!
    var row = grid.getRowData(rowid);
    var acc = data[row.id];
    var abs = [
      {name:'enable', text:'启用', title:'启用账号', click:processAccount},
      {name:'disable', text:'禁用', title:'禁用账号', click:processAccount},
      {name:'admin', text:'管理员', title:'设置为系统管理员', click:processAccount},
      {name:'user', text:'普通用户', title:'设置为普通用户', click:processAccount},
      {name:'reset', text:'重置密码', title:'重置密码', click:processAccount}
    ];
    var buttons = [];
    buttons.push(abs[4]);
    buttons.push(acc.admin ? abs[3] : abs[2]);
    buttons.push(acc.enabled ? abs[1] : abs[0]);
    var params = {data:[rowid, acc]};
    // $('#ap1_info').text(acc.pernr + ':' + acc.emp.name);
    $('#ap1_bar1').addButtons(buttons, params);
    $('#ap1_bar2').addButtons(buttons, params);
  }

  function processAccount(rowid, acc, button) {
    var grid = $('#ap1_data');
    var data = {
      pernr: acc.pernr,
      extra: {command:button.name}
    };
    var fs = function(result) {
      var error = result.ERROR ? result.ERROR : 0;
      var msg = result.message ? result.message : '';
      var accs = grid.getGridParam('data');
      var row = grid.getRowData(rowid);
      $('#ap1_info').attr('class', 'left ' + (error ? 'red' : 'blue'));
      $('#ap1_info').text(msg);
      if (result.acc) {
        accs[row.id] = result.acc;
        grid.setRowData(rowid, result.acc);
        grid.setSelection(rowid);
      }
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON(data),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/account/process',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  function setPage1(item) {
    showPage(1);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: '{}',
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/account/list',
      success: function(result) {listAccounts(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  // 相关链接
  function listLinks(data, button) {
    if (data.error) MessageBox(getErrorMessage(data.error), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
    var table = $('#ap2_data');
    var links = (data && data.links) ? data.links : [];
    table.children().remove();
    var header = [
      {text:'文本', width:280},
      {text:'链接(HREF)'},
      {text:'描述', width:320}
    ];
    table.addRow(header, {cssClass: 'header'});
    var i, j, row, def, ccn;
    var nn = [{id:'ap2_links_t', name:'text'}, {id:'ap2_links_l', name:'link'}, {id:'ap2_links_d', name:'desc'}];
    for (i = 0; i < 4; i++) {
      row = [];
      for (j = 0; j < nn.length; j++) {
        def = {id:nn[j].id+i, value:(i<links.length?links[i][nn[j].name]:null), '#base':nn[j]};
        row.push({obj:$.fn.addElement(def)});
      }
      ccn = i%2 == 0 ? 'even' : 'odd';
      table.addRow(row, {cssClass: ccn});
    }
    var buttons = [
      {text:'重置', title:'重置链接', click:listLinks},
      {text:'保存', title:'保存链接', click:saveLinks}
    ];
    var params = {data:[data]};
    $('#ap2_bar1').addButtons(buttons, params);
    $('#ap2_bar2').addButtons(buttons, params);
    if (button) $('#ap2_info').text('链接已被重置!');
  }

  function saveLinks(data, button) {
    var table = $('#ap2_data');
    var i, dd = [], d;
    var nn = [{id:'ap2_links_t', name:'text'}, {id:'ap2_links_l', name:'link'}, {id:'ap2_links_d', name:'desc'}];
    for (i = 0; i < 4; i++) {
      d = getEles(table, i, nn);
      if (d.text.empty() || d.link.empty()) continue;
      dd.push(d);
    }
    var fs = function(result) {
      var error = result.ERROR ? result.ERROR : 0;
      var msg = error ? '相关链接设置失败: ' + getErrorMessage(error) : '相关链接设置成功!';
      $('#ap2_info').attr('class', 'left ' + (error ? 'red' : 'blue'));
      $('#ap2_info').text(msg);
      if (data) data.links = dd;
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({links:dd}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/links/save',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  function setPage2(item) {
    showPage(2);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/links/list',
      success: function(result) {listLinks(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  // 公告信息列表
  function listNotices(data, button) {
    if (data.error) MessageBox(getErrorMessage(data.error), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
    var notices = data.notices;
    var map = {};
    var i, grid = $('#ap3_data');
    grid.clearGridData(true);
    grid.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['ID', '发布时间', '标题'],
      colModel: [
        {name:'id', hidden:true},
        {name:'dateline', width:160, formatter:'date', fixed:true, sortable:false, align:'center'},
        {name:'title', sortable:false, align:'left'}
      ],
      loadui: true,
      multiselect: false,
      onSelectRow: openNotice,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true,
      rowNum: 10,
      rowList: [10,20,30],
      pager: '#ap3_pager',
      recordpos: 'left',
      pagerpos: 'center',
      viewrecords: true
    });
    for (i = 0; i < notices.length; i++) {
      map[notices[i].id] = notices[i];
    }
    grid.setGridParam({data:notices, page:1, map:map});
    grid.trigger('reloadGrid');
    $('#ap3_total').text('Total: ' + notices.length + '条公告信息!');
    var buttons = [
      {name:'add', text:'发布公告', title:'发布1条新的公告信息', click:addNotice},
      {name:'delete', text:'删除公告', title:'删除选中的公告信息', click:deleteNotice}];
    var params = {data:[data]};
    $('#ap3_bar1').addButtons(buttons, params);
    $('#ap3_bar2').addButtons(buttons, params);
  }

  function deleteNotice(data, button) {
    var sels = $('#ap3_data').selectedItems();
    var notice = sels && sels.length > 0 ? sels[0] : null;
    if (notice == null) {
      MessageBox('请选择一条公告信息!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
      return;
    }
    processNotice(notice, 'delete');
  }

  function addNotice(data, button) {
    var params = {title:'', content:'', op:'add', caption:button.title, '#onSave':saveNotice};
    $.APP_INFO.open(params);
  }

  function openNotice(rowid, status) {
    var sels = $('#ap3_data').selectedItems();
    var notice = sels && sels.length > 0 ? sels[0] : null;
    if (notice == null) {
      MessageBox('请选择一条公告信息!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
      return;
    }
    var fs = function(result) {
      var _notice = result.notice;
      var _params = {id:_notice.id, title:_notice.title, content:_notice.content, op:'edit', caption:'编辑公告信息', '#onSave':saveNotice};
      $.APP_INFO.open(_params);
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: APP_CONTEXT_PATH + '/notice/get',
      data: $.toJSON({id:notice.id}),
      dataType: 'json',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  function saveNotice(params) {
    var notice = {title:params['#title'], content:params['#content']};
    if (params.hasOwnProperty('id')) notice.id = params.id;
    processNotice(notice, params.op);
  }

  function processNotice(notice, command) {
    var grid = $('#ap3_data');
    var fs = function(result) {
      var error = result.ERROR ? result.ERROR : 0;
      var msg = result.message ? result.message : '';
      $('#ap3_info').attr('class', 'left ' + (error ? 'red' : 'blue'));
      $('#ap3_info').text(msg);
      setPage3(MENUS[30]);
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({notice:notice, command:command}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/notice/process',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  // 公告信息
  function setPage3(item) {
    showPage(3);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/notice/list',
      success: function(result) {listNotices(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  // 积分设置
  function listKarmas(data, button) {
    if (data.error) MessageBox(getErrorMessage(data.error), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
    var table = $('#ap5_data');
    var karmas = (data && data.karmas) ? data.karmas : [];
    table.children().remove();
    var header = [
      {text:'代码', width:200},
      {text:'积分', width:160},
      {text:'描述'}
    ];
    table.addRow(header, {cssClass: 'header'});
    var i, j, row, def, ccn;
    var nn = [{id:'ap5_karmas_c', name:'code', type:'span'}, {id:'ap5_karmas_v', name:'value'}, {id:'ap5_karmas_d', name:'desc'}];
    for (i = 0; i < karmas.length; i++) {
      row = [];
      for (j = 0; j < nn.length; j++) {
        def = {id:nn[j].id+i, value:karmas[i][nn[j].name], '#base':nn[j]};
        row.push({obj:$.fn.addElement(def)});
      }
      ccn = i%2 == 0 ? 'even' : 'odd';
      table.addRow(row, {cssClass: ccn});
    }
    var buttons = [
      {text:'重置', title:'重置积分设置', click:listKarmas},
      {text:'保存', title:'保存积分设置', click:saveKarmas}
    ];
    var params = {data:[data]};
    $('#ap5_bar1').addButtons(buttons, params);
    $('#ap5_bar2').addButtons(buttons, params);
    if (button) $('#ap5_info').text('积分设置已被重置!');
  }

  function saveKarmas(data, button) {
    var karmas = (data && data.karmas) ? data.karmas : [];
    var table = $('#ap5_data');
    var i, dd = [], d;
    var nn = [{id:'ap5_karmas_c', name:'code'}, {id:'ap5_karmas_d', name:'desc'}, {id:'ap5_karmas_v', name:'value'}];
    for (i = 0; i < karmas.length; i++) {
      d = getEles(table, i, nn);
      dd.push(d);
    }
    var fs = function(result) {
      var error = result.ERROR ? result.ERROR : 0;
      var msg = error ? '积分设置失败: ' + getErrorMessage(error) : '积分设置成功!';
      $('#ap5_info').attr('class', 'left ' + (error ? 'red' : 'blue'));
      $('#ap5_info').text(msg);
      if (data) data.karmas = dd;
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({karmas:dd}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/karmas/save',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  function setPage5(item) {
    showPage(5);
    $.ajax({
      type: 'POST',
      contentType : 'application/json',
      data: $.toJSON({}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/karmas/list',
      success: function(result) {listKarmas(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  // 评分模板
  function listTmpls(data, button) {
    if (data.error) MessageBox(getErrorMessage(data.error), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
    var tmpls = data.tmpls ? data.tmpls : [];
    var dtmpl = data.dtmpl ? data.dtmpl : {};
    var map = {};
    var i, fid = null, grid = $('#ap6_data');
    grid.clearGridData(true);
    grid.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['ID', '默认?', '使用?', '时间', '名称', '描述'],
      colModel: [
        {name:'id', hidden:true},
        {name:'#def', width:64, fixed:true, sortable:false, align:'center'},
        {name:'#used', width:64, fixed:true, sortable:false, align:'center'},
        {name:'dateline', width:160, formatter:'date', fixed:true, sortable:false, align:'center'},
        {name:'name', width:160, fixed:true, sortable:false, align:'left'},
        {name:'description', sortable:false, align:'left'}
      ],
      loadui: true,
      multiselect: false,
      onSelectRow: selectTmpl,
      ondblClickRow: dblClickTmpl,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true,
      rowNum: 10,
      rowList: [10,20,30],
      pager: '#ap6_pager',
      recordpos: 'left',
      pagerpos: 'center',
      viewrecords: true
    });
    for (i = 0; i < tmpls.length; i++) {
      if (fid == null) fid = tmpls[i].id;
      tmpls[i]['#def'] = tmpls[i].def ? 'Y' : '';
      tmpls[i]['#used'] = tmpls[i].used ? 'Y' : '';
      map[tmpls[i].id] = tmpls[i];
    }
    grid.setGridParam({data:tmpls, page:1, map:map});
    grid.trigger('reloadGrid');
    $('#tt_div').dialog({
      autoOpen:false, 
      modal:true,
      position:'top',
      resizable:false,
      width: 770
    });
    grid.setSelection(fid);
  }

  function selectTmpl(rowid, status) {
    var sels = $('#ap6_data').selectedItems();
    var tmpl = sels && sels.length > 0 ? sels[0] : null;
    if (tmpl == null) {
      MessageBox('请选择一个评分模板!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
      return;
    }
    var buttons = [];
    buttons.push({text:'新建', title:'复制当前选中的评分模板并新建', op:'add', click:openTmpl});
    buttons.push({text:'编辑', title:'编辑当前选中的评分模板', op:'edit', click:openTmpl});
    if (!tmpl.used) buttons.push({text:'删除', title:'删除当前选中的评分模板', click:deleteTmpl});
    if (!tmpl.def) buttons.push({text:'设为默认', title:'将选中的评分模板设置为默认的评分模板', click:defaultTmpl});
    var params = {data:[tmpl]};
    $('#ap6_bar1').addButtons(buttons, params);
    $('#ap6_bar2').addButtons(buttons, params);
  }

  function dblClickTmpl(rowid, iRow, iCol, ev) {
    var sels = $('#ap6_data').selectedItems();
    var tmpl = sels && sels.length > 0 ? sels[0] : null;
    if (tmpl == null) {
      MessageBox('请选择一个评分模板!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
      return;
    }
    openTmpl(tmpl, {op:'edit'});
  }

  function openTmpl(tmpl, button) {
    var fs = function(result) {
      var _tmpl = result.tmpl;
      var op = button.op;
      var ntmpl, title;
      if (op == 'add') {
        ntmpl = cloneObject(_tmpl, true, {id:1, dateline:1, def:1, used:1});
        title = '新建模板';
      } else if (op == 'edit') {
        ntmpl = _tmpl;
        title = '编辑模板';
      }
      ntmpl['#data'] = {};
      $('#tt_div').dialog({title:title}).dialog('open');
      $('#tt_name').removeAttr('readonly');
      $('#tt_name').val(ntmpl.name);
      $('#tt_description').removeAttr('readonly');
      $('#tt_description').val(ntmpl.description);
      $('#tt_append').unbind('click');
      $('#tt_append').bind('click', [ntmpl, op], appendSI);
      $('#tt_delete').unbind('click');
      $('#tt_delete').bind('click', [ntmpl, op], deleteSI);
      createTT(ntmpl);
      $('#tt_close').unbind('click');
      $('#tt_close').bind('click', function(ev) {
        $('#tt_div').dialog('close');
      });
      $('#tt_save').unbind('click');
      $('#tt_save').bind('click', [ntmpl, op], function(ev) {
        var _ntmpl = ev.data[0];
        var _op = ev.data[1];
        saveTmpl(_ntmpl, _op);
      });
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({id:tmpl.id}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/tmpl/open',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
    return true;
  }

  // 生成评分模板项目表
  function createTT(tmpl) {
    var table = $('#tt_table');
    table.children().remove();
    createTTHeader(table);
    createTTData(table, tmpl);
  }

  // 生成评分模板项目表表头(固定)
  function createTTHeader(table) {
    var headers = [
      {text:'序号', width:60},
      {text:'评分项目', width:100},
      {text:'很优秀', width:160},
      {text:'优秀', width:160},
      {text:'普通', width:160},
      {text:'不足', width:160}];
    table.addRow(headers, {cssClass: 'header'});
  }

  var P_INT = 'pi';
  var SI_APP = [
    {id:'rule', def:''},
    {id:'ruleA', def:''},
    {id:'ruleB', def:''},
    {id:'ruleC', def:''},
    {id:'ruleD', def:''},
    {id:'ah', def:'', type:P_INT},
    {id:'al', def:'', type:P_INT},
    {id:'bh', def:'', type:P_INT},
    {id:'bl', def:'', type:P_INT},
    {id:'ch', def:'', type:P_INT},
    {id:'cl', def:'', type:P_INT},
    {id:'dh', def:'', type:P_INT},
    {id:'dl', def:'', type:P_INT},
    {id:'idx', def:'', type:P_INT}];
  var SI_DEF = null;

  // 生成评分模板项目表
  function createTTData(table, tmpl) {
    var i, params = {cssClass:'even'};
    var items = tmpl.items;
    if (SI_DEF == null) {
      SI_DEF = {};
      for (i = 0; i < SI_APP.length; i++) SI_DEF[SI_APP[i].id] = SI_APP[i].def;
    }
    for (i = 0; i < items.length; i++) {
      items[i].used = tmpl.used;
      // params.cssClass = i%2 == 0 ? 'even' : 'odd';
      params.rowid = i;
      createSI(table, tmpl, items[i], params);
    }
  }

  function createSI(table, tmpl, item, params) {
    var j, item, row, tr1, tr2;
    var data = tmpl['#data'];
    var rowid = params.rowid;
    var iis = [];
    for (j = 0; j < SI_APP.length; j++) {
      iis[j] = $(document.createElement('input'));
      iis[j].attr('id', 'tt_si'+rowid+'_'+SI_APP[j].id);
      if (j == 0) iis[j].css('width', '98px');
      else if (j < 5) iis[j].css('width', '96%');
      else iis[j].css('width', '32px');
      iis[j].val(item[SI_APP[j].id]);
    }
    row = [
      {obj:iis[13], rowspan:2},
      {obj:iis[0], rowspan:2}, 
      {obj:iis[1]}, 
      {obj:iis[2]}, 
      {obj:iis[3]}, 
      {obj:iis[4]}];
    tr1 = table.addRow(row, $.extend(params, {id:'tt_row1_'+rowid}));
    row = [
      {obj:[iis[5],  ' ~ ', iis[6]],  align:'center'},
      {obj:[iis[7],  ' ~ ', iis[8]],  align:'center'},
      {obj:[iis[9],  ' ~ ', iis[10]], align:'center'},
      {obj:[iis[11], ' ~ ', iis[12]], align:'center'}
    ];
    tr2 = table.addRow(row, $.extend(params, {id:'tt_row2_'+rowid}));
    item['#rowid'] = rowid;
    tr1.bind('click', [tmpl, rowid], selectSI);
    tr2.bind('click', [tmpl, rowid], selectSI);
  }

  function selectSI(ev) {
    var tmpl = ev.data[0];
    var rowid = ev.data[1];
    var tr1 = $('#tt_row1_'+rowid);
    var tr2 = $('#tt_row2_'+rowid);
    var data = tmpl['#data'];
    var sel = data.sel;
    if (typeof(sel) != 'undefined') {
      $('#tt_row1_'+sel).removeClass('highlight');
      $('#tt_row2_'+sel).removeClass('highlight');
      $('#tt_row1_'+sel).addClass(data.savedCss);
      $('#tt_row2_'+sel).addClass(data.savedCss);
    }
    data.savedCss = tr1.attr('class');
    data.sel = rowid;
    tr1.addClass('highlight');
    tr2.addClass('highlight');
  }

  function appendSI(ev) {
    var tmpl = ev.data[0];
    var op = ev.data[1];
    var table = $('#tt_table');
    var items = tmpl.items;
    var rowid = items.length;
    var item = cloneObject(SI_DEF);
    item.idx = rowid+1;
    createSI(table, tmpl, item, {cssClass:'even', rowid:rowid});
    items.push(item);
  }

  function deleteSI(ev) {
    var tmpl = ev.data[0];
    var op = ev.data[1];
    var data = tmpl['#data'];
    if (typeof(data.sel) == 'undefined') {
      MessageBox('请选择一个评分项目!', APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
      return;
    }
    var rowid = data.sel;
    var item = tmpl.items[rowid];
    if (item == null) return;
    if (item.used) {
      MessageBox('已经被使用的评分项目无法删除!', APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
      return;
    }
    var tr1 = $('#tt_row1_'+rowid);
    var tr2 = $('#tt_row2_'+rowid);
    tr1.hide();
    tr2.hide();
    tmpl.items[rowid] = null;
    data.sel = undefined;
  }

  function duplicated(arr, ns) {
    var i, a = {};
    for (i = 0; i < ns.length; i++) {
      if (a.hasOwnProperty(arr[ns[i]])) return ns[i];
      a[arr[ns[i]]] = 1;
    }
    return false;
  }

  function validateTmpl(tmpl) {
    var i, cc = 0, tt = 0, jo = null, s = null, rs = {}, dd;
    var items = tmpl.items, item, ok;
    var xx = ['ruleA', 'ruleB', 'ruleC', 'ruleD'];
    if (tmpl.name.trim() == '') {
      s = '请输入非空模板名称!';
      jo = $('#tt_name');
    } else if (tmpl.description.trim() == '') {
      s = '请输入非空模板描述!';
      jo = $('#tt_description');
    } else if (items.length <= 0) {
      s = '请添加至少一个评分项目!';
    }
    for (i = 0; i < items.length; i++) {
      item = items[i];
      if (item == null) continue;
      if (rs[item.rule]) {
        s = '评分项目不能重复!';
        jo = $('#tt_si'+item['#rowid']+'_rule');
        break;
      } else {
        rs[item.rule] = true;
      }
      cc++;
      tt += item.ah;
      ok = (item.ah >= item.al && item.al == item.bh + 1 
          && item.bh >= item.bl && item.bl == item.ch + 1
          && item.ch >= item.cl && item.cl == item.dh + 1
          && item.dh >= item.dl && item.dl >= 0);
      if (!ok) {
        s = '评分项目[' + item.rule + ']的分值段必须>=0并且从高到低连续!';
        break;
      }
      dd = duplicated(item, xx);
      if (dd) {
        s = '评分项目[' + item.rule + ']的等级描述不能重复!';
        jo = $('#tt_si'+item['#rowid']+'_'+dd);
        break;
      }
    }
    if (!s) {
      if (cc <= 0) s = '请添加至少一个评分项目!';
      else if (tt < 90) s = '请确保所有项目的最高分之和>=90!';
    }
    if (s) {
      MessageBox(s, APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
      if (jo) {jo.select(); jo.focus();}
    }
    return s == null;
  }

  function saveTmpl(tmpl, op) {
    var table = $('#tt_table');
    var items = tmpl.items;
    var i, item, rowid, tr1, tr2;
    var fv = function(tr, item) {
      var rowid = item['#rowid'];
      var k, jo, id, v, s = null;
      for (k = 0; k < SI_APP.length; k++) {
        id = SI_APP[k].id;
        jo = $('#tt_si'+rowid+'_'+id);
        v = typeof(jo.val) == 'function' ? jo.val() : null;
        if (SI_APP[k].type == P_INT) {
          v = parseInt(v);
          if (isNaN(v) || v < 0) s = '请输入零或正整数!';
        } else {
          if (v == null || v.trim() == '') s = '请输入非空值!';
        }
        if (s) {
          MessageBox(s, APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
          jo.select();
          jo.focus();
          break;
        }
        if (id && item.hasOwnProperty(id)) item[id] = v;
      }
      return s == null;
    };
    var valid = true;
    for (i = 0; i < items.length; i++) {
      item = items[i];
      if (item == null) continue;
      rowid = item['#rowid'];
      tr1 = $('#tt_row1_'+rowid);
      tr2 = $('#tt_row2_'+rowid);
      if (!fv(tr1, item)) return;
      if (!fv(tr2, item)) return;
      item.score = item.ah;
    }
    tmpl.name = $('#tt_name').val();
    tmpl.description = $('#tt_description').val();
    if (!validateTmpl(tmpl)) return;
    processTmpl(tmpl, op);
  }

  function deleteTmpl(data, button) {
    var sels = $('#ap6_data').selectedItems();
    var tmpl = sels && sels.length > 0 ? sels[0] : null;
    if (tmpl == null) {
      MessageBox('请选择一个评分模板!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
    } else if (tmpl['#def']) {
      MessageBox('默认模板不能被删除!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
    } else {
      processTmpl(tmpl, 'delete');
    }
  }

  function defaultTmpl(data, button) {
    var sels = $('#ap6_data').selectedItems();
    var tmpl = sels && sels.length > 0 ? sels[0] : null;
    if (tmpl == null) {
      MessageBox('请选择一个评分模板!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
    } else {
      processTmpl(tmpl, 'default');
    }
  }

  function processTmpl(tmpl, command) {
    var fr = function(ret) {
      $('#tt_div').dialog('close');
      setPage6(MENUS[60]);
    };
    var fs = function(result) {
      if (result.error) MessageBox(getErrorMessage(result.error), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
      else MessageBox(result.message, APP_INFO, MB_ICONINFORMATION, MB_OK, fr, 0);
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({st:tmpl, command:command}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/tmpl/process',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  function setPage6(item) {
    showPage(6);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/tmpl/list',
      success: function(result) {listTmpls(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  // 缓存管理
  function listCaches(data, button) {
    if (data.error) MessageBox(getErrorMessage(data.error), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
    var items = data.items;
    var grid = $('#ap7_data');
    grid.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: '240',
      colNames: ['缓存项目Key', '说明'],
      colModel: [
        {name:'k', index:'k', width:200, fixed:true, sortable:false, align:'left'},
        {name:'d', sortable:false, align:'left'}
      ],
      loadui: true,
      multiselect: false,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true,
      rowNum: 10,
      rowList: [10,20,30],
      pager: '#ap7_pager',
      recordpos: 'left',
      pagerpos: 'center',
      viewrecords: true
    });
    grid.setGridParam({data:items, page:1});
    grid.trigger('reloadGrid');
    $('#ap7_total').text('Total: ' + items.length + '项缓存数据!');
    var buttons = [{name:'clear', text:'清除缓存', title:'清除所有缓存', click:clearCache}];
    var params = {data:[data]};
    $('#ap7_bar1').addButtons(buttons, params);
    $('#ap7_bar2').addButtons(buttons, params);
  }

  function clearCache(data, button) {
    var fs = function(result) {
      var error = result.ERROR ? result.ERROR : 0;
      var msg = error ? '清除系统缓存失败: ' + getErrorMessage(error) : '已经清除系统中的所有缓存!';
      $('#ap7_info').attr('class', 'left ' + (error ? 'red' : 'blue'));
      $('#ap7_info').text(msg);
      if (!error) {
        $('#ap7_data').clearGridData();
        $('#ap7_total').text('Total: 0项缓存数据!');
      }
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/cache/clear',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  function setPage7(item) {
    showPage(7);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/cache/list',
      success: function(result) {listCaches(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  // 系统设置
  function listConfigs(data, button) {
    if (data.error) MessageBox(getErrorMessage(data.error), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
    var table = $('#ap8_data');
    var configs = (data && data.configs) ? data.configs : [];
    table.children().remove();
    var header = [
      {text:'名称', width:160},
      {text:'值'},
      {text:'描述', width:160}
    ];
    table.addRow(header, {cssClass: 'header'});
    var i, j, ii, row, id, name, at, as, ad, ah, ar, ccn;
    var nn = [{id:'ap8_configs_n', name:'name', type:'span'}, {id:'ap8_configs_v', name:'value'}, {id:'ap8_configs_d', name:'description', type:'span'}];
    for (i = 0; i < configs.length; i++) {
      row = [];
      for (j = 0; j < nn.length; j++) {
        def = {id:nn[j].id+i, value:configs[i][nn[j].name], '#base':nn[j], hint:configs[i].hint, 
          preCreate:function(des) {if (des.name == 'value') des.title = configs[i].value;}
        };
        if (configs[i].readOnly) def.readonly = true;
        row.push({obj:$.fn.addElement(def)});
      }
      ccn = i%2 == 0 ? 'even' : 'odd';
      table.addRow(row, {cssClass: ccn});
    }
    $('#ap8_total').text('Total: ' + configs.length + '项系统设置!');
    var buttons = [
      {text:'重置', title:'重置系统设置', click:listConfigs},
      {text:'保存', title:'保存系统设置', click:saveConfigs}
    ];
    var params = {data:[data]};
    $('#ap8_bar1').addButtons(buttons, params);
    $('#ap8_bar2').addButtons(buttons, params);
    if (button) $('#ap8_info').text('系统设置已被重置!');
  }

  function saveConfigs(data, button) {
    var configs = (data && data.configs) ? data.configs : [];
    var table = $('#ap8_data');
    var i, dd = [], d;
    var nn = [{id:'ap8_configs_n', name:'name'}, {id:'ap8_configs_v', name:'value'}];
    for (i = 0; i < configs.length; i++) {
      if (configs[i].readOnly) continue;
      d = getEles(table, i, nn);
      dd.push(d);
    }
    var fs = function(result) {
      var error = result.ERROR ? result.ERROR : 0;
      var msg = error ? '系统设置失败: ' + getErrorMessage(error) : '系统设置成功!';
      $('#ap8_info').attr('class', 'left ' + (error ? 'red' : 'blue'));
      $('#ap8_info').text(msg);
      if (data) data.configs = dd;
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({configs:dd}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/config/save',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  function setPage8(item) {
    showPage(8);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: '{}',
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/config/list',
      success: function(result) {listConfigs(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  // 查看日志
  function listLogs(data, button) {
    if (data.error) MessageBox(getErrorMessage(data.error), APP_ERROR, MB_ICONERROR, MB_OK, null, 0);
    var logs = data.logs;
    var map = {};
    var i, grid = $('#ap9_data');
    grid.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['时间', '位置', '级别', '登录工号', '错误消息'],
      colModel: [
        {name:'dateline', width:160, formatter:'date', fixed:true, sortable:false, align:'center'},
        {name:'#location', width:360, fixed:true, sortable:false, align:'right'},
        {name:'level', width:60, fixed:true, sortable:false, align:'center'},
        {name:'pernr', width:80, fixed:true, sortable:false, align:'center'},
        {name:'content', sortable:false, align:'left'}
      ],
      loadui: true,
      multiselect: false,
      onSelectRow: openLog,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true,
      rowNum: 10,
      rowList: [10,20,30],
      pager: '#ap9_pager',
      recordpos: 'left',
      pagerpos: 'center',
      viewrecords: true
    });
    for (i = 0; i < logs.length; i++) {
      logs[i]['#location'] = logs[i].clazz + ':' + logs[i].method + '(' + logs[i].line + ')';
      map[logs[i].id] = logs[i];
    }
    grid.setGridParam({data:logs, page:1, map:map});
    grid.trigger('reloadGrid');
    $('#ap9_total').text('Total: ' + logs.length + '条系统日志!');
    var buttons = [{name:'clear', text:'清除日志', title:'清除所有日志', click:clearLogs}];
    var params = {data:[data]};
    $('#ap9_bar1').addButtons(buttons, params);
    $('#ap9_bar2').addButtons(buttons, params);
  }

  function openLog(rowid, status) {
    var logs = $('#ap9_data').selectedItems();
    if (logs != null && logs.length > 0) debug(logs[0]);
  }

  function clearLogs(data, button) {
    var fs = function(result) {
      var error = result.ERROR ? result.ERROR : 0;
      var msg = error ? '清除日志失败: ' + getErrorMessage(error) : '清除日志成功!';
      $('#ap9_info').attr('class', 'left ' + (error ? 'red' : 'blue'));
      $('#ap9_info').text(msg);
      if (!error) {
        $('#ap9_data').clearGridData();
        $('#ap9_total').text('Total: 0条系统日志!');
      }
    };
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/log/clear',
      success: fs,
      error: function() {ajaxError(arguments, this);}
    });
  }

  function setPage9(item) {
    showPage(9);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: $.toJSON({}),
      dataType: 'json',
      url: APP_CONTEXT_PATH + '/admin/log/list',
      success: function(result) {listLogs(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  $.APP_ADMIN = $.APP_ADMIN || {version: '1.0.0', name: 'APP_ADMIN'}; // 包装成类, 更好地控制调用访问接口
  $.extend($.APP_ADMIN, {
    init: init
  });
})(jQuery);

$(function() {
  $.APP_MENU.init(7);
  $.APP_ADMIN.init(10);
});
