(function(a){function h(b,c,e){var d,g=0;b.clearGridData();for(d=0;d<c.length;d++)typeof e=="function"&&e(c[d])==false||(a.IDS_JOB.initJob(c[d]),c[d]["#avg"]=c[d].extra["s.avg"],b.addRowData(d+1,c[d]),g++)}function i(b){var c=a("#bo_data1").getRowData(b),c=a.toJSON({id:c.id});a.ajax({type:"POST",contentType:"application/json",url:IDS_CONTEXT_PATH+"/job/open",data:c,dataType:"json",success:function(a){j(b,a)},error:function(){ajaxError(arguments,this)}})}function j(b,c){a("#bo_list").hide();a.IDS_JOB.openJob(c,
{"#onJobReturn":function(){a("#bo_list").show()},"#onActReturn":function(){a("#bo_list").show()}})}a.BONUS=a.BONUS||{version:"1.0.0",name:"BONUS"};a.extend(a.BONUS,{init:function(b){a.IDS_JOB.setTypes(b["job.types"]);a.IDS_JOB.setStatus(b["job.status"]);a.IDS_JOB.setCats(b["job.cats"]);var c=a("#bo_data1"),e=a("#bo_data2"),d=b.jobs1,g=b.jobs2,f="";c.jqGrid({autowidth:true,datatype:"local",height:"auto",colNames:"ID,\u65f6\u95f4,\u63d0\u6848\u90e8\u95e8,\u63d0\u6848\u8005,\u63d0\u6848\u7c7b\u578b,\u4e3b\u9898,\u7b49\u7ea7,\u5f97\u5206,\u5e73\u5747\u5f97\u5206(\u73b0\u573a)".split(","),
colModel:[{name:"id",hidden:true},{name:"reqTime",index:"reqTime",formatter:"date",width:120,fixed:true,sortable:false,align:"center"},{name:"#dept1",width:80,fixed:true,sortable:false},{name:"#requester",width:100,fixed:true,sortable:false},{name:"#catText",width:80,fixed:true,sortable:false,align:"center"},{name:"title",sortable:false},{name:"#rank",width:60,fixed:true,sortable:false,align:"center"},{name:"#score",width:60,fixed:true,sortable:false,align:"center"},{name:"#avg",width:120,fixed:true,
formatter:"number",sortable:false,align:"center"}],loadui:true,multiselect:false,onSelectRow:i,scroll:false,scrollOffset:0,altclass:"jqgrow-odd",altRows:true});h(c,d);f="\u4f18\u79c0\u63d0\u6848["+b.cal1+"~"+b.cal2+"]: "+d.length+"\u6761\u8bb0\u5f55!";f+=IDS_ACC.admin?" \u8bf7\u6307\u5b9a\u73b0\u573a\u5956\u52b1\u8bc4\u5206\u4eba\u5458!":" \u8bf7\u8fdb\u884c\u8bc4\u5206!";a("#bo_total1").text(f);e.jqGrid({autowidth:true,datatype:"local",height:"auto",colNames:"ID,\u65f6\u95f4,\u63d0\u6848\u90e8\u95e8,\u63d0\u6848\u8005,\u63d0\u6848\u7c7b\u578b,\u4e3b\u9898,\u7b49\u7ea7,\u5f97\u5206,\u5e73\u5747\u5f97\u5206(\u73b0\u573a)".split(","),
colModel:[{name:"id",hidden:true},{name:"reqTime",index:"reqTime",formatter:"date",width:120,fixed:true,sortable:false,align:"center"},{name:"#dept1",width:80,fixed:true,sortable:false},{name:"#requester",width:100,fixed:true,sortable:false},{name:"#catText",width:80,fixed:true,sortable:false,align:"center"},{name:"title",sortable:false},{name:"#rank",width:60,fixed:true,sortable:false,align:"center"},{name:"#score",width:60,fixed:true,sortable:false,align:"center"},{name:"#avg",width:120,fixed:true,
formatter:"number",sortable:false,align:"center"}],loadui:true,multiselect:false,scroll:false,scrollOffset:0,altclass:"jqgrow-odd",altRows:true});h(e,g);f="\u83b7\u5956\u63d0\u6848["+b.cal3+"~"+b.cal4+"]: "+g.length+"\u6761\u8bb0\u5f55!";a("#bo_total2").text(f)}})})(jQuery);$(function(){$.IDS_MENU.init(6);$.ajax({type:"POST",contentType:"application/json",data:"{}",dataType:"json",url:IDS_CONTEXT_PATH+"/job/bonus",success:$.BONUS.init,error:function(){ajaxError(arguments,this)}})});