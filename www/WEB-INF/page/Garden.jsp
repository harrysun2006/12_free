<%@page contentType="text/html; charset=utf-8"%>
<jsp:include page="include/meta.jsp" />
<jsp:include page="include/header.jsp" />
<div id="darkbanner" class="banner320"> 
  <h2>添加新小区</h2>
</div>
<div id="darkbannerwrap"> </div>
<fieldset class="form">
<legend>新小区明细</legend>
<p>
  <label for="no">小区编号</label>
  <input  name="no" id="no" type="text"/>
</p>
<p>
  <label for="name">小区名称</label>
  <input name="name" id="name" type="text"/>
</p>
<p>
  <label for="shortname">小区简称</label>
  <input name="shortname" id="shortname" type="text"/>
</p>
<p>
  <label for="regtime">登记日期</label>
  <input name="regtime" id="regtime" type="text" readonly="readonly"/>
</p>
<p>
  <label for="address">小区地址</label>
  <input name="address" id="address" type="text"/>
 </p>
<p>
  <label for="status">状态</label>
  <select name="status" id="status" >
    <option value="U">在用</option>
    <option value="X">注销</option>
  </select>
</p>
<p>
  <label for="memo">备注</label>
  <input name="memo" id="memo" type="text"/>
</p>
<p>
  <button id="btn_commit" >提交</button>
  <button id="btn_reset" >重置</button>
</p>



<jsp:include page="include/tool.jsp" />
<jsp:include page="include/info.jsp" />
<script src="${APP_CONTEXT_PATH}/js/garden.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>