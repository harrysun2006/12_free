package com.free.zf.ajax;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.free.Application;
import com.free.util.FileUtil;
import com.free.util.JSONUtil;
import com.free.zf.dto.Attachment;
import com.free.zf.service.AttachmentService;

@Controller
@RequestMapping(value = "/attach")
public class AttachmentController {

  /**
   * 1. 客户端上传一般有2种方法(使用Ajax Upload组件, http://github.com/valums/file-uploader) -
   * multipart/form-data: 隐藏iframe + form提交, UploadHandlerForm -
   * XHR(application/octect-stream): IE不支持, FF/Chrome支持, UploadHandlerXhr 2.
   * 服务器端上传组件一般有commons-fileupload(需要commons-io), cos, SmartFileUpload 性能比较:
   * http://blog.csdn.net/shohokuf/article/details/2793973 cos使用比较简单,
   * 可以使用FileRenamePolicy重命名; commons-fileupload, 设置好参数后性能应该不比cos差;
   * SmartFileUpload评价较差, 不考虑. 3. 服务器端需要注意: - multipart/form-data和XHR2种请求的支持 -
   * 不要使用@ResponseBody(application/json)返回类型, IE下使用的是form请求,
   * 而非XmlHttpRequest(Ajax); IE不支持application/json格式(提示下载), 程序返回text/html类型,
   * 内容为JSON格式字符串; 返回的JSON格式字符串由Ajax Upload组件负责解析后回调.
   * 
   * @param request
   * @param response
   * @return
   */
  @RequestMapping(value = "/upload", method = RequestMethod.POST)
  protected void upload(HttpServletRequest request, HttpServletResponse response) throws Exception {
    Map<String, Object> r = new HashMap<String, Object>();
    AttachmentService as = Application.getBean(AttachmentService.class);
    try {
      List<Attachment> atts = as.upload(request);
      r.put("atts", atts);
    } catch (SizeLimitExceededException slee) {
      r.put("error", "size.limit.exceeded");
    } catch (Exception e) {
      r.put("error", e.getMessage());
      // throw new CommonRuntimeException(e);
    }
    String s = JSONUtil.getJSON(r);
    response.setContentType("text/html");
    Writer out = response.getWriter();
    out.write(s);
    out.flush();
    out.close();
  }

  // 这个方法未拦截到请求!!(http://starscream.iteye.com/blog/1067605)
  @RequestMapping(value = "/uploadx", method = RequestMethod.POST)
  protected String uploadx(@RequestParam("name") String name, @RequestParam("file") MultipartFile file,
      HttpSession session) {
    if (!file.isEmpty()) {
      System.out.println(file.getName());
    }
    return "Hello World";
  }

  @RequestMapping(value = "/download", method = { RequestMethod.GET, RequestMethod.POST })
  protected void download(HttpServletRequest request, HttpServletResponse response) throws IOException {
    try {
      Integer id = Integer.parseInt(request.getParameter("id"));
      AttachmentService as = Application.getBean(AttachmentService.class);
      Attachment att = as.get(id);
      FileUtil.download(Application.UPLOAD_PATH + att.getFilename(), response, att.getContentType());
    } catch (Exception e1) {
      try {
        request.setAttribute("error", e1.getMessage());
        request.getRequestDispatcher("/error").forward(request, response);
      } catch (Exception e2) {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        response.getOutputStream().println(e1.getMessage());
        response.getOutputStream().close();
      }
    }
  }

  @RequestMapping(value = "/delete", method = RequestMethod.POST)
  protected @ResponseBody
  Map<String, Object> delete(HttpEntity<Attachment> entity) {
    Map<String, Object> r = new HashMap<String, Object>();
    Attachment att = entity.getBody();
    AttachmentService as = Application.getBean(AttachmentService.class);
    att = as.get(att.getId());
    if (att == null) {
      r.put("error", "att.null");
    } else {
      // as.delete(att.getId());
      r.put("error", 0);
    }
    return r;
  }
}
