package com.free.zf.ajax;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.free.Application;
import com.free.util.FileUtil;
import com.free.util.JSONUtil;
import com.free.zf.dto.File;
import com.free.zf.service.FileService;

@Controller
public class FileController {

  @RequestMapping(value = "/upload", method = RequestMethod.POST)
  protected void upload(HttpServletRequest request, HttpServletResponse response) throws Exception {
    Map<String, Object> r = new HashMap<String, Object>();
    FileService fs = Application.getBean(FileService.class);
    try {
      List<File> files = fs.upload(request);
      r.put("files", files);
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

  @RequestMapping(value = "/download", method = { RequestMethod.GET, RequestMethod.POST })
  protected void download(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Integer id = Integer.parseInt(request.getParameter("id"));
    FileService fs = Application.getBean(FileService.class);
    File file = fs.get(id);
    FileUtil.download(Application.UPLOAD_PATH + file.getFilename(), response);
  }

  @RequestMapping(value = "/image", method = { RequestMethod.GET, RequestMethod.POST })
  protected void image(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Integer id = Integer.parseInt(request.getParameter("id"));
    FileService fs = Application.getBean(FileService.class);
    File file = fs.get(id);
    FileUtil.image(Application.UPLOAD_PATH + file.getFilename(), response);
  }
}
