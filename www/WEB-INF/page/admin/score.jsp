<%@page contentType="text/html; charset=utf-8"%>
<div class="box boxc bold">评分表管理</div>
<div class="box boxc">
	<div class="icon-info">注意:所有新提交的改善将使用当时的默认评分表模板!</div>
	<div class="boxd" id="ap6_bar1"></div>
</div>
<div class="box boxc">
	<div class="left full"><table id="ap6_data"></table><div id="ap6_pager"></div></div>
</div>
<div class="box boxc">
	<div id="ap6_info" class="left blue"></div>
	<div class="boxd" id="ap6_bar2"></div>
</div>
<div id="tt_div" class="hide left">
	<div class="left tt_box">模板名称: <input id="tt_name" type="text">&nbsp;&nbsp;模板描述: <input id="tt_description" type="text"></div>
	<div class="left tt_box"><table id="tt_table"></table></div>
	<div class="left">
		<a id="tt_append" class="button enabled right" title="添加项目">添加</a>
		<a id="tt_delete" class="button enabled right" title="删除项目">删除</a>
		<a id="tt_up" class="button enabled right hide" title="上移项目">上移</a>
		<a id="tt_down" class="button enabled right hide" title="下移项目">下移</a>
	</div>
	<div class="right">
		<a id="tt_close" class="button enabled right">返回</a>
		<a id="tt_save" class="button enabled right">保存</a>
	</div>
</div>