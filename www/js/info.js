(function($) {

  var _width, _height;
  CKEDITOR.config.toolbar_View = [
    {name:'document', items: ['Source','-','DocProps','Preview','Print']},
    {name:'tools', items: ['Maximize']}
  ];

  CKEDITOR.config.toolbar_Edit =
  [
    { name: 'document',   items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
    { name: 'clipboard',  items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
    { name: 'editing',    items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
    { name: 'forms',    items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
    { name: 'basicstyles',  items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
    { name: 'paragraph',  items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
    '/',
    { name: 'links',    items : [ 'Link','Unlink','Anchor' ] },
    { name: 'insert',   items : [ 'Image','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
    { name: 'styles',   items : [ 'Styles','Format','Font','FontSize' ] },
    { name: 'colors',   items : [ 'TextColor','BGColor' ] },
    { name: 'tools',    items : [ 'Maximize', 'ShowBlocks' ] }
  ];

  function init() {
    _width = screen.width < 800 ? screen.width : screen.width - 200;
    _height = screen.height < 600 ? screen.height : screen.height - 200;
    $('#ii_box').dialog({
      autoOpen:false, 
      closeText:'hide',
      modal:true, 
      resizable:false,
      width:_width,
      height:_height
    });
    $('#ii_title').width(_width-10);
  }

  function validate(params) {
    var _title = $('#ii_title').val();
    var _content = $('#ii_content').val();
    var error = '', fobj;
    if (params.title != null && _title.empty()) {
      error = '请输入标题!';
      fobj = $('#ii_title');
    } else if (_content.empty()) {
      error = '请输入内容!';
      fobj = $('#ii_content');
    } else {
      params['#title'] = _title;
      params['#content'] = _content;
    }
    if (error) MessageBox(error, null, MB_ICONERROR, MB_OK, function() {fobj.focus();});
    return error == '';
  }

  function save(event) {
    var params = event.data[0];
    var fOnSave = params['#onSave'];
    if (validate(params) && typeof(fOnSave) == 'function') fOnSave(params);
    close();
  }

  function close() {
    $('#ii_box').dialog('close');
  }

  // params: title, content, op, caption, #onSave 
  function open(params) {
    var caption = params.caption || '';
    if (params.op == 'view') caption = params.title;
    $('#ii_box').dialog({title:caption}).dialog('open');
    $('#ii_title').val(params.title);
    $('#ii_content').val(params.content);
    $('#ii_save').unbind('click');
    $('#ii_save').bind('click', [params], save);
    $('#ii_close').unbind('click');
    $('#ii_close').bind('click', close);
    var config = {
      language:'zh-cn',
      image_previewText:' ',
      resize_enabled:false,
      width:_width-10
    };
    if (params.op == 'view') {
      $('#ii_save').hide();
      $('#ii_close').text('关闭');
      $('#ii_title').hide();
      $('#ii_content').attr('readonly', 'readonly');
      config.height = _height-160;
      config.readOnly = true;
      config.toolbar = 'View';
    } else {
      $('#ii_save').show();
      $('#ii_close').text('取消');
      $('#ii_title').show();
      $('#ii_content').removeAttr('readonly');
      config.height = _height-240;
      config.readOnly = false;
      config.toolbar = 'Edit';
    }
    if (typeof(params.title) == 'undefined') $('#ii_title').hide();
    $('#ii_content').ckeditor(config);
  }

  $.APP_INFO = $.APP_INFO || {version: '1.0.0', name: 'APP_INFO'};
  $.extend($.APP_INFO, {
    init: init,
    open: open
  });
})(jQuery);

$(function() {
  $.APP_INFO.init();
});
