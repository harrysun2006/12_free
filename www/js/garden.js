

(function($) {
    $('#btn_commit').click(function() {
    var data= {
		no : $('#no').val(),
		name: $('#name').val(),
		shortname: $('#shortname').val(),
		regtime:$('#regtime').val(),
		address:$('#address').val(),
		status:$("#status").val(),
		memo:$("#memo").val()
		};
	add(data);
  });
    function init()
  {
  }
  
  function add(data)
  {
    var json = $.toJSON(data);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: APP_CONTEXT_PATH + '/garden/add',
      data: json,
      dataType: 'json',
      success: function(data) {_alert(data.data)},
      error: function() {ajaxError(arguments, this);}
    });
  }

  function processPlot(result)
  {
	  alert(result);
  }  
  

$('#regtime').datepicker({
  showOn: 'button',
  buttonImage: APP_CONTEXT_PATH + '/image/calendar.gif',
  buttonImageOnly: true,
  changeMonth: true,
  changeYear: true,
  dateFormat: 'yy-mm-dd',
  maxDate: new Date(),
  showOn: 'both',
  showOtherMonths: true,
  selectOtherMonths: true
});
  
  $.PLOT = $.PLot || {version: '1.0.0', name: 'PLOT'};
  $.extend($.PLOT, {
  });
})(jQuery);

$(function() {
	$.PLOT.init();
});


	