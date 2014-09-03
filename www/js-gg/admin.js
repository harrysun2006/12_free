(function(b){function k(a){if(typeof a!="number")try{a=parseInt(a)}catch(b){}for(var e=0;e<q.length;e++)e==a-1?q[e].show():q[e].hide()}function F(a){a=b("#treemenu").getRowData(a);a=a.id?a.id:0;if(typeof a!="number")try{a=parseInt(a)}catch(d){}typeof a!="undefined"&&(a=o[a],typeof a.ff=="function"?a.ff(a):typeof a.pp=="number"&&k(a.pp))}function s(a,d,e){var f,c,g={},i={INPUT:1,SELECT:1};for(f=0;f<e.length;f++)c=b("#"+e[f].id+d,a),g[e[f].name]=i.hasOwnProperty(c[0].tagName)?c.val():c.text();return g}
function G(a){var d=b("#ap1_data"),e=d.getGridParam("data"),d=d.getRowData(a),d=e[d.id],f=[{name:"enable",text:"\u542f\u7528",title:"\u542f\u7528\u8d26\u53f7",click:p},{name:"disable",text:"\u7981\u7528",title:"\u7981\u7528\u8d26\u53f7",click:p},{name:"admin",text:"\u7ba1\u7406\u5458",title:"\u8bbe\u7f6e\u4e3a\u7cfb\u7edf\u7ba1\u7406\u5458",click:p},{name:"user",text:"\u666e\u901a\u7528\u6237",title:"\u8bbe\u7f6e\u4e3a\u666e\u901a\u7528\u6237",click:p},{name:"reset",text:"\u91cd\u7f6e\u5bc6\u7801",
title:"\u91cd\u7f6e\u5bc6\u7801",click:p}],e=[];e.push(f[4]);e.push(d.admin?f[3]:f[2]);e.push(d.enabled?f[1]:f[0]);a={data:[a,d]};b("#ap1_bar1").addButtons(e,a);b("#ap1_bar2").addButtons(e,a)}function p(a,d,e){var f=b("#ap1_data");b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({pernr:d.pernr,extra:{command:e.name}}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/account/process",success:function(c){c.error&&MessageBox(getErrorMessage(c.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);var d=
c.error?c.error:0,e=c.message?c.message:"",h=f.getGridParam("data"),j=f.getRowData(a);b("#ap1_info").attr("class","left "+(d?"red":"blue"));b("#ap1_info").text(e);if(c.acc)h[j.id]=c.acc,f.setRowData(a,c.acc),f.setSelection(a)},error:function(){ajaxError(arguments,this)}})}function w(a,d){a.error&&MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);var e=b("#ap2_data"),f=a&&a.links?a.links:[];e.children().remove();e.addRow([{text:"\u6587\u672c",width:280},{text:"\u94fe\u63a5(HREF)"},
{text:"\u63cf\u8ff0",width:320}],{cssClass:"header"});var c,g,i,h,j=[{id:"ap2_links_t",name:"text"},{id:"ap2_links_l",name:"link"},{id:"ap2_links_d",name:"desc"}];for(c=0;c<4;c++){i=[];for(g=0;g<j.length;g++)h={id:j[g].id+c,value:c<f.length?f[c][j[g].name]:null,"#base":j[g]},i.push({obj:b.fn.addElement(h)});g=c%2==0?"even":"odd";e.addRow(i,{cssClass:g})}e=[{text:"\u91cd\u7f6e",title:"\u91cd\u7f6e\u94fe\u63a5",click:w},{text:"\u4fdd\u5b58",title:"\u4fdd\u5b58\u94fe\u63a5",click:H}];f={data:[a]};b("#ap2_bar1").addButtons(e,
f);b("#ap2_bar2").addButtons(e,f);d&&b("#ap2_info").text("\u94fe\u63a5\u5df2\u88ab\u91cd\u7f6e!")}function H(a){var d=b("#ap2_data"),e,f=[],c,g=[{id:"ap2_links_t",name:"text"},{id:"ap2_links_l",name:"link"},{id:"ap2_links_d",name:"desc"}];for(e=0;e<4;e++)c=s(d,e,g),!c.text.empty()&&!c.link.empty()&&f.push(c);b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({links:f}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/links/save",success:function(c){var d=(c=c.error?c.error:0)?"\u76f8\u5173\u94fe\u63a5\u8bbe\u7f6e\u5931\u8d25: "+
getErrorMessage(c):"\u76f8\u5173\u94fe\u63a5\u8bbe\u7f6e\u6210\u529f!";b("#ap2_info").attr("class","left "+(c?"red":"blue"));b("#ap2_info").text(d);if(a)a.links=f},error:function(){ajaxError(arguments,this)}})}function I(){var a=b("#ap3_data").selectedItems(),a=a&&a.length>0?a[0]:null;a==null?MessageBox("\u8bf7\u9009\u62e9\u4e00\u6761\u516c\u544a\u4fe1\u606f!",IDS_ERROR,MB_ICONERROR,MB_OK,null,3):x(a,"delete")}function J(a,d){b.IDS_INFO.open({title:"",content:"",op:"add",caption:d.title,"#onSave":y})}
function K(){var a=b("#ap3_data").selectedItems(),a=a&&a.length>0?a[0]:null;a==null?MessageBox("\u8bf7\u9009\u62e9\u4e00\u6761\u516c\u544a\u4fe1\u606f!",IDS_ERROR,MB_ICONERROR,MB_OK,null,3):b.ajax({type:"POST",contentType:"application/json",url:IDS_CONTEXT_PATH+"/notice/get",data:b.toJSON({id:a.id}),dataType:"json",success:function(a){a.error?MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0):(a=a.notice,b.IDS_INFO.open({id:a.id,title:a.title,content:a.content,op:"edit",caption:"\u7f16\u8f91\u516c\u544a\u4fe1\u606f",
"#onSave":y}))},error:function(){ajaxError(arguments,this)}})}function y(a){var b={title:a["#title"],content:a["#content"]};if(a.hasOwnProperty("id"))b.id=a.id;x(b,a.op)}function x(a,d){b("#ap3_data");b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({notice:a,command:d}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/notice/process",success:function(a){a.error&&MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);var d=a.error?a.error:0,a=a.message?a.message:"";b("#ap3_info").attr("class",
"left "+(d?"red":"blue"));b("#ap3_info").text(a);z(o[30])},error:function(){ajaxError(arguments,this)}})}function z(){k(3);b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/notice/list",success:function(a){a.error&&MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);var d=a.notices,e={},f,c=b("#ap3_data");c.clearGridData(true);c.jqGrid({autowidth:true,datatype:"local",height:"auto",colNames:["ID","\u53d1\u5e03\u65f6\u95f4",
"\u6807\u9898"],colModel:[{name:"id",hidden:true},{name:"dateline",width:160,formatter:"date",fixed:true,sortable:false,align:"center"},{name:"title",sortable:false,align:"left"}],loadui:true,multiselect:false,onSelectRow:K,scroll:false,scrollOffset:0,altclass:"jqgrow-odd",altRows:true,rowNum:10,rowList:[10,20,30],pager:"#ap3_pager",recordpos:"left",pagerpos:"center",viewrecords:true});for(f=0;f<d.length;f++)e[d[f].id]=d[f];c.setGridParam({data:d,page:1,map:e});c.trigger("reloadGrid");b("#ap3_total").text("Total: "+
d.length+"\u6761\u516c\u544a\u4fe1\u606f!");d=[{name:"add",text:"\u53d1\u5e03\u516c\u544a",title:"\u53d1\u5e031\u6761\u65b0\u7684\u516c\u544a\u4fe1\u606f",click:J},{name:"delete",text:"\u5220\u9664\u516c\u544a",title:"\u5220\u9664\u9009\u4e2d\u7684\u516c\u544a\u4fe1\u606f",click:I}];a={data:[a]};b("#ap3_bar1").addButtons(d,a);b("#ap3_bar2").addButtons(d,a)},error:function(){ajaxError(arguments,this)}})}function A(a,d){a.error&&MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,
0);var e=b("#ap5_data"),f=a&&a.karmas?a.karmas:[];e.children().remove();e.addRow([{text:"\u4ee3\u7801",width:200},{text:"\u79ef\u5206",width:160},{text:"\u63cf\u8ff0"}],{cssClass:"header"});var c,g,i,h,j=[{id:"ap5_karmas_c",name:"code",type:"span"},{id:"ap5_karmas_v",name:"value"},{id:"ap5_karmas_d",name:"desc"}];for(c=0;c<f.length;c++){i=[];for(g=0;g<j.length;g++)h={id:j[g].id+c,value:f[c][j[g].name],"#base":j[g]},i.push({obj:b.fn.addElement(h)});g=c%2==0?"even":"odd";e.addRow(i,{cssClass:g})}e=
[{text:"\u91cd\u7f6e",title:"\u91cd\u7f6e\u79ef\u5206\u8bbe\u7f6e",click:A},{text:"\u4fdd\u5b58",title:"\u4fdd\u5b58\u79ef\u5206\u8bbe\u7f6e",click:L}];f={data:[a]};b("#ap5_bar1").addButtons(e,f);b("#ap5_bar2").addButtons(e,f);d&&b("#ap5_info").text("\u79ef\u5206\u8bbe\u7f6e\u5df2\u88ab\u91cd\u7f6e!")}function L(a){var d=a&&a.karmas?a.karmas:[],e=b("#ap5_data"),f,c=[],g,i=[{id:"ap5_karmas_c",name:"code"},{id:"ap5_karmas_d",name:"desc"},{id:"ap5_karmas_v",name:"value"}];for(f=0;f<d.length;f++)g=s(e,
f,i),c.push(g);b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({karmas:c}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/karmas/save",success:function(d){var e=(d=d.error?d.error:0)?"\u79ef\u5206\u8bbe\u7f6e\u5931\u8d25: "+getErrorMessage(d):"\u79ef\u5206\u8bbe\u7f6e\u6210\u529f!";b("#ap5_info").attr("class","left "+(d?"red":"blue"));b("#ap5_info").text(e);if(a)a.karmas=c},error:function(){ajaxError(arguments,this)}})}function M(){var a=b("#ap6_data").selectedItems(),d=a&&a.length>
0?a[0]:null;d==null?MessageBox("\u8bf7\u9009\u62e9\u4e00\u4e2a\u8bc4\u5206\u6a21\u677f!",IDS_ERROR,MB_ICONERROR,MB_OK,null,3):(a=[],a.push({text:"\u65b0\u5efa",title:"\u590d\u5236\u5f53\u524d\u9009\u4e2d\u7684\u8bc4\u5206\u6a21\u677f\u5e76\u65b0\u5efa",op:"add",click:t}),a.push({text:"\u7f16\u8f91",title:"\u7f16\u8f91\u5f53\u524d\u9009\u4e2d\u7684\u8bc4\u5206\u6a21\u677f",op:"edit",click:t}),d.used||a.push({text:"\u5220\u9664",title:"\u5220\u9664\u5f53\u524d\u9009\u4e2d\u7684\u8bc4\u5206\u6a21\u677f",
click:N}),d.def||a.push({text:"\u8bbe\u4e3a\u9ed8\u8ba4",title:"\u5c06\u9009\u4e2d\u7684\u8bc4\u5206\u6a21\u677f\u8bbe\u7f6e\u4e3a\u9ed8\u8ba4\u7684\u8bc4\u5206\u6a21\u677f",click:O}),d={data:[d]},b("#ap6_bar1").addButtons(a,d),b("#ap6_bar2").addButtons(a,d))}function P(){var a=b("#ap6_data").selectedItems(),a=a&&a.length>0?a[0]:null;a==null?MessageBox("\u8bf7\u9009\u62e9\u4e00\u4e2a\u8bc4\u5206\u6a21\u677f!",IDS_ERROR,MB_ICONERROR,MB_OK,null,3):t(a,{op:"edit"})}function t(a,d){b.ajax({type:"POST",
contentType:"application/json",data:b.toJSON({id:a.id}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/tmpl/open",success:function(a){if(a.error)MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);else{var a=a.tmpl,f=d.op,c,g;f=="add"?(c=cloneObject(a,true,{id:1,dateline:1,def:1,used:1}),g="\u65b0\u5efa\u6a21\u677f"):f=="edit"&&(c=a,g="\u7f16\u8f91\u6a21\u677f");c["#data"]={};b("#tt_div").dialog({title:g}).dialog("open");b("#tt_name").removeAttr("readonly");b("#tt_name").val(c.name);
b("#tt_description").removeAttr("readonly");b("#tt_description").val(c.description);b("#tt_append").unbind("click");b("#tt_append").bind("click",[c,f],Q);b("#tt_delete").unbind("click");b("#tt_delete").bind("click",[c,f],R);S(c);b("#tt_close").unbind("click");b("#tt_close").bind("click",function(){b("#tt_div").dialog("close")});b("#tt_save").unbind("click");b("#tt_save").bind("click",[c,f],function(a){T(a.data[0],a.data[1])})}},error:function(){ajaxError(arguments,this)}});return true}function S(a){var d=
b("#tt_table");d.children().remove();d.addRow([{text:"\u5e8f\u53f7",width:60},{text:"\u8bc4\u5206\u9879\u76ee",width:100},{text:"\u5f88\u4f18\u79c0",width:160},{text:"\u4f18\u79c0",width:160},{text:"\u666e\u901a",width:160},{text:"\u4e0d\u8db3",width:160}],{cssClass:"header"});var e,f={cssClass:"even"},c=a.items;if(r==null){r={};for(e=0;e<l.length;e++)r[l[e].id]=l[e].def}for(e=0;e<c.length;e++)c[e].used=a.used,f.rowid=e,B(d,a,c[e],f)}function B(a,d,e,f){var c,g,i=f.rowid,h=[];for(c=0;c<l.length;c++)h[c]=
b(document.createElement("input")),h[c].attr("id","tt_si"+i+"_"+l[c].id),c==0?h[c].css("width","98px"):c<5?h[c].css("width","96%"):h[c].css("width","32px"),h[c].val(e[l[c].id]);g=[{obj:h[13],rowspan:2},{obj:h[0],rowspan:2},{obj:h[1]},{obj:h[2]},{obj:h[3]},{obj:h[4]}];c=a.addRow(g,b.extend(f,{id:"tt_row1_"+i}));g=[{obj:[h[5]," ~ ",h[6]],align:"center"},{obj:[h[7]," ~ ",h[8]],align:"center"},{obj:[h[9]," ~ ",h[10]],align:"center"},{obj:[h[11]," ~ ",h[12]],align:"center"}];a=a.addRow(g,b.extend(f,{id:"tt_row2_"+
i}));e["#rowid"]=i;c.bind("click",[d,i],C);a.bind("click",[d,i],C)}function C(a){var d=a.data[0],a=a.data[1],e=b("#tt_row1_"+a),f=b("#tt_row2_"+a),d=d["#data"],c=d.sel;typeof c!="undefined"&&(b("#tt_row1_"+c).removeClass("highlight"),b("#tt_row2_"+c).removeClass("highlight"),b("#tt_row1_"+c).addClass(d.savedCss),b("#tt_row2_"+c).addClass(d.savedCss));d.savedCss=e.attr("class");d.sel=a;e.addClass("highlight");f.addClass("highlight")}function Q(a){var a=a.data[0],d=b("#tt_table"),e=a.items,f=e.length,
c=cloneObject(r);c.idx=f+1;B(d,a,c,{cssClass:"even",rowid:f});e.push(c)}function R(a){var a=a.data[0],d=a["#data"];if(typeof d.sel=="undefined")MessageBox("\u8bf7\u9009\u62e9\u4e00\u4e2a\u8bc4\u5206\u9879\u76ee!",IDS_ERROR,MB_ICONERROR,MB_OK,null,0);else{var e=d.sel,f=a.items[e];if(f!=null)if(f.used)MessageBox("\u5df2\u7ecf\u88ab\u4f7f\u7528\u7684\u8bc4\u5206\u9879\u76ee\u65e0\u6cd5\u5220\u9664!",IDS_ERROR,MB_ICONERROR,MB_OK,null,0);else{var f=b("#tt_row1_"+e),c=b("#tt_row2_"+e);f.hide();c.hide();
a.items[e]=null;d.sel=void 0}}}function U(a){var d=0,e=0,f=null,c=null,g={},i,h=a.items,j,m=["ruleA","ruleB","ruleC","ruleD"];a.name.trim()==""?(c="\u8bf7\u8f93\u5165\u975e\u7a7a\u6a21\u677f\u540d\u79f0!",f=b("#tt_name")):a.description.trim()==""?(c="\u8bf7\u8f93\u5165\u975e\u7a7a\u6a21\u677f\u63cf\u8ff0!",f=b("#tt_description")):h.length<=0&&(c="\u8bf7\u6dfb\u52a0\u81f3\u5c11\u4e00\u4e2a\u8bc4\u5206\u9879\u76ee!");for(a=0;a<h.length;a++)if(j=h[a],j!=null){if(g[j.rule]){c="\u8bc4\u5206\u9879\u76ee\u4e0d\u80fd\u91cd\u590d!";
f=b("#tt_si"+j["#rowid"]+"_rule");break}else g[j.rule]=true;d++;e+=j.ah;i=j.ah>=j.al&&j.al==j.bh+1&&j.bh>=j.bl&&j.bl==j.ch+1&&j.ch>=j.cl&&j.cl==j.dh+1&&j.dh>=j.dl&&j.dl>=0;if(!i){c="\u8bc4\u5206\u9879\u76ee["+j.rule+"]\u7684\u5206\u503c\u6bb5\u5fc5\u987b>=0\u5e76\u4e14\u4ece\u9ad8\u5230\u4f4e\u8fde\u7eed!";break}a:{i=j;for(var k=m,n=void 0,l={},n=0;n<k.length;n++){if(l.hasOwnProperty(i[k[n]])){i=k[n];break a}l[i[k[n]]]=1}i=false}if(i){c="\u8bc4\u5206\u9879\u76ee["+j.rule+"]\u7684\u7b49\u7ea7\u63cf\u8ff0\u4e0d\u80fd\u91cd\u590d!";
f=b("#tt_si"+j["#rowid"]+"_"+i);break}}c||(d<=0?c="\u8bf7\u6dfb\u52a0\u81f3\u5c11\u4e00\u4e2a\u8bc4\u5206\u9879\u76ee!":e<90&&(c="\u8bf7\u786e\u4fdd\u6240\u6709\u9879\u76ee\u7684\u6700\u9ad8\u5206\u4e4b\u548c>=90!"));c&&(MessageBox(c,IDS_ERROR,MB_ICONERROR,MB_OK,null,0),f&&(f.select(),f.focus()));return c==null}function T(a,d){b("#tt_table");var e=a.items,f,c,g,i,h=function(a,c){var d=c["#rowid"],e,f,g,h,i=null;for(e=0;e<l.length;e++){g=l[e].id;f=b("#tt_si"+d+"_"+g);h=typeof f.val=="function"?f.val():
null;if(l[e].type==m){if(h=parseInt(h),isNaN(h)||h<0)i="\u8bf7\u8f93\u5165\u96f6\u6216\u6b63\u6574\u6570!"}else if(h==null||h.trim()=="")i="\u8bf7\u8f93\u5165\u975e\u7a7a\u503c!";if(i){MessageBox(i,IDS_ERROR,MB_ICONERROR,MB_OK,null,3);f.select();f.focus();break}g&&c.hasOwnProperty(g)&&(c[g]=h)}return i==null};for(f=0;f<e.length;f++)if(c=e[f],c!=null){g=c["#rowid"];i=b("#tt_row1_"+g);g=b("#tt_row2_"+g);if(!h(i,c))return;if(!h(g,c))return;c.score=c.ah}a.name=b("#tt_name").val();a.description=b("#tt_description").val();
U(a)&&u(a,d)}function N(){var a=b("#ap6_data").selectedItems(),a=a&&a.length>0?a[0]:null;a==null?MessageBox("\u8bf7\u9009\u62e9\u4e00\u4e2a\u8bc4\u5206\u6a21\u677f!",IDS_ERROR,MB_ICONERROR,MB_OK,null,3):a["#def"]?MessageBox("\u9ed8\u8ba4\u6a21\u677f\u4e0d\u80fd\u88ab\u5220\u9664!",IDS_ERROR,MB_ICONERROR,MB_OK,null,3):u(a,"delete")}function O(){var a=b("#ap6_data").selectedItems(),a=a&&a.length>0?a[0]:null;a==null?MessageBox("\u8bf7\u9009\u62e9\u4e00\u4e2a\u8bc4\u5206\u6a21\u677f!",IDS_ERROR,MB_ICONERROR,
MB_OK,null,3):u(a,"default")}function u(a,d){var e=function(){b("#tt_div").dialog("close");D(o[60])};b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({st:a,command:d}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/tmpl/process",success:function(a){a.error?MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0):MessageBox(a.message,IDS_INFO,MB_ICONINFORMATION,MB_OK,e,0)},error:function(){ajaxError(arguments,this)}})}function D(){k(6);b.ajax({type:"POST",contentType:"application/json",
data:b.toJSON({}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/tmpl/list",success:function(a){a.error&&MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);var a=a.tmpls?a.tmpls:[],d={},e,f=null,c=b("#ap6_data");c.clearGridData(true);c.jqGrid({autowidth:true,datatype:"local",height:"auto",colNames:"ID,\u9ed8\u8ba4?,\u4f7f\u7528?,\u65f6\u95f4,\u540d\u79f0,\u63cf\u8ff0".split(","),colModel:[{name:"id",hidden:true},{name:"#def",width:64,fixed:true,sortable:false,align:"center"},{name:"#used",
width:64,fixed:true,sortable:false,align:"center"},{name:"dateline",width:160,formatter:"date",fixed:true,sortable:false,align:"center"},{name:"name",width:160,fixed:true,sortable:false,align:"left"},{name:"description",sortable:false,align:"left"}],loadui:true,multiselect:false,onSelectRow:M,ondblClickRow:P,scroll:false,scrollOffset:0,altclass:"jqgrow-odd",altRows:true,rowNum:10,rowList:[10,20,30],pager:"#ap6_pager",recordpos:"left",pagerpos:"center",viewrecords:true});for(e=0;e<a.length;e++){if(f==
null)f=a[e].id;a[e]["#def"]=a[e].def?"Y":"";a[e]["#used"]=a[e].used?"Y":"";d[a[e].id]=a[e]}c.setGridParam({data:a,page:1,map:d});c.trigger("reloadGrid");b("#tt_div").dialog({autoOpen:false,modal:true,position:"top",resizable:false,width:770});c.setSelection(f)},error:function(){ajaxError(arguments,this)}})}function V(){b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/cache/clear",success:function(a){var d=(a=a.error?a.error:0)?"\u6e05\u9664\u7cfb\u7edf\u7f13\u5b58\u5931\u8d25: "+
getErrorMessage(a):"\u5df2\u7ecf\u6e05\u9664\u7cfb\u7edf\u4e2d\u7684\u6240\u6709\u7f13\u5b58!";b("#ap7_info").attr("class","left "+(a?"red":"blue"));b("#ap7_info").text(d);a||(b("#ap7_data").clearGridData(),b("#ap7_total").text("Total: 0\u9879\u7f13\u5b58\u6570\u636e!"))},error:function(){ajaxError(arguments,this)}})}function E(a,d){a.error&&MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);var e=b("#ap8_data"),f=a&&a.configs?a.configs:[];e.children().remove();e.addRow([{text:"\u540d\u79f0",
width:160},{text:"\u503c"},{text:"\u63cf\u8ff0",width:160}],{cssClass:"header"});var c,g,i,h=[{id:"ap8_configs_n",name:"name",type:"span"},{id:"ap8_configs_v",name:"value"},{id:"ap8_configs_d",name:"description",type:"span"}];for(c=0;c<f.length;c++){i=[];for(g=0;g<h.length;g++){def={id:h[g].id+c,value:f[c][h[g].name],"#base":h[g],hint:f[c].hint,preCreate:function(a){if(a.name=="value")a.title=f[c].value}};if(f[c].readOnly)def.readonly=true;i.push({obj:b.fn.addElement(def)})}g=c%2==0?"even":"odd";
e.addRow(i,{cssClass:g})}b("#ap8_total").text("Total: "+f.length+"\u9879\u7cfb\u7edf\u8bbe\u7f6e!");e=[{text:"\u91cd\u7f6e",title:"\u91cd\u7f6e\u7cfb\u7edf\u8bbe\u7f6e",click:E},{text:"\u4fdd\u5b58",title:"\u4fdd\u5b58\u7cfb\u7edf\u8bbe\u7f6e",click:W}];i={data:[a]};b("#ap8_bar1").addButtons(e,i);b("#ap8_bar2").addButtons(e,i);d&&b("#ap8_info").text("\u7cfb\u7edf\u8bbe\u7f6e\u5df2\u88ab\u91cd\u7f6e!")}function W(a){var d=a&&a.configs?a.configs:[],e=b("#ap8_data"),f,c=[],g,i=[{id:"ap8_configs_n",name:"name"},
{id:"ap8_configs_v",name:"value"}];for(f=0;f<d.length;f++)d[f].readOnly||(g=s(e,f,i),c.push(g));b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({configs:c}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/config/save",success:function(d){var e=(d=d.error?d.error:0)?"\u7cfb\u7edf\u8bbe\u7f6e\u5931\u8d25: "+getErrorMessage(d):"\u7cfb\u7edf\u8bbe\u7f6e\u6210\u529f!";b("#ap8_info").attr("class","left "+(d?"red":"blue"));b("#ap8_info").text(e);if(a)a.configs=c},error:function(){ajaxError(arguments,
this)}})}function X(){var a=b("#ap9_data").selectedItems();a!=null&&a.length>0&&debug(a[0])}function Y(){b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/log/clear",success:function(a){var d=(a=a.error?a.error:0)?"\u6e05\u9664\u65e5\u5fd7\u5931\u8d25: "+getErrorMessage(a):"\u6e05\u9664\u65e5\u5fd7\u6210\u529f!";b("#ap9_info").attr("class","left "+(a?"red":"blue"));b("#ap9_info").text(d);a||(b("#ap9_data").clearGridData(),b("#ap9_total").text("Total: 0\u6761\u7cfb\u7edf\u65e5\u5fd7!"))},
error:function(){ajaxError(arguments,this)}})}var q=[],v=[{id:10,text:"\u7528\u6237\u7ba1\u7406",level:0,parent:0,isLeaf:true,expanded:false,ff:function(){k(1);b.ajax({type:"POST",contentType:"application/json",data:"{}",dataType:"json",url:IDS_CONTEXT_PATH+"/admin/account/list",success:function(a){var a=a.accs,d,e=b("#ap1_data");e.jqGrid({autowidth:true,datatype:"local",height:"auto",colNames:"ID,\u5de5\u53f7,\u59d3\u540d,\u804c\u4f4d,MYSIN,\u90e8\u95e8".split(","),colModel:[{name:"id",hidden:true},
{name:"pernr",width:100,fixed:true,sortable:false,align:"center"},{name:"emp.name",width:120,fixed:true,sortable:false,align:"left"},{name:"emp.duty",width:180,fixed:true,sortable:false,align:"center"},{name:"emp.mysin",width:220,fixed:true,sortable:false},{name:"emp.dept",sortable:false,align:"left"}],loadui:true,multiselect:false,onSelectRow:G,scroll:false,scrollOffset:0,altclass:"jqgrow-odd",altRows:true,rowNum:10,rowList:[10,20,30],pager:"#ap1_pager",recordpos:"left",pagerpos:"center",viewrecords:true});
for(d=0;d<a.length;d++)a[d].id=d;e.setGridParam({data:a,page:1});e.trigger("reloadGrid");e.setSelection(0);b("#ap1_total").text("Total: "+a.length+"\u4e2a\u7528\u6237\u8d26\u53f7!")},error:function(){ajaxError(arguments,this)}})},url:"user"},{id:20,text:"\u76f8\u5173\u94fe\u63a5",level:0,parent:0,isLeaf:true,expanded:false,ff:function(){k(2);b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/links/list",success:function(a){w(a)},error:function(){ajaxError(arguments,
this)}})},url:"link"},{id:30,text:"\u516c\u544a\u4fe1\u606f",level:0,parent:0,isLeaf:true,expanded:false,ff:z,url:"notice"},{id:50,text:"\u79ef\u5206\u8bbe\u7f6e",level:0,parent:0,isLeaf:true,expanded:false,ff:function(){k(5);b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/karmas/list",success:function(a){A(a)},error:function(){ajaxError(arguments,this)}})},url:"karma"},{id:60,text:"\u8bc4\u5206\u6a21\u677f",level:0,parent:0,isLeaf:true,
expanded:false,ff:D,url:"score"},{id:70,text:"\u7f13\u5b58\u7ba1\u7406",level:0,parent:0,isLeaf:true,expanded:false,ff:function(){k(7);b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/cache/list",success:function(a){a.error&&MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);var d=a.items,e=b("#ap7_data");e.jqGrid({autowidth:true,datatype:"local",height:"240",colNames:["\u7f13\u5b58\u9879\u76eeKey","\u8bf4\u660e"],
colModel:[{name:"k",index:"k",width:200,fixed:true,sortable:false,align:"left"},{name:"d",sortable:false,align:"left"}],loadui:true,multiselect:false,scroll:false,scrollOffset:0,altclass:"jqgrow-odd",altRows:true,rowNum:10,rowList:[10,20,30],pager:"#ap7_pager",recordpos:"left",pagerpos:"center",viewrecords:true});e.setGridParam({data:d,page:1});e.trigger("reloadGrid");b("#ap7_total").text("Total: "+d.length+"\u9879\u7f13\u5b58\u6570\u636e!");d=[{name:"clear",text:"\u6e05\u9664\u7f13\u5b58",title:"\u6e05\u9664\u6240\u6709\u7f13\u5b58",
click:V}];a={data:[a]};b("#ap7_bar1").addButtons(d,a);b("#ap7_bar2").addButtons(d,a)},error:function(){ajaxError(arguments,this)}})},url:"cache"},{id:80,text:"\u7cfb\u7edf\u8bbe\u7f6e",level:0,parent:0,isLeaf:true,expanded:false,ff:function(){k(8);b.ajax({type:"POST",contentType:"application/json",data:"{}",dataType:"json",url:IDS_CONTEXT_PATH+"/admin/config/list",success:function(a){E(a)},error:function(){ajaxError(arguments,this)}})},url:"config"},{id:90,text:"\u7cfb\u7edf\u65e5\u5fd7",level:0,
parent:0,isLeaf:true,expanded:false,ff:function(){k(9);b.ajax({type:"POST",contentType:"application/json",data:b.toJSON({}),dataType:"json",url:IDS_CONTEXT_PATH+"/admin/log/list",success:function(a){a.error&&MessageBox(getErrorMessage(a.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0);var d=a.logs,e={},f,c=b("#ap9_data");c.jqGrid({autowidth:true,datatype:"local",height:"auto",colNames:["\u65f6\u95f4","\u4f4d\u7f6e","\u7ea7\u522b","\u767b\u5f55\u5de5\u53f7","\u9519\u8bef\u6d88\u606f"],colModel:[{name:"dateline",
width:160,formatter:"date",fixed:true,sortable:false,align:"center"},{name:"#location",width:360,fixed:true,sortable:false,align:"right"},{name:"level",width:60,fixed:true,sortable:false,align:"center"},{name:"pernr",width:80,fixed:true,sortable:false,align:"center"},{name:"content",sortable:false,align:"left"}],loadui:true,multiselect:false,onSelectRow:X,scroll:false,scrollOffset:0,altclass:"jqgrow-odd",altRows:true,rowNum:10,rowList:[10,20,30],pager:"#ap9_pager",recordpos:"left",pagerpos:"center",
viewrecords:true});for(f=0;f<d.length;f++)d[f]["#location"]=d[f].clazz+":"+d[f].method+"("+d[f].line+")",e[d[f].id]=d[f];c.setGridParam({data:d,page:1,map:e});c.trigger("reloadGrid");b("#ap9_total").text("Total: "+d.length+"\u6761\u7cfb\u7edf\u65e5\u5fd7!");d=[{name:"clear",text:"\u6e05\u9664\u65e5\u5fd7",title:"\u6e05\u9664\u6240\u6709\u65e5\u5fd7",click:Y}];a={data:[a]};b("#ap9_bar1").addButtons(d,a);b("#ap9_bar2").addButtons(d,a)},error:function(){ajaxError(arguments,this)}})},url:"log"}],o={},
m="pi",l=[{id:"rule",def:""},{id:"ruleA",def:""},{id:"ruleB",def:""},{id:"ruleC",def:""},{id:"ruleD",def:""},{id:"ah",def:"",type:m},{id:"al",def:"",type:m},{id:"bh",def:"",type:m},{id:"bl",def:"",type:m},{id:"ch",def:"",type:m},{id:"cl",def:"",type:m},{id:"dh",def:"",type:m},{id:"dl",def:"",type:m},{id:"idx",def:"",type:m}],r=null;b.IDS_ADMIN=b.IDS_ADMIN||{version:"1.0.0",name:"IDS_ADMIN"};b.extend(b.IDS_ADMIN,{init:function(a){var d,e,f=b("#treemenu");for(d=0;d<9;d++)q[d]=b("#adm_p"+(d+1));for(d=
0;d<v.length;d++)e=v[d],typeof e.id!="undefined"&&(o[e.id]=e);f.jqGrid({datatype:"jsonstring",datastr:v,height:"auto",pager:false,loadui:true,colNames:["id","\u7ba1\u7406\u9879\u76ee"],colModel:[{name:"id",width:1,hidden:true,key:true,stype:false},{name:"text",width:100,resizable:false,sortable:false,stype:false}],treeGrid:true,treeGridModel:"adjacency",treedatatype:"local",gridview:true,caption:"",sortname:"id",ExpandColumn:"text",autowidth:true,ExpandColClick:true,treeIcons:{leaf:"ui-icon-document-b"},
multiselect:false,onSelectRow:F,jsonReader:{repeatitems:false,root:function(a){return a},page:function(){return 1},total:function(){return 1},records:function(a){return a.length}}});typeof a=="number"&&o.hasOwnProperty(a)&&f.setSelection(a)}})})(jQuery);$(function(){$.IDS_MENU.init(7);$.IDS_ADMIN.init(10)});
