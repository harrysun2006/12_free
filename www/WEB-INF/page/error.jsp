<%@page contentType="text/html; charset=utf-8"%>
<jsp:include page="include/meta.jsp" />
<body id="error">
<script type="text/javascript">
$(function() {
  window.close();
  if (opener && opener._error) opener._error(${ERROR});
  else _alert(${ERROR});
});
</script>
</body>
</html>
