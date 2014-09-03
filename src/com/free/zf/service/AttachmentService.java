package com.free.zf.service;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.Application;
import com.free.exception.CommonRuntimeException;
import com.free.util.CommonUtil;
import com.free.util.FileUtil;
import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Attachment;
import com.free.zf.dto.File;
import com.free.zf.dto.Attachment.Cat;

@Service
public class AttachmentService {

  @Autowired
  @Qualifier("daoZF")
  protected JpaDao dao;

  public Integer nextId() {
    return dao.nextId(Attachment.class);
  }

  public void add(Attachment att) {
    dao.add(att);
  }

  public void deleteByOwner(Attachment.Cat cat, Integer owner) {
    String hql = "delete from Attachment att where att.cat = ? and att.owner = ?";
    dao.execute(hql, new Object[] { cat, owner });
  }

  public List<Attachment> list(Attachment.Cat cat, Integer owner) {
    return (owner == null || owner == 0) ? null : dao.find(Attachment.class,
        "select att from Attachment att left join fetch att.file where att.cat = ? and att.owner = ?", cat, owner);
  }

  public Attachment get(Integer id) {
    List<Attachment> l = dao.find(Attachment.class,
        "select att from Attachment att left join fetch att.file where att.id = ?", id);
    return l.size() > 0 ? l.get(0) : null;
  }

  public void delete(Attachment att) {
    dao.delete(att);
  }

  public void delete(Integer id) {
    dao.delete(Attachment.class, id);
  }

  public void download(Attachment att, HttpServletResponse response) throws IOException {
    FileUtil.download(Application.UPLOAD_PATH + att.getFile().getFilename(), response);
  }

  public List<Attachment> upload(HttpServletRequest request) throws Exception {
    List<Attachment> r = new LinkedList<Attachment>();
    FileUtil.upload(request, new Visitor(r));
    return r;
  }

  public boolean exists(String cat, Integer owner, Integer fid, String name) {
    List<Attachment> l = dao.find(Attachment.class,
        "select att from Attachment att where att.cat = ? and att.owner = ? and att.file.id = ?", Cat.valueOf(cat),
        owner, fid);
    return l.size() > 0;
  }

  protected static final class Visitor implements FileUtil.Visitor {

    private List<Attachment> atts;

    public Visitor(List<Attachment> atts) {
      this.atts = atts;
    }

    public Integer id(String name) {
      FileService fs = Application.getBean(FileService.class);
      return fs.nextId();
    }

    public void visit(Integer id, java.io.File file, String contentType, Map<String, Object> params) throws Exception {
      AttachmentService as = Application.getBean(AttachmentService.class);
      FileService fs = Application.getBean(FileService.class);
      String hash = FileUtil.md5(file);
      String cat = (String) params.get("cat");
      Integer owner = CommonUtil.getInteger((String) params.get("owner"), 0);
      File f = fs.getByHash(hash);
      if (f == null) {
        f = fs.newFile(file, id, hash, contentType);
      } else if (as.exists(cat, owner, f.getId(), file.getName())) {
        throw new CommonRuntimeException("已经上传了相同的附件!");
      } else {
        if (!file.delete())
          file.deleteOnExit();
      }
      Attachment att = new Attachment();
      att.setFile(f);
      att.setCat(Cat.valueOf(cat));
      att.setOwner(owner);
      att.setIdx(CommonUtil.getInteger((String) params.get("idx"), 1));
      att.setName(params.containsKey("name") ? (String) params.get("name") : file.getName());
      as.add(att);
      atts.add(att);
    }

  }
}
