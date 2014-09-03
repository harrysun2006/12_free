<%@page contentType="text/html; charset=utf-8"%>
<jsp:include page="include/meta.jsp" />
<body id="bbs">
<jsp:include page="include/header.jsp" />
<div id="content">
	<div class="mid">
		<div id="bbs_forum"></div>
		<div id="bbs_topic"><table id="tt_data"></table><div id="tt_pager"></div></div>
	</div>
</div>
<jsp:include page="include/footer.jsp" />
<jsp:include page="include/tool.jsp" />
<jsp:include page="include/info.jsp" />
<script src="${APP_CONTEXT_PATH}/js/bbs.js?ver=${APP_VER}" type="text/javascript" charset="utf-8"></script>
</body>
</html>