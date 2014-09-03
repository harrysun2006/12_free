package com.free.zf.dto;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "T_CONFIG")
public class Config extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = 1354152523558672152L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_CONFIG")
  @SequenceGenerator(name = "KG_CONFIG", sequenceName = "SEQ_CONFIG", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Column(name = "C_NAME")
  private String name;

  @Column(name = "C_DESCRIPTION")
  private String description;

  @Column(name = "C_HINT")
  private String hint;

  @Column(name = "C_VALUE")
  private String value;

  @Column(name = "C_READONLY")
  private Integer readOnly = 0;

  @Transient
  private Map<String, Object> extra = new HashMap<String, Object>();

  public Config() {
  }

  public Config(String name) {
    this(name, "", "", false);
  }

  public Config(String name, String value) {
    this(name, value, "", false);
  }

  public Config(String name, String value, String description) {
    this(name, value, description, false);
  }

  public Config(String name, String value, String description, boolean readOnly) {
    this(name, value, description, "", false);
  }

  public Config(String name, String value, String description, String hint, boolean readOnly) {
    setName(name);
    setValue(value);
    setDescription(description);
    setHint(hint);
    setReadOnly(readOnly);
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getHint() {
    return hint;
  }

  public void setHint(String hint) {
    this.hint = hint;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public boolean isReadOnly() {
    return readOnly != null && readOnly == 1;
  }

  public void setReadOnly(boolean readOnly) {
    this.readOnly = readOnly ? 1 : 0;
  }

  public Map<String, Object> getExtra() {
    return extra;
  }

  public void setExtra(Map<String, Object> extra) {
    this.extra = extra;
  }

  public void addExtra(String name, Object value) {
    extra.put(name, value);
  }

  public void removeExtra(String name) {
    extra.remove(name);
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", name=").append(name)
        .append(", value=").append(value).append("}");
    return sb.toString();
  }

}
