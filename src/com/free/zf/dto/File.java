package com.free.zf.dto;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.free.util.CommonUtil;

@Entity
@Table(name = "T_FILE")
public class File extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -1704076043374227498L;

  @Id
  @Column(name = "C_ID")
  // @GeneratedValue (strategy = GenerationType.SEQUENCE, generator =
  // "KG_FILE")
  @SequenceGenerator(name = "KG_FILE", sequenceName = "SEQ_FILE", allocationSize = 1)
  private Integer id;

  @Column(name = "C_FILENAME")
  private String filename;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_DATELINE")
  private Calendar dateline;

  @Column(name = "C_CONTENT_TYPE")
  private String contentType;

  @Column(name = "C_HASH")
  private String hash;

  @Column(name = "C_SIZE")
  private Long size;

  public File() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getFilename() {
    return filename;
  }

  public void setFilename(String filename) {
    this.filename = filename;
  }

  public Calendar getDateline() {
    return dateline;
  }

  public void setDateline(Calendar dateline) {
    this.dateline = dateline;
  }

  public String getContentType() {
    return contentType;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }

  public String getHash() {
    return hash;
  }

  public void setHash(String hash) {
    this.hash = hash;
  }

  public Long getSize() {
    return size;
  }

  public void setSize(Long size) {
    this.size = size;
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", filename=").append(filename)
        .append(", dateline=").append(CommonUtil.formatCalendar("yyyy-MM-dd HH:mm:ss", dateline)).append("}");
    return sb.toString();
  }

}
