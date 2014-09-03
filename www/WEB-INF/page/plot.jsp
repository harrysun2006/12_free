<%@page contentType="text/html; charset=utf-8"%>
<jsp:include page="include/meta.jsp" />
<jsp:include page="include/header.jsp" />
<div id="darkbanner" class="banner320">
  <h2>添加新地块</h2>
</div>
<div id="darkbannerwrap"> </div>
<div id="plot_list">
<fieldset class="form">
  <legend>新地块明细</legend>
  <p>
    <label for="no">地块编号</label>
    <input  name="no" id="no" type="text"/>
  </p>
  <p>
    <label for="name">地块名称</label>
    <input name="name" id="name" type="text"/>
  </p>
  <p>
    <label for="shortname">简　　称</label>
    <input name="shortname" id="shortname" type="text"/>
  </p>
  <p>
    <label for="regtime">登记日期</label>
    <input name="regtime" id="regtime" type="text" readonly/>
  </p>
  <p>
    <label for="removetime">拆迁时间</label>
    <input name="removetime" id="removetime" type="text" readonly/>
  </p>
  <p>
    <label for="status">状　　态</label>
    <select name="status" id="status" >
      <option value="U">在用</option>
      <option value="X">注销</option>
    </select>
  </p>
  <p>
    <button id="btn_commit" >提　交</button>
    <button id="btn_reset" >重　置</button>
  </p>
</fieldset>
</div>
<div id="darkbannerwrap"> </div>
<script src="${APP_CONTEXT_PATH}/js/plot.js?ver=${APP_VER}" type="text/javascript" charset="utf-8"></script>
</body>
</html>