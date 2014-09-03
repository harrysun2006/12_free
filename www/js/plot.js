(function($) {
	$('.plot_edit').click(search);

  $('#btn_commit').click(function() {
    var data = {
      no : $('#no').val(),
      name : $('#name').val(),
      shortName : $('#shortname').val(),
      regTime : $('#regtime').val(),
      removeTime : $('#removetime').val(),
      status : $("#status").val()
    };
    add(data);
  });

  $('#regtime, #removetime').datepicker({
    showOn : 'button',
    buttonImage : APP_CONTEXT_PATH + 'image/calendar.gif',
    buttonImageOnly : true,
    changeMonth : true,
    changeYear : true,
    dateFormat : 'yy-mm-dd',
    showOn : 'both',
    showOtherMonths : true,
    selectOtherMonths : true
  });

  function init() {
  }

  function add(data) {
    var json = $.toJSON(data);
    $.ajax({
      type : 'POST',
      contentType : 'application/json',
      url : APP_CONTEXT_PATH + '/plot/add',
      data : json,
      dataType : 'json',
      success : function(result) {
        processPlot(result);
      },
      error : function() {
        ajaxError(arguments, this);
      }
    });
  }

  function search() {
    var params = {};
    $.ajax({
      type : 'POST',
      contentType : 'application/json',
      url : APP_CONTEXT_PATH + '/plot/search',
      data : $.toJSON(params),
      dataType : 'json',
      success : function(result) {
        debug(result, 3);
      $('.form').children().remove();
      $('.form').append(' <label for="no">输入查询条件</label><input name="search" id="search" type="text"/></p>');
      $('.form').append('');
      $('#darkbanner').replaceWith('<div id="darkbanner" class="banner320"><h2>查看地块</h2></div>');
      },
      error : function() {
        ajaxError(arguments, this);
      }
    });
  }
  function processPlot(result) {
    _alert(result.data);
  }

  $.PLOT = $.PLOT || {
    version : '1.0.0',
    name : 'PLOT'
  };
  $.extend($.PLOT, {
    init: init
  });
})(jQuery);

$(function() {
  $.PLOT.init();
});
