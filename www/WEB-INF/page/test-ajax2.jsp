<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Spring MVC</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-1.4.4.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery.json-2.2.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
		      jQuery.ajax( {
		        type : 'GET',
		        contentType : 'application/json',
		        url : '${pageContext.request.contextPath}/test/ajax2/list',
		        dataType : 'json',
		        success : function(data) {
		          if (data && data.success == "true") {
		            $('#info').html("共" + data.total + "条数据。<br/>");
		            $.each(data.data, function(i, item) {
		              $('#info').append("编号：" + item.name + "，姓名：" + item.nickName + "，年龄：" + item.age+"<br>");
		            });
		          }
		        },
		        error : function() {
		          alert("error")
		        }
		      });

		      $("#submit").click(function() {
		        var data = $.toJSON($('#form').serializeObject());
		        // alert(data);
		        jQuery.ajax( {
		          type : 'POST',
		          contentType : 'application/json',
		          url : '${pageContext.request.contextPath}/test/ajax2/add',
		          data : data,   
		          dataType : 'json',   
		          success : function(data) {   
		             if (data && data.success == "true") {   
			            $('#info').html("共" + data.total + "条数据。<br/>");   
			            $.each(data.data, function(i, item) {   
			              $('#info').append("编号：" + item.name + "，姓名：" + item.nickName + "，年龄：" + item.age+"<br>");   
			            });
			            alert("新增成功！");
			          }
		          },
		          error : function(data) {   
		            alert("error")   
		          }
		        });
		      });
		    });
		    
		    //将一个表单的数据返回成JSON对象   
			$.fn.serializeObject = function() {   
			  var o = {};   
			  var a = this.serializeArray();   
			  $.each(a, function() {   
			    if (o[this.name]) {   
			      if (!o[this.name].push) {   
			        o[this.name] = [ o[this.name] ];   
			      }   
			      o[this.name].push(this.value || '');   
			    } else {   
			      o[this.name] = this.value || '';   
			    }   
			  });   
			  return o;   
			};   
	</script>
</head>
<body>
<div id="info"></div>
<hr/>
<form action="add" method="post" id="form">
ID：<input type="text" name="id" style="width:100px" />
编号：<input type="text" name="name" style="width:100px" />
姓名：<input type="text" name="nickName" style="width:100px" />
年龄：<input type="text" name="age" style="width:100px" />
性别: <select name="gender" style="width:100px">
       	<option value="MAN">男</option>
       	<option value="WOMEN">女</option>
     </select>
 密码: <input name="password" style="width:100px" />
 地址: <input name="address" style="width:100px" />
<input type="button" value="提交" id="submit" />   
</form>
</body>
</html>