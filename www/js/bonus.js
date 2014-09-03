(function($) {
  
  function init(data) {
    show(data);
  }
  
  function show(data) {
    $.APP_JOB.setTypes(data['job.types']);
    $.APP_JOB.setStatus(data['job.status']);
    $.APP_JOB.setCats(data['job.cats']);
    var grid1 = $('#bo_data1');
    var grid2 = $('#bo_data2');
    var jobs1 = data.jobs1;
    var jobs2 = data.jobs2;
    var text = '';
    grid1.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['ID', '时间', '提案部门', '提案者', '提案类型', '主题', '等级', '得分', '平均得分(现场)'],
      colModel: [
        {name:'id', hidden:true},
        {name:'reqTime', index:'reqTime', formatter:'date', width:120, fixed:true, sortable:false, align:'center'},
        {name:'#dept1', width:80, fixed:true, sortable:false},
        {name:'#requester', width:100, fixed:true, sortable:false},
        {name:'#catText', width:80, fixed:true, sortable:false, align:'center'},
        {name:'title', sortable:false},
        {name:'#rank', width:60, fixed:true, sortable:false, align:'center'},
        {name:'#score', width:60, fixed:true, sortable:false, align:'center'},
        {name:'#avg', width:120, fixed:true, formatter:'number', sortable:false, align:'center'}
      ],
      loadui: true,
      multiselect: false,
      onSelectRow: openRow,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true
    });
    load(grid1, jobs1);
    text = '优秀提案[' + data.cal1 + '~' + data.cal2 + ']: ' + jobs1.length + '条记录!';
    text += APP_ACC.admin ? ' 请指定现场奖励评分人员!' : ' 请进行评分!'
    $('#bo_total1').text(text);
    grid2.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['ID', '时间', '提案部门', '提案者', '提案类型', '主题', '等级', '得分', '平均得分(现场)'],
      colModel: [
        {name:'id', hidden:true},
        {name:'reqTime', index:'reqTime', formatter:'date', width:120, fixed:true, sortable:false, align:'center'},
        {name:'#dept1', width:80, fixed:true, sortable:false},
        {name:'#requester', width:100, fixed:true, sortable:false},
        {name:'#catText', width:80, fixed:true, sortable:false, align:'center'},
        {name:'title', sortable:false},
        {name:'#rank', width:60, fixed:true, sortable:false, align:'center'},
        {name:'#score', width:60, fixed:true, sortable:false, align:'center'},
        {name:'#avg', width:120, fixed:true, formatter:'number', sortable:false, align:'center'}
      ],
      loadui: true,
      multiselect: false,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true
    });
    load(grid2, jobs2);
    text = '获奖提案[' + data.cal3 + '~' + data.cal4 + ']: ' + jobs2.length + '条记录!';
    $('#bo_total2').text(text);
  }

  function load(grid, jobs, filter) {
    var i, cnt = 0;
    grid.clearGridData();
    for(i = 0; i < jobs.length; i++) {
      if (typeof(filter) == 'function' && filter(jobs[i]) == false) continue;
      $.APP_JOB.initJob(jobs[i]);
      jobs[i]['#avg'] = jobs[i]['extra']['s.avg'];
      grid.addRowData(i+1, jobs[i]);
      cnt++;
    }
  }

  function openRow(rowid, status) {
    var job = $('#bo_data1').getRowData(rowid);
    var json = $.toJSON({id: job.id});
    var f = function(data) {
      openJob(rowid, data);
    };
    $.ajax({
      type : 'POST',
      contentType : 'application/json',
      url : APP_CONTEXT_PATH + '/job/open',
      data: json,
      dataType: 'json',
      success : f,
      error : function() {ajaxError(arguments, this);}
    });
  }
  
  function openJob(rowid, data) {
    $('#bo_list').hide();
    var params = {
      '#onJobReturn': function(job) {
        $('#bo_list').show();
      },
      '#onActReturn': function(job) {
        $('#bo_list').show();
      }
    };
    $.APP_JOB.openJob(data, params);
  }

  $.BONUS = $.BONUS || {version: '1.0.0', name: 'BONUS'}; // 包装成类, 更好地控制调用访问接口
  $.extend($.BONUS, {
    init: init
  });
})(jQuery);
  
$(function() {
  $.APP_MENU.init(6);
  $.ajax({
    type : 'POST',
    contentType : 'application/json',
    data: '{}',
    dataType: 'json',
    url : APP_CONTEXT_PATH + '/job/bonus',
    success : $.BONUS.init,
    error : function() {ajaxError(arguments, this);}
  });
});