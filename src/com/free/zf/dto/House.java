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
@Table(name = "T_HOUSE")
public class House extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = 2098916819103236732L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_HOUSE")
  @SequenceGenerator(name = "KG_HOUSE", sequenceName = "SEQ_HOUSE", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Column(name = "C_NO")
  private String no;

  @Column(name = "C_REGNO")
  private String regNo;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_TYPE")
  private Type type = null;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_GARDEN", insertable = true, updatable = true)
  private Garden garden;

  @Column(name = "C_FLAT")
  private String flat;

  @Column(name = "C_FLOOR")
  private String floor;

  @Column(name = "C_ROOM")
  private String room;

  @Column(name = "C_AREA")
  private Double area;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_BLDTYPE", insertable = true, updatable = true)
  private BuildType buildType;

  @Column(name = "C_CONPLAN")
  private String conPlan;

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

  public enum Type { // 房屋类型
    N, // 新房
    O, // 旧房
    C, // 汽车库
    B; // 自行车库
  }

  public enum Status { // 状态
    U, // 在用
    X; // 已注销
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

  public String getRegNo() {
    return regNo;
  }

  public void setRegNo(String regNo) {
    this.regNo = regNo;
  }

  public Type getType() {
    return type;
  }

  public void setType(Type type) {
    this.type = type;
  }

  public Garden getGarden() {
    return (Garden) unproxy(garden);
  }

  public void setGarden(Garden garden) {
    this.garden = garden;
  }

  public String getFlat() {
    return flat;
  }

  public void setFlat(String flat) {
    this.flat = flat;
  }

  public String getFloor() {
    return floor;
  }

  public void setFloor(String floor) {
    this.floor = floor;
  }

  public String getRoom() {
    return room;
  }

  public void setRoom(String room) {
    this.room = room;
  }

  public Double getArea() {
    return area;
  }

  public void setArea(Double area) {
    this.area = area;
  }

  public BuildType getBuildType() {
    return (BuildType) unproxy(buildType);
  }

  public void setBuildType(BuildType buildType) {
    this.buildType = buildType;
  }

  public String getConPlan() {
    return conPlan;
  }

  public void setConPlan(String conPlan) {
    this.conPlan = conPlan;
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

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", no=").append(no).append(", regNo=")
        .append(regNo).append("}");
    return sb.toString();
  }

}
