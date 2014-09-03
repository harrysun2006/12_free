<%@page contentType="text/html; charset=utf-8"%>
<jsp:include page="include/meta.jsp" />
<body id="profile">
<jsp:include page="include/header.jsp" />
<div id="content">
	<div class="mid">
		<div class="box box8">
			<div class="left w200">姓名:&nbsp;<span id="pp_name"></span></div>
			<div class="left w200">工号:&nbsp;<span id="pp_pernr"></span></div>
			<div class="left w200">职务:&nbsp;<span id="pp_duty"></span></div>
			<div class="left wmax">部门:&nbsp;<span id="pp_depart"></span></div>
			<div class="left wmax">部门领导:&nbsp;<span id="pp_lead"></span></div>
			<div class="clear"></div>
			<div class="left w200">积分:&nbsp;<span id="pp_karma"></span></div>
			<div class="left w200">提案数量:&nbsp;<span id="pp_cntJob"></span></div>
			<div class="left w200">改善数量:&nbsp;<span id="pp_cntAction"></span></div>
			<div class="left w200">话题数量:&nbsp;<span id="pp_cntTopic"></span></div>
			<div class="left w200">发帖数量:&nbsp;<span id="pp_cntPost"></span></div>
		</div>
		<div id="pp_total" class="left total">积分详细清单</div>
		<div class="left full"><table id="pp_data"></table><div id="pp_pager"></div></div>
	</div>
</div>
<jsp:include page="include/footer.jsp" />
<jsp:include page="include/tool.jsp" />
<script src="${APP_CONTEXT_PATH}/js/profile.js?ver=${APP_VER}" type="text/javascript" charset="utf-8"></script>
</body>
</html>