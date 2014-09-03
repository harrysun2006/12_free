package com.free.zf.service;

import java.io.IOException;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.Application;
import com.free.util.FileUtil;
import com.free.zf.dao.JpaDao;
import com.free.zf.dto.File;

@Service
public class FileService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  protected Integer nextId() {
    return dao.nextId(File.class);
  }

  public void add(File file) {
    file.setDateline(Calendar.getInstance());
    dao.add(file);
  }

  public File get(Integer id) {
    return dao.get(File.class, id);
  }

  public File getByHash(String hash) {
    List<File> l = dao.find(File.class, "select f from File f where f.hash = ?", hash);
    return l.size() > 0 ? l.get(0) : null;
  }

  public void delete(File file) {
    dao.delete(file);
  }

  public void delete(Integer id) {
    dao.delete(File.class, id);
  }

  public void download(File file, HttpServletResponse response) throws IOException {
    FileUtil.download(Application.UPLOAD_PATH + file.getFilename(), response);
  }

  public List<File> upload(HttpServletRequest request) throws Exception {
    List<File> r = new LinkedList<File>();
    FileUtil.upload(request, new Visitor(r));
    return r;
  }

  protected File newFile(java.io.File file, Integer id, String hash, String contentType) throws Exception {
    java.io.File u = new java.io.File(Application.UPLOAD_PATH);
    String up = u.getAbsolutePath();
    String fp = file.getAbsolutePath();
    String name = fp.startsWith(up) ? fp.substring(up.length()) : fp;
    FileService fs = Application.getBean(FileService.class);
    File f = new File();
    f.setId(id);
    f.setFilename(name); // 存储相对路径: 12\34\56\abc.ext
    f.setHash(hash);
    f.setContentType(contentType);
    f.setSize(file.length());
    fs.add(f);
    return f;
  }

  protected static final class Visitor implements FileUtil.Visitor {

    private List<File> files;

    public Visitor(List<File> files) {
      this.files = files;
    }

    public Integer id(String name) {
      FileService fs = Application.getBean(FileService.class);
      return fs.nextId();
    }

    // file.delete() issue: cannot delete even not referenced by any
    // stream!!!
    public void visit(Integer id, java.io.File file, String contentType, Map<String, Object> params) throws Exception {
      FileService fs = Application.getBean(FileService.class);
      String hash = FileUtil.md5(file);
      File f = fs.getByHash(hash);
      if (f == null)
        f = fs.newFile(file, id, hash, contentType);
      else if (!file.delete())
        file.deleteOnExit();
      files.add(f);
    }

  }
}
