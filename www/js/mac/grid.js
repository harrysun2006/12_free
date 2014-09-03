/**
 * version: 1.6.3
 * author: Mac_J
 * need: core.js, mousewheel.js
 */
mac.grid = function(self, cfg) {
	cfg.rowHeight = cfg.rowHeight || 24;
	self.config = cfg;
	self.loader = cfg.loader;
	self.data = {};
	var yb = $('<div class="ybar"></div>').appendTo(self);
	var yy = $('<div></div>').appendTo(yb);
	var mm = $('<div class="main"></div>').appendTo(self);
	var hd = $('<div class="head"></div>').appendTo(mm);
	mm.append('<div class="clear"></div>');
	var bd = $('<div class="body"></div>').appendTo(mm);
	var tt = $('<div class="tt"></div>').appendTo(bd);
	var pb = cfg.loader.params;
	pb = pb.pageNo && pb.pageSize && cfg.pagerLength;
	if (pb)
		pb = $('<div class="pager"></div>').appendTo(self);
	var _h, _s;
	$('body').mousemove(function(e) {
		if (_s) {
			var dx = e.clientX - _s.mouseX;
			var td = mm.find('[name="' + _s.name + '"]');
			var nw = td.width() + dx;
			if (nw > 0) {
				td.width(nw);
				td.find('.th.td').each(function(n, c){
					var ec = $(c);
					ec.width(nw * _s.items[ec.attr('name')]);
				});
				var c = cfg.cols[_s.col];
				c.width = nw + 4;
				td.find('.title').width(nw-(c.sort?20:3));
				var g = td.attr('group');
				if(g){
					g = hd.seek(g);
					g.width(g.width()+dx);
				}
				var cd = hd.find('[group=' + _s.name + ']');
				cd.width(cd.width()+dx)
				bd.width(bd.width() + dx);
				tt.width(bd.width() - 1);
				hd.width(hd.width() + dx);
				_s.mouseX = e.clientX
			}
		}
		if (_h) {
			var p = mac.getMousePos(e);
			_h.css( {
				left : p.x + 5,
				top : p.y + 12
			});
		}
	}).mouseup(function(e) {
		if (_s) {
			var td = bd.find('[name="' + _s.name + '"]');
			var nw = td.width()+(e.clientX-_s.mouseX) - 3;
			td.width(nw);
			cfg.cols[_s.col].width = hd.find('[name="' + _s.name + '"]').width();
			_s = 0;
		}
		if (_h) {
			_h.remove();
			_h = 0;
		}
	});
	self.sortBy = [];
	var tw = 0;
	$.each(cfg.cols, function(n, c) {
		var f = c.name || c.field;
		var o = $('<div></div>').attr('name', f);
		if(c.parent){
			o.appendTo(c.parent);
			o.attr('group', c.group);
		}else{
			o.appendTo(hd);
			if(!c.hidden)
				tw += c.width;
		}
		if (c.hidden) {
			o.hide();
			return;
		}
		o.attr('unselectable', 'on');
		var rh = $('<div class="sizer" unselectable="on"></div>');
		if(c.sizeable!=false){
			rh.mousedown(function(e) {
				var fcs = cfg.fixedCols || [];
				if($.inArray(c.field, fcs)<0 && $.inArray(c.group, fcs)<0){
					var cc = {};
					o.find('.th').each(function(n, c){
						var ec = $(c);
						cc[ec.attr('name')] = ec.width() / o.width();
					});
					_s = {
						col : n,
						name : f,
						mouseX : e.clientX,
						items: cc
					}
				}
				return false;
			}).appendTo(o);
		}
		if(!c.parent)
			tw += 2;
		o.width(c.width);
		if (c.sort) {
			var u = $('<span class="icon icon-triangle-1-s"></span>');
			$('<div class="sort"></div>').append(u).appendTo(o);
			self.sortBy.push({
				field : f,
				sort : "asc"
			});
		}
		var a = c.header;
		if(!a){
			a = $('<div class="title" unselectable="on"></div>').append(c.title);
			var x = (c.parent) ? (c.height || cfg.rowHeight) : (cfg.headerHeight || cfg.rowHeight);
			a.height(x).css('line-height', x + 'px');
		}
		if(c.moveable!=false){
			a.mousedown(function(e) {
				if(_s) return;
				var fcs = cfg.fixedCols || [];
				if($.inArray(c.field, fcs)<0 && $.inArray(c.group, fcs)<0){
					_h = $('<div class="dragHelper"><div>');
					_h.html('&nbsp;' + c.title + '&nbsp;');
					_h.col = $.inArray(f, $.map(cfg.cols, function(c) {
						return c.name || c.field
					}));
					_h.name = f;
					$('body').append(_h);
					var p = mac.getMousePos(e);
					_h.css({
						left : p.x + 5,
						top : p.y + 12
					});
				}
				return false;
			}).mousemove(function(e) {
				if (_h && f != _h.name) {
					var td = bd.find('.td[name=' + f + ']');
					td.addClass("dropable")
				}
			}).mouseout(function(e) {
				var td = bd.find('.td[name=' + f + ']');
				td.removeClass("dropable");
			}).mouseup(function() {
				var fcs = cfg.fixedCols || [];
				if ($.inArray(f, fcs)>=0)
					return true;
				if (_h && f != _h.name) {
					if(hd.seek(_h.name).attr('group')!=o.attr('group')){
						_h.remove();
						return;
					}
					var td = mm.find('.td[name=' + f + '],.th[name=' + f + ']');
					td.removeClass("dropable");
					$.each(td, function(n, c) {
						var s = $(c);
						var t = s.parent().find('.td[name=' + _h.name
							+ '],.th[name=' + _h.name + ']');
						s.before(t)
					});
					var k = $.inArray(f, $.map(cfg.cols, function(c) {
						return c.name || c.field;
					}));
					cfg.cols.splice(k, 0, cfg.cols[_h.col]);
					cfg.cols.splice(_h.col + 1, 1);
					_h.remove();
				}
			});
		}
		o.addClass('th').append(a);
	});
	hd.width(tw+1);
	bd.width(tw);
	tt.width(tw-1);
	self.sort = function(st) {
		if (cfg.sortLocally) {
			var dd = [];
			$.each(self.data, function(n, c) {
				dd.push(c);
			});
			dd.sort(function(a, b) {
				var sb = self.sortBy;
				for (var i = 0; i < sb.length; i++) {
					var k = sb[i].field;
					var x = a[k];
					var y = b[k];
					var cp = null;
					for(var j=0; j<cfg.cols.length; j++){
						var cc = cfg.cols[j]; 
						if(cc.field==k){
							cp = cc.comparator;
							break;
						}
					}
					if(cp)
						return cp(x, y, sb[i].sort);
					if (x == y) {
						continue
					} else {
						if (sb[i].sort == 'desc') {
							return x > y ? 1 : -1
						} else {
							return x < y ? 1 : -1
						}
					}
				}
				return 0
			});
			self.loadData(dd);
		} else {
			var ob = $.map(self.sortBy, function(c) {
				return c.field + ' ' + c.sort
			}).join(',');
			self.load({ orderBy : ob });
		}
	}
	hd.find('.sort').click(function() {
		var el = $(this).hide();
		var tu = 'icon-triangle-1-n';
		var td = 'icon-triangle-1-s';
		var fd = el.parent().attr('name');
		var sp = el.children();
		var sb = self.sortBy;
		for ( var i = 0; i < sb.length; i++) {
			if (sb[i].field == fd)
				break;
		}
		sb.splice(i, 1);
		if (sp.hasClass(tu)) {
			sb = sb.unshift( {
				field : fd,
				sort : 'asc'
			});
			sp.removeClass(tu).addClass(td)
		} else {
			sb = sb.unshift( {
				field : fd,
				sort : 'desc'
			});
			sp.removeClass(td).addClass(tu)
		}
		self.sort(el);
		return false;
	});
	self.adjust = function(vp) {
		if (vp)
			self.height(vp.height());
		var h = self.height();
		var g = pb ? 32 : 0;
		h = h - hd.height();
		bd.height(h - g - cfg.rowHeight - (cfg.footerHeight || 0));		
		yb.height(bd.height());
		yy.height(tt.height() + cfg.rowHeight);
		yb.css('overflow-y', (yy.height()>yb.height())?'scroll':'auto');
	};
	self.newRow = function(r, k) {
		var k = cfg.key ? r[cfg.key] : 'r'+k;
		self.data[k] = r;
		var a = $('<div name="' + k + '" class="tr"></div>');
		a.height(cfg.rowHeight);
		$.each(cfg.cols, function(n, c) {
			var b = $('<div class="td"></div>');
			b.height(cfg.rowHeight-2);
			b.attr('name', c.name || c.field);
			if(c.group){
				b.appendTo(a.find('.td[name=' + c.group + ']'));
				b.attr('group', c.group);
			}else{
				b.appendTo(a);
			}
			if(c.isGroup){
				b.css('padding', 0).css('border-left', 0);
			}else{
				b.append((c.render) ? c.render(r, a, self) : r[c.field]);
				b.append('&nbsp;').css('text-align', c.align || 'left');
				var w = c.width-(c.sizeable!=false? 3:1);
				b.width(c.group? w-1: w);
			}
			if (c.hidden)
				b.hide();
		});
		a.click(cfg.onRowClick || function() {
			self.find('.tr').removeClass('selected');
			self.selected = $(this).addClass('selected');
		}).append('<div class="clear"></div>');
		tt.append('<div class="clear"></div>');
		return a;
	}
	self.addRow = function(r, k) {
		yy.height(tt.height() + cfg.rowHeight);
		return self.newRow(r, k).appendTo(tt);
	}
	self.loadData = function(dd, po) {
		self.data = {};
		tt.empty();
		yy.height(2);
		$.each(dd, function(n, r) {
			self.addRow(r, n);
		});
		self.lockCols(cfg.fixedCols);
		if (cfg.afterLoad)
			cfg.afterLoad(dd, po);
		hd.find('.sort').show();
		if(!cfg.autoHeight)
			self.adjust(self.parent());
		return self;
	}
	self.load = function(pms) {
		pms = pms || {};
		var ldr = self.loader;
		$.extend(ldr.params, pms);
		$.post(ldr.url, ldr.params, function(data) {
			var ro = mac.eval(data);
			if (ro.success) {
				ro = ro.data;
				self.loadData(ro.list, ro);
				if (pb)
					pb.update(ro.total, ro.pageSize, ro.pageCount, ro.pageNo)
			}
			hd.find('.sort').show();
		})
	};
	yb.scroll(function() {
		bd.scrollTop(this.scrollTop)
	});
	bd.mousewheel(function(e, delta, deltaX, deltaY){
		yb.scrollTop(yb.scrollTop() - deltaY * cfg.rowHeight);
		return false;
	});
	self.lockCols = function(fns){
		if(!fns) return;
		cfg.fixedCols = fns;
		var fcs = [];
		$.each(fns, function(n,c){
			var a = mm.find('.th[name=' + c + ']');
			var b = mm.find('.td[name=' + c + ']');
			fcs.push({ fh: a, fc: b, left: a.position().left });
		});
		var cns = $.map(cfg.cols, function(c){
			return (c.group || $.inArray(c.field, fns)>=0)? null:c.field;
		});
		var fxw = 0;
		$.each(fcs, function(n,c){
			var a = { position: 'absolute', left: c.left, zIndex: 1 }
			c.fh.css(a);
			a.zIndex+=1;
			c.fc.css(a);
			fxw+=c.fh.width()+2;
		});
		$.each(cns, function(n,c){
			mm.find('.th[name='+c+'],.td[name='+c+']').css({
				position: 'relative', left: fxw, zIndex: 0
			});
		});
	}
	if (pb) {
		pb.mac('pager', {
			pagerLength : cfg.pagerLength,
			pageSize : self.loader.pageSize,
			loadPage : function(pn) {
				self.load({
					pageNo : pn
				});
			}
		});
	}
	if (self.loader.autoLoad)
		self.load();
	else
		if(!cfg.autoHeight)
			self.adjust(self.parent());
	return self;
}