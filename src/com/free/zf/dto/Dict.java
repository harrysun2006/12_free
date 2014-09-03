package com.free.zf.dto;

import java.io.Serializable;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "T_DICT")
public class Dict extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = 2500671198514304028L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_DICT")
  @SequenceGenerator(name = "KG_DICT", sequenceName = "SEQ_DICT", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_CAT")
  private Cat cat;

  @Column(name = "C_CODE")
  private String code;

  @Column(name = "C_TEXT")
  private String text;

  @Column(name = "C_IDX")
  private Integer idx = 1;

  public enum Cat { // 词典项目类别
    CERT_TYPE
  }

  public Dict() {
  }

  public void setAttributes(Map<String, Object> data) {
    if (data.containsKey("id"))
      setId((Integer) data.get("id"));
    if (data.containsKey("cat"))
      setCat(Cat.valueOf((String) data.get("cat")));
    if (data.containsKey("code"))
      setCode((String) data.get("code"));
    if (data.containsKey("text"))
      setText((String) data.get("text"));
    if (data.containsKey("idx"))
      setIdx((Integer) data.get("idx"));
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

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Integer getIdx() {
    return idx;
  }

  public void setIdx(Integer idx) {
    this.idx = idx;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", cat=").append(cat).append(", code=")
        .append(code).append(", text=").append(text).append("}");
    return sb.toString();
  }

}
