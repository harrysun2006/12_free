(function($) {

  function init()
  {
  }

  $.INDEX = $.INDEX || {version: '1.0.0', name: 'INDEX'}; // 包装成类, 更好地控制调用访问接口
  $.extend($.INDEX, {
    init:init
  });
})(jQuery);

$(function() {
  $.INDEX.init();
});
