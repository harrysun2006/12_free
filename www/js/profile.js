(function($) {

  function init(data) {
    if (data == null || typeof(data) == 'undefined') return;
    var me = data.me ? data.me : {};
    var lead = data.lead ? data.lead : {};
    var profile = data.profile ? data.profile : {};
    var karmas = data.karmas ? data.karmas : [];
    var s, i, grid = $('#pp_data');
    $('#pp_name').text(me.name);
    $('#pp_name').attr('title', me.name);
    s = me.team + ' > ' + me.group + ' > ' + me.dept;
    $('#pp_depart').text(s);
    $('#pp_depart').attr('title', s);
    $('#pp_pernr').text(me.pernr);
    $('#pp_pernr').attr('title', me.pernr);
    $('#pp_duty').text(me.duty);
    $('#pp_duty').attr('title', me.duty);
    s = lead ? lead.name + ' [' + lead.duty + ']' : '';
    $('#pp_lead').text(s);
    $('#pp_lead').attr('title', s);
    $('#pp_karma').text(profile.karma);
    $('#pp_cntJob').text(profile.cntJob);
    $('#pp_cntAction').text(profile.cntAction);
    $('#pp_cntTopic').text(profile.cntTopic);
    $('#pp_cntPost').text(profile.cntPost);
    grid.jqGrid({
      autowidth: true,
      datatype: 'local',
      height: 'auto',
      colNames: ['ID', '时间', '增加/扣除积分', '描述'],
      colModel: [
        {name:'id', hidden:true},
        {name:'dateline', width:120, formatter:'date', fixed:true, sortable:false, align:'center'},
        {name:'value', width:120, fixed:true, sortable:false, align:'center'},
        {name:'desc', sortable:false, align:'left'}
      ],
      loadui: true,
      multiselect: false,
      scroll: false,
      scrollOffset: 0,
      altclass: 'jqgrow-odd',
      altRows: true,
      rowNum: 10,
      rowList: [10,20,30],
      pager: '#pp_pager',
      recordpos: 'left',
      pagerpos: 'center',
      viewrecords: true
    });
    // for (i = 0; i < karmas.length; i++) karams[i]['#dateline'] = karams[i];
    grid.setGridParam({data:karmas, page:1});
    grid.trigger('reloadGrid');
    grid.setSelection(0);
  }
  
  $.PROFILE = $.PROFILE || {version: '1.0.0', name: 'PROFILE'};
  $.extend($.PROFILE, {
    init: init
  });
})(jQuery);

$(function() {
  $.APP_MENU.init(5);
  $.ajax({
    type : 'POST',
    contentType : 'application/json',
    data: '{}',
    dataType: 'json',
    url : APP_CONTEXT_PATH + '/account/profile',
    success : $.PROFILE.init,
    error : function() {ajaxError(arguments, this);}
  });
});