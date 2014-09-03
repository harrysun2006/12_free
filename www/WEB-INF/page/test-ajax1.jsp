<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-1.4.4.min.js"></script>	
	<title>Spring MVC - jQuery 整合教程</title>
</head>
<body>
<h3>Spring MVC - jQuery 整合教程</h3>
<h4>AJAX version</h4>
<p>Demo 1 计算并返回值</p>
<div style="border: 1px solid #ccc; width: 660px;">
	Add Two Numbers: <br/>
	<input id="x" type="text" size="6" value="37"> +
	<input id="y" type="text" size="6" value="29">
	<input type="submit" id="demo1" value="Add" /> <br/>
	Sum: <br>
	<span id="sum">(Result will be shown here)</span>
</div>
<hr><br>
<p>Demo 2 获取一个对象</p>
<div style="border: 1px solid #ccc; width: 660px;">
	<input type="text" id="userId" value="1" /><br/>
	<input type="submit" id="demo2" value="Get" /> <br/>	
	<span id="info">(Result will be shown here)</span>
</div>
<hr><br>
<p>Demo 3 返回List集合对象</p>
<div style="border: 1px solid #ccc; width: 660px;">	
	<input type="submit" id="demo3" value="Get User List" /> <br/>	
	<span id="listInfo">(Result will be shown here)</span>
</div>
<hr><br>
<p>Demo 4 返回Map集合对象</p>
<div style="border: 1px solid #ccc; width: 660px;">	
	<input type="submit" id="demo4" value="Get User Map" /> <br/>	
	<span id="mapInfo">(Result will be shown here)</span>
</div>
<hr><br>
<a href="${pageContext.request.contextPath}/test">返回</a>
<hr><br>
<script type="text/javascript"> 
$(function() {
  $("#demo1").click(function() {
    $.post("${pageContext.request.contextPath}/test/ajax1/add",
		  {x:  $("#x").val(),
			y:  $("#y").val() 
			},
			function(data){
			  $("#sum").replaceWith('<span id="sum">'+ data + '</span>');							   
			});
  });

  $("#demo2").click(function(){
	  var userId = $("#userId").val();
		$.post("${pageContext.request.contextPath}/test/ajax1/get-user/" + userId,
		  null,
			function(data){
			  var info = "姓名: " + data.nickName + ", 年龄: " + data.age + ", 地址: " + data.address + ", 性别: " + (data.gender == "MAN" ? "男" : "女") + ", 密码: " + data.password;					  													
			  $("#info").html(info);							   
      });
  });

  $("#demo3").click(function(){	  
    $.post("${pageContext.request.contextPath}/test/ajax1/user-list",
	    null,
		  function(data){	
        var info = '';
        $.each(data, function(index, entity) {
          info += "姓名: " + entity.nickName + ", 年龄: " + entity.age + ", 地址: " + entity.address + ", 性别: " + (entity.gender == "MAN" ? "男" : "女") + ", 密码: " + entity.password + "<br>";   
			  });
			  $("#listInfo").html(info);
	   });
  });	 
	 
  $("#demo4").click(function(){	  
	  $.post("${pageContext.request.contextPath}/test/ajax1/user-map",
		  null,
			function(map){	
			  var info = '';	
				$.each(map, function(key, entity) { 
				  info += key + ": ";
					info += "姓名: " + entity.nickName + ", 年龄: " + entity.age + ", 地址: " + entity.address + ", 性别: " + (entity.gender == "MAN" ? "男" : "女") + ", 密码: " + entity.password + "<br>";
			  });
        $("#mapInfo").html(info);				   
	    });
  });	 
});
</script>
</body>
</html>