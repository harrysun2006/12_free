(function(a){function m(){a("#logout_box").hide();a("#login_box").show();bind(l);a("#pernr").val("");a("#password").val("");a("#vcode").val("");a("#pernr").trigger("focus");IDS_USE_VCODE?(a("#svcode").show(),a("#svcode").css("visibility","visible")):(a("#svcode").hide(),a("#svcode").css("visibility","hidden"));a.META.welcome();a.IDS_MENU.init(0)}function n(b){a("#login_box").hide();a("#logout_box").show();unbind(l);IDS_ACC&&(a("#t_pernr").text(IDS_ACC.pernr),a("#t_pernr").attr("title",IDS_ACC.pernr),
a("#t_name").text(IDS_ACC.emp.name),a("#t_name").attr("title",IDS_ACC.emp.name),a("#t_duty").text(IDS_ACC.emp.duty),a("#t_duty").attr("title",IDS_ACC.emp.duty));IDS_ACC.type==0||IDS_ACC.type==2?q():(a("#reset_pass").removeClass("enabled"),a("#reset_pass").addClass("disabled"),a("#reset_pass").unbind("click"));a.META.welcome();a.IDS_MENU.init(0);r();b!=void 0&&b["password.default"]&&MessageBox("\u9996\u6b21\u767b\u5f55\u7cfb\u7edf\u5fc5\u987b\u4fee\u6539\u9ed8\u8ba4\u5bc6\u7801!",IDS_WARNING,MB_ICONWARNING,
MB_OK,function(){a("#reset_pass").trigger("click",[true])},0)}function o(b){var d=(new Date).getTime();a("#ivcode",b).attr("src",IDS_CONTEXT_PATH+"/vcode?"+d)}function r(){var b=IDS_ACC?IDS_ACC.emp:null,d=IDS_ACC&&IDS_ACC.extra&&IDS_ACC.extra.agents?IDS_ACC.extra.agents:null,c=IDS_ACC&&IDS_ACC.extra&&IDS_ACC.extra.agent?IDS_ACC.extra.agent:null,c=c?c.pernr:null;b&&b.lead&&d?(a("#div_agent").show(),a("#lst_agents").addOptions(d,{value:"pernr",text:"name",svalue:c,blank:true}),a("#lst_agents").bind("change",
{auto:false},p)):a("#div_agent").hide()}function p(b){var d=(b=b&&b.data&&b.data.auto?true:false)?"":a("#lst_agents").val();a.ajax({type:"POST",contentType:"application/json",url:IDS_CONTEXT_PATH+"/account/delegate",data:a.toJSON({principal:IDS_ACC.pernr,agent:d,auto:b}),dataType:"json",success:function(b){MessageBox(b.message,b.error?IDS_ERROR:IDS_INFO,b.error?MB_ICONERROR:MB_ICONINFORMATION,null,null,3);IDS_ACC.extra.agent=b.agent;b.agent==null&&a("#lst_agents").val("")},error:function(){ajaxError(arguments,
this)}})}function s(){a.ajax({type:"POST",contentType:"application/json",url:IDS_CONTEXT_PATH+"/data/index",data:"{}",dataType:"json",success:t,error:function(){ajaxError(arguments,this)}})}function t(b){var d=b.admins?b.admins:null,c=b.goodjobs?b.goodjobs:[],e=b.notices?b.notices:[],b=b.links?b.links:[],g=a("#links"),f,i,h,j,k;g.children().remove();for(k=0;k<4;k++){h=a(document.createElement("div"));h.attr("class","link");if(k<b.length)f=b[k],i=f.link,i.indexOf("http://")<0&&(i="http://"+i),j=a(document.createElement("a")),
j.text(f.text),j.attr("href",i),j.attr("title",f.desc),j.attr("target","_blank"),h.append(j);g.append(h);h=a(document.createElement("div"));h.attr("class","shadow01");g.append(h)}b=a("#admins");b.children().remove();if(d)for(h=0;h<1;h++)f=a(document.createElement("div")),f.attr("class","admin"),h<d.length&&(g=d[h],i=a(document.createElement("div")),i.text(g.emp.pernr+"["+g.emp.name+"]"+g.emp.mysin),f.append(i)),b.append(f),f=a(document.createElement("div")),f.attr("class","shadow01"),b.append(f);
u(c);d={};b=a("#ggxx_data");b.jqGrid({autowidth:true,datatype:"local",height:"146",colNames:["ID","\u53d1\u5e03\u65f6\u95f4","\u6807\u9898"],colModel:[{name:"id",hidden:true},{name:"dateline",width:180,formatter:"date",fixed:true,sortable:false,align:"left"},{name:"title",fixed:false,sortable:false,align:"left"}],loadui:false,multiselect:false,onSelectRow:v,scroll:false,scrollOffset:0,rowNum:6,rowList:[],pager:"#ggxx_pager",recordpos:"left",pagerpos:"right",viewrecords:true,cellLayout:2});for(c=0;c<
e.length;c++)d[e[c].id]=e[c];b.setGridParam({data:e,page:1,map:d});b.trigger("reloadGrid")}function u(b){var d=a("#yxta"),c,e,g,f;d.children().remove();c=function(){a("#half_left").show();a("#half_right").show()};var i={"#ro":true,"#onJobReturn":c,"#onActReturn":c},h=function(){a("#pernr").focus()},j=function(b){IDS_ACC?(a("#half_left").hide(),a("#half_right").hide(),a.IDS_JOB.reloadJob(b.data[0],i)):MessageBox("\u8bf7\u767b\u5f55\u7cfb\u7edf\u540e\u518d\u67e5\u770b\u4f18\u79c0\u63d0\u6848!",IDS_WARNING,
MB_ICONWARNING,MB_OK,h,0)};for(f=0;f<b.length;f++)c=b[f],e=a(document.createElement("div")),g=a(document.createElement("a")),g.text(c.title),g.click([c],j),g.attr("title",c.content),e.append(g),d.append(e)}function v(){var b=a("#ggxx_data").selectedItems(),b=b&&b.length>0?b[0]:null;b==null?MessageBox("\u8bf7\u9009\u62e9\u4e00\u6761\u516c\u544a\u4fe1\u606f!",IDS_ERROR,MB_ICONERROR,MB_OK,null,3):a.ajax({type:"POST",contentType:"application/json",url:IDS_CONTEXT_PATH+"/notice/get",data:a.toJSON({id:b.id}),
dataType:"json",success:function(b){b.error?MessageBox(getErrorMessage(b.error),IDS_ERROR,MB_ICONERROR,MB_OK,null,0):(b=b.notice,a.IDS_INFO.open({id:b.id,title:b.title,content:b.content,op:"view",caption:"\u67e5\u770b\u516c\u544a\u4fe1\u606f"}))},error:function(){ajaxError(arguments,this)}})}function w(b){x(b)&&(b=a.toJSON(b),a.ajax({type:"POST",contentType:"application/json",url:IDS_CONTEXT_PATH+"/account/login",data:b,dataType:"json",success:function(b){var c=b.error,e="";c?MessageBox(c=="account.unknown"?
"\u7cfb\u7edf\u672a\u627e\u5230\u5bf9\u5e94\u5de5\u53f7!":c=="admin.disabled"?"\u7cfb\u7edf\u5df2\u6307\u5b9a\u7ba1\u7406\u5458, \u9ed8\u8ba4\u5185\u7f6e\u7684admin\u8d26\u53f7\u5df2\u88ab\u7981\u7528!":c=="account.disabled"?"\u6b64\u5de5\u53f7\u7684\u8d26\u53f7\u5df2\u88ab\u7981\u7528!":c=="password"?"\u5bc6\u7801\u9519\u8bef!":c=="vcode"?"\u9a8c\u8bc1\u7801\u9519\u8bef!":c=="error"?"\u5176\u4ed6\u9a8c\u8bc1\u9519\u8bef!":"\u672a\u77e5\u9519\u8bef!",IDS_ERROR,MB_ICONERROR,MB_OK,null,0):(IDS_ACC=
a.META.me(b),n(b),(IDS_ACC&&IDS_ACC.extra&&IDS_ACC.extra.agent?IDS_ACC.extra.agent:null)!=null&&p({data:{auto:true}}))},error:function(){ajaxError(arguments,this)}}))}function x(b){var d=false,c="",e=null;b.pernr.empty()?(c="\u8bf7\u8f93\u5165\u975e\u7a7a\u5de5\u53f7!",e=function(){a("#pernr").trigger("focus")}):IDS_USE_VCODE&&!b.extra.vcode.match(/^[2-8]{4}$/)?(c="\u8bf7\u8f93\u5165\u5408\u6cd5\u9a8c\u8bc1\u7801!",e=function(){a("#vcode").trigger("focus");a("#vcode").trigger("select")}):d=true;!d&&
c&&MessageBox(c,IDS_WARNING,MB_ICONWARNING,null,e,2);return d}function y(){a.ajax({type:"POST",contentType:"application/json",url:IDS_CONTEXT_PATH+"/account/logout",success:function(a){a.error||(IDS_ACC=false,m())},error:function(){ajaxError(arguments,this)}})}function z(b){A(b)&&(b=a.toJSON(b),a.ajax({type:"POST",contentType:"application/json",url:IDS_CONTEXT_PATH+"/account/reset_pass",data:b,dataType:"json",success:function(b){var c=b.error,e="",g=IDS_ERROR,f=MB_ICONERROR,i=0;c?e=c=="account.unknown"?
"\u7cfb\u7edf\u672a\u627e\u5230\u5bf9\u5e94\u5de5\u53f7!":c=="account.disabled"?"\u6b64\u5de5\u53f7\u7684\u8d26\u53f7\u5df2\u88ab\u7981\u7528!":c=="account.other"?"\u53ea\u80fd\u91cd\u7f6e\u81ea\u5df1\u7684\u8d26\u53f7\u5bc6\u7801!":c=="password.tooshort"?"\u5bc6\u7801\u592a\u77ed!":c=="password.mismatch"?"2\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4!":c=="password.noletter"?"\u5bc6\u7801\u4e2d\u5fc5\u987b\u5305\u542b\u5b57\u6bcd!":c=="password.nodigit"?"\u5bc6\u7801\u4e2d\u5fc5\u987b\u5305\u542b\u6570\u5b57!":
c=="password.default"?"\u4e0d\u80fd\u4fee\u6539\u4e3a\u7cfb\u7edf\u521d\u59cb\u5bc6\u7801!":"\u672a\u77e5\u9519\u8bef!":(a("#reset_pass_div").dialog("close"),e="\u5df2\u6210\u529f\u4fee\u6539\u8d26\u53f7["+b.pernr+"]\u7684\u5bc6\u7801!",g=IDS_INFO,f=MB_ICONINFORMATION,i=5);MessageBox(e,g,f,MB_OK,null,i)},error:function(){ajaxError(arguments,this)}}))}function q(){a("#reset_pass").removeClass("disabled");a("#reset_pass").addClass("enabled");a("#reset_pass").bind("click",function(){a("#reset_pass_div").dialog("open");
a("#reset_p1").focus()})}function A(b){var d=false,c="",e=function(){a("#p1").trigger("focus");a("#p1").trigger("select")};b.extra.p1!=b.extra.p2?c="\u8bf7\u786e\u5b9a2\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e00\u81f4!":b.extra.p1.length<6?c="\u8bf7\u8f93\u51656\u4f4d\u4ee5\u4e0a\u7684\u5bc6\u7801!":/[a-z]/gi.test(b.extra.p1)?/[0-9]/g.test(b.extra.p1)?d=true:c="\u5bc6\u7801\u4e2d\u5fc5\u987b\u5305\u542b\u6570\u5b57!":c="\u5bc6\u7801\u4e2d\u5fc5\u987b\u5305\u542b\u5b57\u6bcd!";!d&&c&&MessageBox(c,IDS_WARNING,
MB_ICONWARNING,null,e,2);return d}var l,B={contentSelector:"$('#dvcode').html()",fill:"#F7F7F7",cssStyles:{color:"#000000"},shrinkToFit:true,padding:"5px 5px 0px 5px",cornerRadius:2,spikeLength:10,spikeGirth:6,strokeStyle:"#B7B7B7",postShow:function(b){a("#avcode",b).click(function(){o(b)});o(b)}};a("#login").click(function(){var b={pernr:a("#pernr").val(),password:a("#password").val(),extra:{vcode:a("#vcode").val(),rememberMe:false}};w(b)});a("#logout").click(function(){y()});a("#reset_pass_div").dialog({autoOpen:false,
close:function(){a("#reset_p1").val("");a("#reset_p2").val("")},closeText:"hide",modal:true,resizable:false,width:210});a("#reset_yes").click(function(){var b={pernr:IDS_ACC.pernr,extra:{p1:a("#reset_p1").val().trim(),p2:a("#reset_p2").val().trim()}};z(b)});a("#reset_no").click(function(){a("#reset_pass_div").dialog("close")});a.INDEX=a.INDEX||{version:"1.0.0",name:"INDEX"};a.extend(a.INDEX,{init:function(){a("#reset_pass").data={enabled:true};l={keydown:genericKeyDown};l.controls=IDS_USE_VCODE?[a("#pernr"),
a("#password"),a("#vcode"),a("#login")]:[a("#pernr"),a("#password"),a("#login")];try{a("#pernr").focus(),a("#vcode").bt(B)}catch(b){}IDS_ACC?n():m();s()}})})(jQuery);$(function(){$.IDS_MENU.init(0);$.INDEX.init()});