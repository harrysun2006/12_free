(function($) {
  var ERROR_EXT_NOTALLOWED = '系统禁止上传后缀为{EXT}的文件!';
  var ERROR_SIZE_EXCEEDED = '文件[{FILE}]的大小超过了20MB';
  var ERROR_ONLY_IMAGE = '只允许上传图片文件!';

  // 在附件显示区显示附件
  function showAtts(qatts, atts, downloadable, deletable) {
    var i, att, name, e1, e2, e3;
    var f_gn = function(_name) {
      if (!_name) return '';
      var _p = _name.lastIndexOf('\\');
      if (_p < 0) _p = _name.lastIndexOf('/');
      return _p < 0 ? _name : _name.substr(_p+1);
    };
    var f_dl = function(_event) {
      var _att = _event.data[0];
      var _url = APP_CONTEXT_PATH + '/attach/download?id=' + _att.id;
      window.open(_url);
    };
    var f_de = function(_event) {
      var _att = _event.data[0];
      var _e1 = _event.data[1];
      var _json = $.toJSON({id: _att.id});
      $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : APP_CONTEXT_PATH + '/attach/delete',
        data: _json,
        dataType: 'json',
        success : function() {_e1.remove();},
        error : function() {ajaxError(arguments, this);}
      });
    };
    if (!atts) return;
    for (i = 0; i < atts.length; i++) {
      att = atts[i];
      name = f_gn(att.file.filename);
      e1 = $(document.createElement('div'));
      e1.addClass('att');
      if (downloadable) {
        e2 = $(document.createElement('a'));
        e2.addClass('att');
        e2.addClass('ellipsis');
        e2.click([att], f_dl);
        e2.attr('title', name + '(' + att.file.size + ' bytes)');
        // e2.attr('target', '_blank');
        // e2.attr('href', APP_CONTEXT_PATH + '/download?id=' + att.id);
      } else {
        e2 = $(document.createElement('span'));
        e2.addClass('att');
        e2.addClass('ellipsis');
      }
      e2.text(name);
      e1.append(e2);
      if (deletable) {
        e3 = $(document.createElement('a'));
        e3.text('删除');
        e3.addClass('del');
        e3.click([att, e1], f_de);
        e1.append(e3);
      }
      qatts.append(e1);
    }
  }

  // 客户端获取文件大小, 返回-1表示失败
  function getFileSize(target) {
    var b = $.browser;
    try {
      if (target.files[0]) {
        return target.files[0].fileSize;
      } else if (b.msie && b.version >= 5 && b.version <= 6) {
        var img = new Image();
        img.src = target.value;
        return img.fileSize;
      } else {
        target.select();
        var path = document.selection.createRange().text;
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f = fso.GetFile(path);
        return f.fileSize;
      }
    } catch(e) {}
    return -1;
  }

  // 初始化文件附件区
  function jup(uparams) {
    var qobj = uparams.qobj;
    var obj = uparams.obj;
    var cat = uparams.cat;
    var uploadable = uparams.uploadable;
    var qatts = uparams.qatts;
    var atts = uparams.atts;
    var downloadable = true;
    var deletable = uploadable;
    var params = uparams.params;
    var event = '#onAttUpload';
    var id = obj.id;
    var ret, error;
    qatts.children().remove();
    showAtts(qatts, atts, downloadable, deletable);
    try {
      if (qobj[0].tagName != 'A') return;
      if (uploadable) {
        qobj.text('添加附件');
        qobj.addClass('enabled');
        new AjaxUpload(qobj, {
          action: APP_CONTEXT_PATH + '/attach/upload',
          data: {
            cat: cat,
            owner: id,
            idx: 0
          },
          // 判断文件后缀, 禁止上传exe文件
          onSubmit: function(file , ext) {
            if (ext && /^(exe)$/.test(ext)) {
              MessageBox(ERROR_EXT_NOTALLOWED.replace('{EXT}', ext), null, MB_ICONERROR, MB_OK, null, 0);
              return false;
            }
            var size = getFileSize(this._input);
            if (size > 20 * 1024 * 1024) {
              MessageBox(ERROR_SIZE_EXCEEDED.replace('{FILE}', file), null, MB_ICONERROR, MB_OK, null, 0);
              return false;
            }
          },
          onComplete: function(file, response) {
            ret = $.evalJSON(response);
            if (ret.error) {
              if (ret.error == 'size.limit.exceeded') error = ERROR_SIZE_EXCEEDED.replace('{FILE}', file);
              else error = ret.error;
              MessageBox('上传文件失败:\n' + error, null, MB_ICONERROR, MB_OK, null, 0);
            } else {
              showAtts(qatts, ret.atts, downloadable, deletable);
              if (typeof(params.event) == 'function') params.event(obj, cat, file, ret, params);
            }
          }
        });
      } else {
        qobj.text('附件');
        qobj.addClass('disabled');
      }
    } catch (e) {_alert(e);}
  }

  function iup(uparams) {
    var qobj = uparams.qobj;
    var params = uparams.params;
    var ret, error;
    try {
      new AjaxUpload(qobj, {
        action: APP_CONTEXT_PATH + '/upload',
        data: {},
        // 判断文件后缀, 只允许图片文件
        onSubmit: function(file , ext) {
          if (!ext || !/^(bmp|gif|jpg|jpeg|png|tiff)$/.test(ext)) {
            // 将MessageBox的zindex设置的比ckedit Image dialog的大，使MessageBox在前面!!!
            MessageBox(ERROR_ONLY_IMAGE, null, MB_ICONERROR, MB_OK, null, 0);
            return false;
          }
          var size = getFileSize(this._input);
          if (size > 20 * 1024 * 1024) {
            MessageBox(ERROR_SIZE_EXCEEDED.replace('{FILE}', file), null, MB_ICONERROR, MB_OK, null, 0);
            return false;
          }
        },
        onComplete: function(file, response) {
          ret = $.evalJSON(response);
          if (ret.error) {
            if (ret.error == 'size.limit.exceeded') error = ERROR_SIZE_EXCEEDED.replace('{FILE}', file);
            else error = ret.error;
            MessageBox('上传文件失败:\n' + error, null, MB_ICONERROR, MB_OK, null, 0);
          } else {
            if (typeof(params.event) == 'function') params.event(file, ret, params);
          }
        }
      });
    } catch(e) {_alert(e);}
  }

  $.APP_FILE = $.APP_FILE || {version: '1.0.0', name: 'APP_FILE'};
  $.extend($.APP_FILE, {
    jup: jup,
    iup: iup
  });
})(jQuery);