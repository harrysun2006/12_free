/**
 * Magic ComboBox version 1.2
 * author: Mac_J
 * need core.js
 */
mac.combo = function(self, cfg) {
	self.config = cfg = $.extend({
		height: 24,
		maxkLen: 20,
		comma: ',',
		name: self.prop('name')
	}, cfg);
	self.selected = cfg.selected || [];
	var cols = cfg.cols;
	var cw = cfg.width, ch = cfg.height;
	var hd = $('<div class="head"><div>').width(cw).height(ch);
	var tf = $('<input type="text" />').height(ch);
	var tw = $('<div class="left"></div>').css('margin-right', ch).height(ch+2);
	tf.prop({ name: cfg.name, maxLength: cfg.maxLen });
	tf.change(function(){
		if(!tf.val())
			self.select([]);
	});
	var btn = $('<div class="btn"></div>');
	var ico = $('<span class="icon icon-triangle-1-s"></span>');
	ico.css('margin', Math.floor(ch/2-8)).appendTo(btn);
	btn.height(ch).width(ch).css('margin-top', -ch-2);
	tw.append(tf);
	hd.append(tw).append(btn);
	var bd = $('<div class="body hidden"></div>');
	if(cfg.boxHeight)
		bd.height(cfg.boxHeight);
	if(cfg.boxEl){
		bd.append(cfg.boxEl);
		bd.mousedown(function(){
			return false;
		});
	}
	self.append(hd).append(bd);
	btn.click(function() {
		if (bd.is(':visible')) {
			self.close();
		} else {
			self.open();
		}
		return false;
	});
	if(cfg.readOnly){
		tf.prop('readonly', 'readonly');
		tf.click(function(){
			btn.click();
			return false;
		});
	}else{
		tf.keydown(function(e){
			var k = e.keyCode;
			if(k==13 || k==9){
				self.select(tf.val());
			}else{
				self.close();
			}
			return true;
		});
	}
	self.open = function(){
		var w = cfg.boxWidth || self.width();
		var p = self.position();
		var bt = cfg.boxTop, bl = cfg.boxLeft;
		bt = (bt || bt==0)? bt:(cfg.height + 2);
		bl = (bl || bl==0)? bl:1;
		bd.css({ top: p.top + bt, left: p.left + bl });
		bd.width(Math.max(w, cfg.boxMinWidth || w)).show();
		if(cfg.onOpen)
			cfg.onOpen();
		$(document).mousedown(function(e){
			self.close();
		});
	}
	self.close = function(){
		bd.hide();
		$(document).unbind('mousedown');
	}
	self.select = function(dd){
		if(!$.isArray(dd))
			dd = dd? [ dd ] : [];
		var dv = [], sd = [], df = cfg.displayField;
		if(cfg.boxEl){
			$.each(dd, function(n, d){
				dv.push(d[df]);
			});
		}else{
			dd = $.map(dd, function(c){
				return c + '';
			});
			$.each(bd.find('.tr'), function(n,c){
				var a = $(c), k = a.attr('name'), d = self.data[k];
				a.removeClass('selected');
				if(dd.length>0){
					if($.inArray(k, dd)>-1){
						dv.push(d[df]);
						sd.push(d);
						a.addClass('selected');
					}
				}
			});
		}
		self.selected = dd;
		tf.val(dv.join(cfg.comma));
		if(cfg.onSelect)
			cfg.onSelect(self, dd, sd);
		return self;
	}
	self.loadData = function(dd) {
		if(cfg.boxEl){
			cfg.boxEl.loadData(dd);
			return;
		}
		bd.empty();
		if(!dd || !dd.length)
			return;
		self.data = {};
		var mc = cols && cols.length;
		$.each(dd, function(i, r) {
			var kf = cfg.keyField, df = cfg.displayField;
			var k = kf? r[kf]:'r'+i;
			var a = $('<div class="tr"></div>').attr('name', k);
			self.data[k] = r;
			if(mc){
				$.each(cols, function(n, c){
					if(c.hidden)
						return;
					var b = $('<div class="td"></div>');
					b.width(c.width);
					b.append(c.render? c.render(r, a, self):r[c.field]);
					a.append(b);
				});
			}else{
				var b = $('<div class="td"></div>');
				b.append(r[cfg.displayField]).width(bd.width());
				a.append(b);
			}
			a.mousedown(function() {
				var sl = self.selected || [];
				var i = $.inArray(k, sl), b = i>-1;
				if(cfg.multiSelect){
					b? sl.splice(i, 1): sl.push(k);
					self.select(sl);
					return false;
				}else{
					self.select(b?[]:[k]);
				}
			});
			bd.append(a);
		});
		if(cfg.onLoad)
			cfg.onLoad(self, dd);
	}
	var ldr = cfg.loader;
	if (cfg.data) {
		self.loadData(cfg.data);
	}else if(ldr && ldr.url){
		$.post(ldr.url, ldr.params, function(data) {
			var ro = mac.eval(data);
			if (ro.success) {
				ro = ro.data;
				self.loadData(ro.list);
			}
		});
	}
	return self;
}