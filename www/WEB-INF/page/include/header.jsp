<%@page contentType="text/html; charset=utf-8"%>
<div id="wrappertop"
	style="background: #63bad8 url(../image/bg.png) 50% 0px repeat-x;"></div>
<div id="header">
	<h1>
		<a href="${APP_CONTEXT_PATH}/"> <img alt="FreelanceSuite"
			src="${APP_CONTEXT_PATH}/image/logo.png"> </a>
	</h1>
	<div id="usercontainer">
		<ul id="user-options">
			<li class="boldtext">欢迎 ${APP_USER}</li>
			<li class="boldtext">|</li>
			<li><a href="${APP_CONTEXT_PATH}/logout">Logout</a></li>
		</ul>
	</div>
</div>
<ul id="staffmenu" class="sf-menu">
	<li class="current"><a href="#">地块管理</a>
		<ul>
			<li><a href="${APP_CONTEXT_PATH}/plot">添加地块</a></li>
			<li><a class="plot_edit">查看地块</a></li>
		</ul></li>
	<li><a href="#">小区管理</a>
		<ul>
			<li><a href="${APP_CONTEXT_PATH}/garden">添加小区</a></li>
			<li><a href="#">修改小区</a></li>
			<li><a href="#">删除小区</a></li>
		</ul></li>
	<li id="billingtools"><a href="javascript:void(0)">########</a></li>
	<li id="support"><a href="javascript:void(0)">########</a></li>
	<li id="administration"><a href="javascript:void(0)">########</a>
	</li>
	<li id="myaccount"><a href="${APP_CONTEXT_PATH}/admin">用户管理</a>
		<ul>
			<li><a href="#">添加用户</a></li>
			<li><a href="#">修改密码</a></li>
			<li><a href="#">删除用户</a></li>
		</ul></li>
</ul>
<div id="darkbannerwrap"></div>
<div id="darkbannerwrap"></div>
<!--
 <li id="clientfunctions"> <a href="${APP_CONTEXT_PATH}/plot">地块管理</a> </li>
 <li id="projectfunctions"> <a href="${APP_CONTEXT_PATH}/garden">小区管理</a> </li>
 <li id="billingtools"> <a href="javascript:void(0)">########</a> </li>
 <li id="support"> <a href="javascript:void(0)">########</a> </li>
 <li id="administration"> <a href="javascript:void(0)">########</a> </li>
 <li id="myaccount"> <a href="${APP_CONTEXT_PATH}/admin">用户管理</a> </li>
 -->