(function(e){function p(a){var b=a?a.data:null,b=b?b[0]:null,d=a?a.target:null;if(b&&d&&(a=e(d).val(),a=isNaN(a)?-1:parseInt(a),a>b.ah||a<b.dl)){MessageBox("\u8bf7\u8f93\u5165"+b.dl+"~"+b.ah+"\u4e4b\u95f4\u7684\u6570\u503c!",IDS_TITLE,MB_ICONERROR,MB_OK,function(){e(d).focus();e(d).select()},0);return}for(a=b=0;a<l.length;a++)b+=parseInt(l[a].input.val());a=e.IDS_JOB.getRank(b);e("#ss_total").text("\u603b\u8ba1: "+b+"("+a+"\u7ea7)")}function q(a){var b=e("#aa_table"),d=a.managers,f=a.scores,c,g={};
b.jqGrid({autowidth:true,datatype:"local",height:"auto",colNames:"\u9009\u62e9,\u5de5\u53f7,\u59d3\u540d,Duty Code,MySIN,Team,Group".split(","),colModel:[{name:"ccb",formatter:"checkbox",width:36,fixed:true,sortable:false,align:"center"},{name:"pernr",width:80,fixed:true,sortable:false,align:"center"},{name:"name",width:100,fixed:true,sortable:false,align:"left"},{name:"dutyCode",width:60,fixed:true,sortable:false,align:"center"},{name:"mysin",width:200,sortable:false,align:"left"},{name:"team",width:160,
fixed:true,sortable:false,align:"left"},{name:"group",width:120,fixed:true,sortable:false,align:"left"}],loadui:true,multiselect:false,scroll:false,scrollOffset:0,altclass:"jqgrow-odd",altRows:true,rowNum:20,rowList:[20,30,40],pager:"#aa_pager",recordpos:"left",pagerpos:"center",viewrecords:true,afterInsertRow:function(a,f,c){var g=function(a){var f=a.data[0],c=a.data[1],a=a.data[2];a.ccb=!a.ccb?true:false;c.ccb=a.ccb?"Yes":"No";d[f-1].ccb=a.ccb;e(this).attr("checked",a.ccb?"checked":"");b.setRowData(f,
c);e("#"+f+" :checkbox",b).unbind("click");e("#"+f+" :checkbox",b).bind("click",[f,c,a],g)};e("#"+a+" :checkbox",b).unbind("click");e("#"+a+" :checkbox",b).bind("click",[a,f,c],g)}});for(a=0;a<f.length;a++)c=f[a],g[c.approverNr]=true;for(a=0;a<d.length;a++)f=d[a],f.ccb=g[f.pernr]?true:false;b.setGridParam({data:d,page:1});b.trigger("reloadGrid")}e("#ss_close").click(function(){var a=true;typeof g["#onScoreClose"]=="function"&&(a=g["#onScoreClose"]());(a==void 0||a)&&e("#ss_div").dialog("close")});
e("#ss_save").click(function(){var a=true,b={};if(typeof g["#onScoreSave"]=="function"){b.comment=e("#ss_comment").val();b.id=k?k.id:0;b.cat=g.cat;b.tempId=o.id;b.items=[];for(a=0;a<l.length;a++)b.items.push({id:l[a].item.id,value:l[a].input.val()});a=g["#onScoreSave"](g,b)}(a==void 0||a)&&e("#ss_div").dialog("close")});e("#aa_close").click(function(){var a=true;typeof g["#onAssignClose"]=="function"&&(a=g["#onAssignClose"]());(a==void 0||a)&&e("#aa_div").dialog("close")});e("#aa_save").click(function(){var a,
b=e("#aa_table").getGridParam("data"),d,f,c,i=[],h="",k=function(a){a!=ID_NO&&(a=true,a=g["#onAssignSave"](g,{time3:f,time4:c,scorers:i}),(a==void 0||a)&&e("#aa_div").dialog("close"))};if(typeof g["#onAssignSave"]=="function"){for(a=0;a<b.length;a++)d=b[a],d.ccb&&i.push(d);if(i.length<=0)MessageBox("\u8bf7\u9009\u62e9\u73b0\u573a\u5956\u52b1\u8bc4\u59d4!",IDS_TITLE,MB_ICONWARNING,MB_OK,null,0);else if(f=e("#aa_time3").val().parseDate(IDS_FORMAT_DATE),c=e("#aa_time4").val().parseDate(IDS_FORMAT_DATE),
f==null||c==null)MessageBox("\u8bf7\u6307\u5b9a\u8bc4\u5ba1\u65e5\u671f!",IDS_TITLE,MB_ICONWARNING,MB_OK,null,0);else{h="\u5c06\u6307\u5b9a\u4ee5\u4e0b\u4eba\u5458\u8fdb\u884c\u73b0\u573a\u5956\u52b1\u8bc4\u5206, \u8bf7\u786e\u5b9a:\n";for(a=0;a<i.length;a++)d=i[a],h+=d.name+"["+d.pernr+"]\n";MessageBox(h,IDS_TITLE,MB_ICONQUESTION,MB_YESNO,k,0)}}});var l,g,k,o;e.extend(e.IDS_JOB,{openScore:function(a){var b=a.job?a.job:null,d=a.act?a.act:b?b.act:null,f=a.cat?a.cat:null,c=a.data;if(b["#scorable"]())if(f!=
"S"&&f!="J")MessageBox("\u975e\u6cd5\u7684\u8bc4\u5206\u7c7b\u578b!",IDS_TITLE,MB_ICONERROR,MB_OK,null,0);else{var i=f=="S"?"\u6539\u5584\u5ba1\u6279\u8bc4\u5206 -- "+b.title:f=="J"?"\u73b0\u573a\u5956\u52b1\u8bc4\u5206 -- "+b.title:"???",h=b?b["#phase"]:0,b=b?b["#who"]:0,m,j,n;if(f=="S"){n=d.temp?d.temp.id:null;if(b==5&&(h==7||h==8||h==9))j=d.s1?d.s1.id:null,m=d.comment1?d.comment1:"";else if(b==6&&(h==8||h==10||h==11))j=d.s2?d.s2.id:null,m=d.comment2?d.comment2:"";e("#ss_comment").itip("\u8bf7\u8f93\u5165\u8bc4\u8bba");
e("#ss_comment").val(m);e("#ss_comment").show()}else f=="J"&&(j=c?c["act.score"]:null,c=c?c["score.temp"]:null,j=j?j.id:null,n=c?c.id:null,e("#ss_comment").hide());e("#ss_div").dialog({title:i});g=a;c={extra:{sid:j,tid:n}};e.ajax({type:"POST",contentType:"application/json",data:e.toJSON(c),dataType:"json",url:IDS_CONTEXT_PATH+"/score/open",success:function(a){var b=e("#ss_table");o=(k=a.ss)&&k.temp?k.temp:a.st;b.children().remove();l=[];b.addRow([{text:"\u8bc4\u4ef7\u9879\u76ee",width:100},{text:"\u5206\u6570",
width:60},{text:"\u5f88\u4f18\u79c0",width:160},{text:"\u4f18\u79c0",width:160},{text:"\u666e\u901a",width:160},{text:"\u4e0d\u8db3"}],{cssClass:"header"});var a=o.items,d,f,c,g,h,i,j={cssClass:"row"};f=k&&k.dts?k.dts:[];var m={};for(d=0;d<f.length;d++)m[f[d].itemId]=f[d].value;for(d=0;d<a.length;d++){c=a[d];h=e(document.createElement("select"));h.id="ssi_"+c.id;h.css("width","48px");l.push({item:c,input:h});g=[{text:c.rule,rowspan:2,cssClass:"col1"},{obj:h,rowspan:2,cssClass:"col2"},c.ruleA,c.ruleB,
c.ruleC,c.ruleD];b.addRow(g,j);g=[c.ah+"~"+c.al,c.bh+"~"+c.bl,c.ch+"~"+c.cl,c.dh+"~"+c.dl];for(f=c.dl;f<=c.ah;f++)i=e(document.createElement("option")),i.val(f),i.text(f),h.append(i);h.val(m.hasOwnProperty(c.id)?m[c.id]:c.dl);h.bind("change",[c],p);b.addRow(g,j)}b.addRow([{text:"\u7b49\u7ea7",cssClass:"fcol1"},{text:e.IDS_JOB.RANK_SPEC,colspan:5,cssClass:"fcol2"}],{cssClass:"footer"});p()},error:function(){ajaxError(arguments,this)}})}else MessageBox("\u6b64\u63d0\u6848\u672a\u6267\u884c\u5230\u8bc4\u5206\u6d41\u7a0b\u9636\u6bb5!",
IDS_TITLE,MB_ICONERROR,MB_OK,null,0)},openAssign:function(a){var b=a.job?a.job:null,d=a.act?a.act:b?b.act:null;if(b["#passed"]()){var f=d&&d.time3?(new Date(d.time3)).format("Y-m-d"):"",c=d&&d.time4?(new Date(d.time4)).format("Y-m-d"):"";e("#aa_div").dialog({title:"\u6307\u5b9a\u73b0\u573a\u5956\u52b1\u8bc4\u59d4 -- "+b.title});e("#aa_time3").val(f);e("#aa_time4").val(c);e("#aa_time3").datepicker({buttonImage:"",showOn:"focus",currentText:f,gotoCurrent:true});e("#aa_time4").datepicker({buttonImage:"",
showOn:"focus",currentText:c,gotoCurrent:true});g=a;e.ajax({type:"POST",contentType:"application/json",data:e.toJSON({id:b.id,act:{id:d.id}}),dataType:"json",url:IDS_CONTEXT_PATH+"/job/assign",success:function(a){q(a,d)},error:function(){ajaxError(arguments,this)}})}else MessageBox("\u6b64\u63d0\u6848\u4e0d\u53ef\u4ee5\u8fdb\u884c\u73b0\u573a\u5956\u52b1\u8bc4\u6bd4!",IDS_TITLE,MB_ICONERROR,MB_OK,null,0)}})})(jQuery);