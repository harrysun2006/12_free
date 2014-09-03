(function($) {
  // 定义菜单常量/方法, 依赖于全局变量IDS_ADD, IDS_CONTEXT_PATH
  var MENU_GUEST = [
    {label: '主页', href: '/'},
    {label: '我的提案', href: '/my_job'},
    {label: '提案查询', href: '/query_job'},
    {label: '提案登入', href: '/add_job'},
    {label: 'BBS论坛', href: '/bbs', style: 'top: -2; position: relative;'},
    {label: '我的账户', href: '/profile'},
    {label: '现场奖励', href: '/bonus'}
  ];
  var MI_ADMIN = {label: '后台管理', href: '/admin'};
  var MENU_ADMIN1 = MENU_GUEST.clone().concat(cloneObject(MI_ADMIN));
  var MENU_ADMIN2 = MENU_GUEST.clone().concat(cloneObject(MI_ADMIN));
  for (var i = 1; i <= 6; i++) MENU_ADMIN1[i].enabled = false;
  
  function init(options)
  {
    var menu = $('#menu');
    var tab = $('#menu_tab');
    var items = null;
    if (!IDS_ACC || !IDS_ACC.admin) items = MENU_GUEST;
    else if (IDS_ACC.extra.admin_type == 1) items = MENU_ADMIN1;
    else if (IDS_ACC.extra.admin_type == 2) items = MENU_ADMIN2;
    if (typeof(options) == 'number') options = {selectedIndex: options};
    clear(tab);
    if (items.length >= 8) {
      menu.addClass('m8');
      menu.removeClass('m7');
    } else {
      menu.addClass('m7');
      menu.removeClass('m8');
    }
    for (var i = 0; i < items.length; i++) {
      items[i].selected = (i == options.selectedIndex);
      items[i].first = (i == 0);
      addItem(tab, items[i]);
    }
  }
  
  function clear(menu)
  {
    try {
      menu.children().remove();
    } catch (e) {alert(e);}
  }
  
  /**
   * 添加一项菜单
   * item: {label:文本, href:链接, style:额外样式, enabled:是否有效, first:是否是第一项, selected:是否选中}
   */
  function addItem(menu, item)
  {
    try {
      var li = $(document.createElement('li'));
      var mi;
      var enabled = typeof(item.enabled) == 'undefined' ? true : (item.enabled ? true : false);
      if (enabled) {
        mi = $(document.createElement('a'));
        mi.attr('href', IDS_CONTEXT_PATH + item.href);
        if (item.selected) mi.addClass('selected');
        if (item.style) mi.attr('style', item.style);
      } else {
        mi = $(document.createElement('span'));
      }
      if (item.first) {
        var span = $(document.createElement('span'));
        if (item.selected) span.addClass('selected');
        span.text(item.label);
        mi.append(span);
      } else {
        mi.text(item.label);
      }
      li.append(mi);
      menu.append(li);
    } catch (e) {alert(e);}
  }

  $.IDS_MENU = $.IDS_MENU || {version: '1.0.0', name: 'IDS_MENU'}; // 包装成类, 更好地控制调用访问接口
  $.extend($.IDS_MENU, {
    init: init
  });
})(jQuery);