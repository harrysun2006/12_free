<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<jsp:include page="include/meta.jsp" />
<link rel="stylesheet" type="text/css" href="${APP_CONTEXT_PATH}/css/garden.css" />
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>初始化页面</title>
</head>
<body id="login">
<div>
</div>
<div id="wrapper">
<div id="content">
<div id="header">
  <h1><a href=""><img src="${APP_CONTEXT_PATH}/image/logo.png" alt="FreeSoft" border="0"/></a></h1>
</div>
<div id="darkbanner" class="banner320">
  <h2>初始化</h2>
</div>
<div id="darkbannerwrap"> </div>
<fieldset class="form">
  <p>
    <label for="username">用户名:</label>
    <input name="username" id="username" type="text" value="" />
  </p>
  <p>
    <label for="password">密码:</label>
    <input name="password" id="password" type="password" />
  </p>
  <p>
     <label for="agpassword">重复密码:</label>
     <input name="password" id="agpassword" type="password" />
   </p>
    <p>
     <label for="agpassword">昵称:</label>
     <input name="nickname" id="nickname" type="text" />
   </p>
  <button id="ok">确定</button>
  <button id="reset">重置</button>
   
</fieldset>
</div>
</div>
<script src="${APP_CONTEXT_PATH}/js/setup.js?ver=${APP_VER}" type="text/javascript" charset="utf-8"></script>
</body>
</html>