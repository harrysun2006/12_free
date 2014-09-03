<%@page contentType="text/html; charset=utf-8"%>
<jsp:include page="include/meta.jsp" />
<body id="login">
<div id="wrappertop" style="background: #63bad8 url(../image/bg.png) 50% 0px repeat-x;"></div>
<div id="wrapper">
  <div id="content">
    <div id="header">
      <h1><a href=""><img src="${APP_CONTEXT_PATH}/image/logo.png" alt="FreeSoft" border="0"/></a></h1>
    </div>
    <div id="darkbannerwrap"> </div>

    <div id="darkbanner" class="banner320">
      <h2>用户登录</h2>
    </div>
    <div id="darkbannerwrap"> </div>
    <fieldset class="form">
      <p>
        <label for="username">用户名:</label>
        <input name="username" id="username" type="text" value="" />
      </p>
      <p>
        <label for="password">密　码:</label>
        <input name="password" id="password" type="password" />
      </p>
      <button id="btn_login" > <img src="${APP_CONTEXT_PATH}/image/key.png" />登录</button>
      <ul id="forgottenpassword">
        <li class="boldtext">|</li>
        <li><a href="#">忘记密码？</a></li>
      </ul>
    </fieldset>
  </div>
</div>
<script src="${APP_CONTEXT_PATH}/js/login.js?ver=${APP_VER}" type="text/javascript" charset="utf-8"></script>
</body>
</html>