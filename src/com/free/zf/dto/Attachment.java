package com.free.zf.dto;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "T_ATTACHMENT")
public class Attachment extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = 2269714776949306158L;

  @Id
  @Column(name = "C_ID")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_ATTACHMENT")
  @SequenceGenerator(name = "KG_ATTACHMENT", sequenceName = "SEQ_ATTACHMENT", allocationSize = 1)
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_CAT")
  private Cat cat;

  @Column(name = "C_OWNER")
  private Integer owner;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "FILE_ID", insertable = true, updatable = true)
  private File file;

  @Column(name = "C_NAME")
  private String name;

  @Column(name = "C_IDX")
  private Integer idx = 1;

  public enum Cat { // 附件属主类型
    JOB, ACT, TOPIC, POST, NOTICE
  }

  public Attachment() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Cat getCat() {
    return cat;
  }

  public void setCat(Cat cat) {
    this.cat = cat;
  }

  public Integer getOwner() {
    return owner;
  }

  public void setOwner(Integer owner) {
    this.owner = owner;
  }

  public Integer getFileId() {
    File file = getFile();
    return file == null ? null : file.getId();
  }

  public String getFilename() {
    File file = getFile();
    return file == null ? null : file.getFilename();
  }

  public String getContentType() {
    File file = getFile();
    return file == null ? null : file.getContentType();
  }

  public File getFile() {
    return (File) unproxy(file);
  }

  public void setFile(File file) {
    this.file = file;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getIdx() {
    return idx;
  }

  public void setIdx(Integer idx) {
    this.idx = idx;
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", cat=").append(cat)
        .append(", owner=").append(owner).append(", name=").append(name).append("}");
    return sb.toString();
  }

}
