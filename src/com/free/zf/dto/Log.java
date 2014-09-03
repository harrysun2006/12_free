package com.free.zf.dto;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "T_LOG")
public class Log extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -8565772966861392208L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_LOG")
  @SequenceGenerator(name = "KG_LOG", sequenceName = "SEQ_LOG", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_DATELINE")
  private Calendar dateline;

  @Column(name = "C_CLASS")
  private String clazz;

  @Column(name = "C_METHOD")
  private String method;

  @Column(name = "C_LINE")
  private String line;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_LEVEL")
  private Level level = Level.INFO;

  @Column(name = "C_UID", insertable = true, updatable = true)
  private Integer uid;

  @Column(name = "C_ENTITY")
  private Integer entity;

  @Column(name = "C_CONTENT")
  private String content;

  @Lob
  @Column(name = "C_STACK")
  private String stack;

  public enum Level { // 日志级别
    NONE, OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, ALL
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Calendar getDateline() {
    return dateline;
  }

  public void setDateline(Calendar dateline) {
    this.dateline = dateline;
  }

  public String getClazz() {
    return clazz;
  }

  public void setClazz(String clazz) {
    this.clazz = clazz;
  }

  public String getMethod() {
    return method;
  }

  public void setMethod(String method) {
    this.method = method;
  }

  public String getLine() {
    return line;
  }

  public void setLine(String line) {
    this.line = line;
  }

  public Level getLevel() {
    return level;
  }

  public void setLevel(Level level) {
    this.level = level;
  }

  public Integer getUid() {
    return uid;
  }

  public void setUid(Integer uid) {
    this.uid = uid;
  }

  public Integer getEntity() {
    return entity;
  }

  public void setEntity(Integer entity) {
    this.entity = entity;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getStack() {
    return stack;
  }

  public void setStack(String stack) {
    this.stack = stack;
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", clazz=").append(clazz)
        .append(", method=").append(method).append(", line=").append(line).append("}");
    return sb.toString();
  }

}
