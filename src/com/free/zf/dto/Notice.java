package com.free.zf.dto;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Map;

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
@Table(name = "T_NOTICE")
public class Notice extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -8325532050870748758L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_NOTICE")
  @SequenceGenerator(name = "KG_NOTICE", sequenceName = "SEQ_NOTICE", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_CAT")
  private Cat cat = Cat.PUBLIC;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_DATELINE")
  private Calendar dateline;

  @Column(name = "C_SENDER")
  private String sender;

  @Column(name = "C_RECEIVER")
  private String receiver;

  @Column(name = "C_TITLE")
  private String title;

  @Lob
  @Column(name = "C_CONTENT")
  private String content;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_FLAG")
  private Flag flag = Flag.NORMAL;

  @Column(name = "C_IDX")
  private Integer idx = 1;

  public enum Cat {
    PUBLIC, // 公告
    PRIV; // 私信
  }

  public enum Flag {
    NORMAL, DELETE;
  }

  public Notice() {
  }

  public Notice(Integer id) {
    setId(id);
  }

  public Notice(Integer id, Cat cat, Calendar dateline, String sender, String receiver, String title, Flag flag,
      Integer idx) {
    this(id, cat, dateline, sender, receiver, title, flag, idx, null);
  }

  public Notice(Integer id, Cat cat, Calendar dateline, String sender, String receiver, String title, Flag flag,
      Integer idx, String content) {
    setId(id);
    setCat(cat);
    setDateline(dateline);
    setSender(sender);
    setReceiver(receiver);
    setTitle(title);
    setFlag(flag);
    setIdx(idx);
    setContent(content);
  }

  public Notice(Map<String, Object> d) {
    if (d.containsKey("id"))
      setId((Integer) d.get("id"));
    if (d.containsKey("cat"))
      setCat(Cat.valueOf((String) d.get("cat")));
    if (d.containsKey("flag"))
      setFlag(Flag.valueOf((String) d.get("flag")));
    if (d.containsKey("title"))
      setTitle((String) d.get("title"));
    if (d.containsKey("content"))
      setContent((String) d.get("content"));
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

  public Calendar getDateline() {
    return dateline;
  }

  public void setDateline(Calendar dateline) {
    this.dateline = dateline;
  }

  public String getSender() {
    return sender;
  }

  public void setSender(String sender) {
    this.sender = sender;
  }

  public String getReceiver() {
    return receiver;
  }

  public void setReceiver(String receiver) {
    this.receiver = receiver;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Flag getFlag() {
    return flag;
  }

  public void setFlag(Flag flag) {
    this.flag = flag;
  }

  public Integer getIdx() {
    return idx;
  }

  public void setIdx(Integer idx) {
    this.idx = idx;
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", title=").append(title)
        .append(", cat=").append(cat).append("}");
    return sb.toString();
  }
}
