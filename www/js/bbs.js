(function($) {

  var TT_ELE_PREIX = 'tt_auto_';
  var _ele_id = 10000;

  function getId() {
    return _ele_id++;
  }

  function init(data) {
    $('bbs_topic').hide();
    var bbs = $('#bbs_forum');
    var forums = data.forums;
    var ul = $(document.createElement('ul'));
    var i;
    bbs.append(ul);
    for (i = 0; i < forums.length; i++) {
      initForum(bbs, ul, forums[i]);
    }
    // 使用tab控件显示
    bbs.tabs({selected: 0, select: function(ev, ui) {openForum(forums[ui.index]);}});
    if (forums.length > 0) openForum(forums[0]);
  }

  function initForum(bbs, ul, forum) {
    var li = $(document.createElement('li'));
    var a = $(document.createElement('a'));
    a.text(forum.name);
    a.attr('href', '#ff_'+forum.id);
    a.attr('title', forum.description);
    li.append(a);
    ul.append(li);
    initTopics(bbs, forum);
    // 添加一个tab页: add(url, label, [index])
    bbs.add('#ff_'+forum.id, forum.name, forum.idx);
  }

  function initTopics(bbs, forum) {
    var topics = forum.topics;
    var div = $(document.createElement('div'));  // tab页容器, ff_xx, f1+f2
    var f1 = $(document.createElement('div'));   // f1_xx, aa+bb
    var aa = $(document.createElement('span'));  // 标题, fa_xx
    var bb = $(document.createElement('div'));   // 操作按钮, fb_xx
    var f2 = $(document.createElement('div'));   // f2_xx, tt+pp
    var tt = $(document.createElement('table')); // 帖子列表(jqGrid), ft_xx
    var pp = $(document.createElement('div'));   // 帖子翻页(jqGrid), fp_xx

    div.attr('id', 'ff_'+forum.id);
    f1.attr('id', 'f1_'+forum.id);
    aa.attr('id', 'fa_'+forum.id);
    aa.text(forum.description);
    aa.css('float', 'left');
    bb.attr('id', 'fb_'+forum.id);
    tt.attr('id', 'ft_'+forum.id);
    pp.attr('id', 'fp_'+forum.id);
    pp.attr('title', forum.name);
    div.addClass('bbs');
    f1.addClass('a');
    f2.addClass('b');
    div.append(f1);
    div.append(f2);
    f1.append(aa);
    f1.append(bb);
    f2.append(tt);
    f2.append(pp);
    bbs.append(div);
    f1.width(div.width()-10);
    f2.width(div.width()-15);
    aa.height(f1.height());
    aa.css('line-height', f1.height()+'px');
  }

  function openForum(forum) {
    var fs = function(result) {
      showTopics(forum, result.topics);
    };
    $.ajax({
      type : 'POST',
      contentType : 'application/json',
      data: $.toJSON(forum),
      dataType: 'json',
      url : APP_CONTEXT_PATH + '/topic/list',
      success : fs,
      error : function() {ajaxError(arguments, this);}
    });
  }

  function showTopics(forum, topics) {
    $('#bbs_forum').show();
    $('#bbs_topic').hide();
    var ft = $('#ft_'+forum.id);
    var fp = $('#fp_'+forum.id);
    var map = {};

    var f1 = function(cellvalue, options, rowObject) {return fmtTopic(forum, cellvalue, options, rowObject);};
    // 显示帖子列表
    ft.clearGridData(true);
    ft.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['ID', '主题', '作者', '回复/查看', '最后发表'],
      colModel: [
        {name:'id', hidden:true},
        {name:'title', fixed:false, sortable:false, formatter:f1, align:'left'},
        {name:'#creator', width:120, fixed:true, sortable:false, align:'center'},
        {name:'#count', width:80, fixed:true, sortable:false, align:'center'},
        {name:'#last', width:120, fixed:true, sortable:false, align:'center'}
      ],
      loadui: true,
      multiselect: false,
      ondblClickRow: function(rowid, iRow, iCol, e) {openTopic(forum, rowid);},
      onSelectRow: function(rowid, status) {selectTopic(forum, rowid);},
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true,
      rowNum: 10,
      rowList: [10,20,30],
      pager: fp,
      recordpos: 'left',
      pagerpos: 'center',
      viewrecords: true
    });
    // ft.css('min-height', '260px');
    showButtons(forum);
    if (topics == null) topics = [];
    var t;
    for (i = 0; i < topics.length; i++) {
      t = topics[i];
      map[t.id] = t;
      t.forum = forum;
      t['#creator'] = t.creator.name + '\n' + new Date(t.dateline).format('Y-m-d');
      t['#count'] = t.cntReply + '/' + t.cntView;
      t['#last'] = (t.lastPostCreator ? t.lastPostCreator.name : '') + '\n'
        + (t.lastPostDateline ? new Date(t.lastPostDateline).format('Y-m-d') : '');
    }
    ft.setGridParam({data:topics, map:map, page:1});
    ft.trigger('reloadGrid');
    ft.setSelection(0);
  }

  function fmtTopic(forum, cellvalue, options, rowObject) {
    var topic = rowObject;
    var name = options.colModel.name;
    var r = cellvalue;
    var div, s;
    if (name == 'title') {
      div = $(document.createElement('div'));
      if (topic.top) div.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'bbs_top,left'});
      if (topic.up > 0) div.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'bbs_up,left'});
      div.addElement({id:TT_ELE_PREIX+getId(), type:'span', text:cellvalue, css:'left'});
      r = div.html();
    }
    return r;
  }

  function showButtons(forum, topic) {
    var me = APP_ACC;
    var buttons = [];
    if (forum.cat == 'N' || (forum.cat == 'T' && (me.admin || me.emp.manager))) buttons.push({text:'发帖', title:'发表新话题', click:addTopic});
    if (topic && me.admin) {
      buttons.push({text:'删除', title:'删除', command:'delete', click:_processTopic});
      if (topic.up <= 0) buttons.push({text:'加星', title:'加星', command:'up', click:_processTopic});
      else buttons.push({text:'取消加星', title:'取消加星', command:'down', click:_processTopic});
      if (!topic.top) buttons.push({text:'置顶', title:'置顶', command:'top', click:_processTopic});
      else buttons.push({text:'取消置顶', title:'取消置顶', command:'bottom', click:_processTopic});
    }
    var _topic = topic ? topic : {forum: forum};
    var params = {clear:true, data:[_topic]};
    var bb = $('#fb_'+forum.id);
    bb.addButtons(buttons, params);
  }

  function selectTopic(forum, rowid) {
    var sels = $('#ft_'+forum.id).selectedItems();
    var topic = sels && sels.length > 0 ? sels[0] : null;
    showButtons(forum, topic);
  }

  function openTopic(forum, rowid) {
    var sels = $('#ft_'+forum.id).selectedItems();
    var topic = sels && sels.length > 0 ? sels[0] : null;
    if (topic == null) {
      MessageBox('请选择一个主题!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
      return;
    }
    _openTopic(topic);
  }

  function _openTopic(topic) {
    var fs = function(result) {
      showPosts(result.topic, result.posts);
    };
    $.ajax({
      type : 'POST',
      contentType : 'application/json',
      data: $.toJSON(topic),
      dataType: 'json',
      url : APP_CONTEXT_PATH + '/post/list',
      success : fs,
      error : function() {ajaxError(arguments, this);}
    });
  }

  function addTopic(topic, button) {
    var params = {forum:topic.forum, topic:topic, title:'', content:'', op:'add', caption:button.title, '#onSave':saveTopic};
    $.APP_INFO.open(params);
  }

  function saveTopic(params) {
    var topic = {title:params['#title'], content:params['#content'], forum:params.forum};
    if (params.hasOwnProperty('id')) topic.id = params.id;
    var command = params.op;
    processTopic(topic, command, params['#onSaved']);
  }

  function _processTopic(topic, button) {
    var forum = topic.forum;
    var sels = $('#ft_'+forum.id).selectedItems();
    var _topic = sels && sels.length > 0 ? sels[0] : null;
    processTopic(_topic, button.command);
  }

  function processTopic(topic, command, callback) {
    if (topic == null) {
      MessageBox('请选择一个主题!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
      return;
    }
    var data = {
      command: command,
      topic: topic
    };
    var fs = function(result) {
      showTopics(result.forum, result.topics);
    };
    $.ajax({
      type : 'POST',
      contentType : 'application/json',
      data: $.toJSON(data),
      dataType: 'json',
      url : APP_CONTEXT_PATH + '/topic/process',
      success : callback ? callback : fs,
      error : function() {ajaxError(arguments, this);}
    });
  }

  function showPosts(topic, posts) {
    $('#bbs_forum').hide();
    $('#bbs_topic').show();
    var tt = $('#tt_data');
    var pp = $('#tt_pager');
    var f1 = function(cellvalue, options, rowObject) {return fmtPost(topic, cellvalue, options, rowObject);};
    // 显示帖子列表
    tt.clearGridData(true);
    tt.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['ID', '作者', '内容'],
      colModel: [
        {name:'id', hidden:true},
        {name:'#col1', formatter:f1, fixed:true, title:false, align:'center', width:160},
        {name:'#col2', formatter:f1, fixed:false, title:false, align:'left'}
      ],
      loadui: true,
      multiselect: false,
      scroll: false,
      scrollOffset: 0,
      rowNum: 10,
      rowList: [10,20,30],
      pager: pp,
      recordpos: 'left',
      pagerpos: 'right',
      viewrecords: false,
      hoverrows: false,
      gridview: true
    });
    if (posts == null) posts = [];
    // 加入2条特殊的post: topic(title), topic(content)
    var p0, p1, p2;
    p1 = cloneObject(topic);
    p2 = cloneObject(topic);
    p1['#type'] = 'TT';
    p2['#type'] = 'TC';
    posts.unshift(p1, p2);
    for (i = 0; i < posts.length; i++) {
      p0 = posts[i];
      if (!p0['#type']) p0['#type'] = 'PP';
      p0.forum = topic.forum;
    }
    tt.setGridParam({data:posts, page:1});
    tt.trigger('reloadGrid');
  }

  function returnForum(ev) {
    var topic = ev.data[0];
    $('#bbs_topic').hide();
    $('#bbs_forum').show();
    if (topic && topic.forum) openForum(topic.forum);
  }

  /**
   * 注意jqGrid提供的此接口必须返回字符串, 无法直接对单元格DOM对象操作
   * 因此添加的按钮如需绑定function, 必须放到setTimeout中, 待返回后jqGrid会将对应的HTML渲染到document上, 此时便可以绑定
   */
  function fmtPost(topic, cellvalue, options, rowObject) {
    var p = rowObject;
    var t = p['#type'];
    var name = options.colModel.name;
    var oo, div, rr, d, s;
    var pc = p.creator ? p.creator : {};
    var pcp = pc ? pc.profile : {};
    // 垂直居中
    var fc = function(pobj, id, params) {
      var h0 = $('#'+pobj.attr('id')).height();
      var h1 = $('#'+id).height();
      var top = Math.floor((h0-h1+1)/2);
      $('#'+id).css('top', top);
    };
    // vertical-align ==> top
    var ft = function(pobj, id, params) {
      var self = $('#'+id);
      var td = self.parent().parent();
      td.attr('valign', 'top');
    };
    var fm = function(pc) {
      return pc.pernr == APP_ACC.pernr;
    };
    oo = $(document.createElement('div'));
    div = $(document.createElement('div'));
    div.attr('id', TT_ELE_PREIX + getId());
    div.css('width', '99%');
    if (t == 'TT') {
      if (name == '#col1') {
        s = '查看: ' + p.cntView + '回复: ' + p.cntReply;
        div.addElement({type:'span', text:s});
      } else if (name == '#col2') {
        div.addClass('left');
        div.addClass('m6');
        div.addElement({id:TT_ELE_PREIX+getId(), type:'span', text:p.title, css:'h3,left'});
        if (p.top) div.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'bbs_top,left'});
        if (p.up > 0) div.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'bbs_up,left'});
        div.addElement({id:TT_ELE_PREIX+getId(), type:'a', text:'返回', css:'right,button,enabled', click:returnForum, params:[p]});
        div.addElement({id:TT_ELE_PREIX+getId(), type:'a', text:'回复', css:'right,button,enabled', click:replyTopic, params:[p]});
      }
    } else if (t == 'TC' || t == 'PP') {
      div.addClass('left');
      div.addClass('m0');
      if (name == '#col1') {
        s = '工号: ' + pc.pernr 
          + '<BR>姓名: ' + pc.name 
          + '<BR>发帖数: ' + pcp.cntTopic
          + '<BR>跟帖数: ' + pcp.cntPost
          + '<BR>积分: ' + pcp.karma;
        div.addElement({id:TT_ELE_PREIX+getId(), type:'span', html:s, css:'bcol1', onShow:ft});
      } else if (name == '#col2') {
        d = div.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'bcol2'});
        d.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'bbs_member,left'})
        d.addElement({id:TT_ELE_PREIX+getId(), type:'span', text:' 发表于 ' + new Date(p.dateline).format('Y-m-d H:i:s')});
        if (fm(pc)) d.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'bbs_delete,right,button,enabled', title:'删除', click:deletePost, params:[p]});
        if (fm(pc)) d.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'bbs_edit,right,button,enabled', title:'编辑', click:editPost, params:[p]});
        div.addElement({id:TT_ELE_PREIX+getId(), type:'div', css:'clear'});
        div.addElement({id:TT_ELE_PREIX+getId(), type:'span', css:'left', html:p.content});
      }
    } 
    oo.append(div);
    rr = oo.html();
    return rr;
  }

  function replyTopic(ev) {
    var p = ev.data[0];
    var params = {topic:p, content:'', op:'add', caption:'回复:'+p.title, '#onSave':savePost};
    $.APP_INFO.open(params);
  }

  function deletePost(ev) {
    var p = ev.data[0];
    var t = p['#type'];
    if (t == 'TC') processTopic(p, 'delete');
    else if (t == 'PP') processPost(p, 'delete');
  }

  function editPost(ev) {
    var p = ev.data[0];
    var t = p['#type'];
    var params;
    if (t == 'TC') {
      var fs = function() {_openTopic(p.id);};
      params = {id:p.id, forum:p.forum, topic:p.topic, title:p.title, content:p.content, op:'update', caption:'编辑主题: '+p.title, '#onSave':saveTopic, '#onSaved':fs};
      $.APP_INFO.open(params);
    } else if (t == 'PP') {
      params = {id:p.id, forum:p.forum, topic:p.topic, content:p.content, op:'update', caption:'编辑帖子: '+p.title, '#onSave':savePost};
      $.APP_INFO.open(params);
    }
  }

  function savePost(params) {
    var post = {content:params['#content'], topic:params.topic};
    if (params.hasOwnProperty('id')) post.id = params.id;
    processPost(post, params.op, params['#onSaved']);
  }

  function processPost(post, command, callback) {
    if (post == null) {
      MessageBox('请输入回复内容!', APP_ERROR, MB_ICONERROR, MB_OK, null, 3);
      return;
    }
    post.topic = {id:post.topic.id};
    var data = {
      command: command,
      post: post
    };
    var fs = function(result) {
      showPosts(result.topic, result.posts);
    };
    $.ajax({
      type : 'POST',
      contentType : 'application/json',
      data: $.toJSON(data),
      dataType: 'json',
      url : APP_CONTEXT_PATH + '/post/process',
      success : fs,
      error : function() {ajaxError(arguments, this);}
    });
  }

  $.BBS = $.BBS || {version: '1.0.0', name: 'BBS'};
  $.extend($.BBS, {
    init: init
  });
})(jQuery);

$(function() {
  $.APP_MENU.init(4);
  $.ajax({
    type : 'POST',
    contentType : 'application/json',
    data: $.toJSON({}),
    dataType: 'json',
    url : APP_CONTEXT_PATH + '/forum/list',
    success : $.BBS.init,
    error : function() {ajaxError(arguments, this);}
  });
});
