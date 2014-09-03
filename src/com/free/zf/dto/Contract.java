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
@Table(name = "T_CONTRACT")
public class Contract extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -2879122918311056213L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_CONTRACT")
  @SequenceGenerator(name = "KG_CONTRACT", sequenceName = "SEQ_CONTRACT", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Column(name = "C_NO")
  private String no;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_SIGNTIME")
  private Calendar signTime;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_SIGNER", insertable = true, updatable = true)
  private Person signer;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_HOUSE", insertable = true, updatable = true)
  private House house;

  @Column(name = "C_AREA")
  private Double area;

  @Column(name = "C_COUNT")
  private Integer count;

  @Column(name = "C_FINCOUNT")
  private Integer finCount;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_CHSPLAN", insertable = true, updatable = true)
  private ChoosePlan plan;

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

  public enum Status { // 合同状态
    U, // 有效
    X; // 失效
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

  public Calendar getSignTime() {
    return signTime;
  }

  public void setSignTime(Calendar signTime) {
    this.signTime = signTime;
  }

  public Person getSigner() {
    return (Person) unproxy(signer);
  }

  public void setSigner(Person signer) {
    this.signer = signer;
  }

  public House getHouse() {
    return (House) unproxy(house);
  }

  public void setHouse(House house) {
    this.house = house;
  }

  public Double getArea() {
    return area;
  }

  public void setArea(Double area) {
    this.area = area;
  }

  public Integer getCount() {
    return count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }

  public Integer getFinCount() {
    return finCount;
  }

  public void setFinCount(Integer finCount) {
    this.finCount = finCount;
  }

  public ChoosePlan getPlan() {
    return (ChoosePlan) unproxy(plan);
  }

  public void setPlan(ChoosePlan plan) {
    this.plan = plan;
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
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", no=").append(no).append(", signer=")
        .append(signer).append("}");
    return sb.toString();
  }

}
