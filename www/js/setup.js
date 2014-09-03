(function($) {
  MessageBox("系统检测到您第一次使用本系统，请设置管理员账号", APP_TITLE, MB_ICONWARNING, null, null, 2);

  $("#reset").click(function() {
    $('#username').val('');
    $('#password').val('');
    $('#agpassword').val('');
    $('#nickname').val('');
  });

  $("#ok").click(function() {
    admin();
  });

  function init()
  {
  }

  function validateAdmin(data)
  {
    var r = false;
    var msg = '';
    var f = null;
    if (data.username.empty()) {
      msg = '请输入非空用户名!';
      f = function(ret) {$('#username').trigger('focus');};
    } else if (data.password.empty()) {
      msg = '请输入非空密码!';
      f = function(ret) {$('#password').trigger('focus');};
    } else if (data.password != data.agpassword) {
      msg = '两次输入的密码不一致!';
      f = function(ret) {
        $('#password').val('');
        $('#agpassword').val('');
        $('#password').trigger('focus');
      };
    } else if (data.nickname.empty()) {
      msg = '请输入非空昵称!';
      f = function(ret) {$('#nickname').trigger('focus');};
    } else r = true;
    if (!r && msg) MessageBox(msg, APP_WARNING, MB_ICONWARNING, null, f, 2);
    return r;
  }

  function admin()
  {
    var data = {
      username : $("#username").val(),
      password : $("#password").val(),
      agpassword : $('#agpassword').val(),
      nickname : $("#nickname").val()
    };
    if (!validateAdmin(data)) return;
    var json = $.toJSON(data);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: APP_CONTEXT_PATH + '/setup/admin',
      data: json,
      dataType: 'json',
      success: function(result) {processAdmin(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  function processAdmin(result)
  {
    APP_ACC = result.APP_ACC;
    window.location.href = '/';
  }

  $.SETUP = $.SETUP || {version: '1.0.0', name: 'SETUP'};
  $.extend($.SETUP, {
    init:init
  });
})(jQuery);

$(function() {
  $.SETUP.init();
});