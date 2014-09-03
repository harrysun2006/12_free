package com.free.zf.dto;

import java.io.Serializable;
import java.util.Calendar;

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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "T_BLDTYPE")
public class BuildType extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = 4756719184177253884L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_BLDTYPE")
  @SequenceGenerator(name = "KG_BLDTYPE", sequenceName = "SEQ_BLDTYPE", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Column(name = "C_NO")
  private String no;

  @Column(name = "C_NAME")
  private String name;

  @Column(name = "C_SHORTNAME")
  private String shortName;

  @Column(name = "C_IDX")
  private Double idx = 0d;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_STATUS")
  private Status status = Status.U;

  @Column(name = "C_MEMO")
  private String memo;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_CREATOR", insertable = true, updatable = true)
  private User creator;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_CREATETIME")
  private Calendar createTime;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_UPDATOR", insertable = true, updatable = true)
  private User updator;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_UPDATETIME")
  private Calendar updateTime;

  public enum Status { // 状态
    U, // 在用
    X; // 已注销
  }

  public BuildType() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getNo() {
    return no;
  }

  public void setNo(String no) {
    this.no = no;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getShortName() {
    return shortName;
  }

  public void setShortName(String shortName) {
    this.shortName = shortName;
  }

  public Double getIdx() {
    return idx;
  }

  public void setIdx(Double idx) {
    this.idx = idx;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public String getMemo() {
    return memo;
  }

  public void setMemo(String memo) {
    this.memo = memo;
  }

  public User getCreator() {
    return (User) unproxy(creator);
  }

  public void setCreator(User creator) {
    this.creator = creator;
  }

  public Calendar getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Calendar createTime) {
    this.createTime = createTime;
  }

  public User getUpdator() {
    return (User) unproxy(updator);
  }

  public void setUpdator(User updator) {
    this.updator = updator;
  }

  public Calendar getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Calendar updateTime) {
    this.updateTime = updateTime;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", name=").append(name).append("}");
    return sb.toString();
  }

}
