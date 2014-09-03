(function($) {

  // 登录
  $('#btn_login').click(function() {
    var data = {
      username: $('#username').val(),
      password: $('#password').val(),
      vcode: $('#vcode').val(),
      rememberMe: false
    };
    login(data);
  });

  function init()
  {
  }
  
  function refreshVcode(box)
  {
    var t = new Date().getTime();
    var src = APP_CONTEXT_PATH + '/vcode?' + t;
    $('#ivcode', box).attr('src', src);
  }

  function login(data)
  {
    if (!validLoginData(data)) return;
    // var data = $.toJSON($('#login_form').serialize());
    var json = $.toJSON(data);
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: APP_CONTEXT_PATH + '/account/login',
      data: json,
      dataType: 'json',
      success: function(result) {processLogin(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  function validLoginData(data)
  {
    var r = false;
    var msg = '';
    var f = null;
    if (data.username.empty()) {
      msg = '请输入非空用户名!';
      f = function(ret) {
        $('#username').trigger('focus');
      };
    } else if (APP_USE_VCODE && !data.extra.vcode.match(/^[2-8]{4}$/)) {
      msg = '请输入合法验证码!';
      f = function(ret) {
        $('#vcode').trigger('focus');
        $('#vcode').trigger('select');
      };
    } else r = true;
    if (!r && msg) MessageBox(msg, APP_WARNING, MB_ICONWARNING, null, f, 2);
    return r;
  }

  function processLogin(result)
  {
    APP_ACC = result.APP_ACC;
    window.location.href = '/';
  }

  function logout()
  {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: APP_CONTEXT_PATH + '/account/logout',
      success: function(result) {processLogout(result);},
      error: function() {ajaxError(arguments, this);}
    });
  }

  function processLogout(result)
  {
    APP_ACC = false;
  }

  $.LOGIN = $.LOGIN || {version: '1.0.0', name: 'LOGIN'};
  $.extend($.LOGIN, {
    init:init
  });
})(jQuery);

$(function() {
  $.LOGIN.init();
});
