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
@Table(name = "T_CHSCON")
public class ChooseCon extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -6298190519001680402L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_CHSCON")
  @SequenceGenerator(name = "KG_CHSCON", sequenceName = "SEQ_CHSCON", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_PLAN", insertable = true, updatable = true)
  private ChoosePlan plan;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_CONTRACT", insertable = true, updatable = true)
  private Contract contract;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_NOTIFIEE", insertable = true, updatable = true)
  private Person notifiee;

  @Column(name = "C_CHSSEQ")
  private Integer seq;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_STATUS")
  private Status status = Status.N;

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

  public enum Status { // 择房人状态
    N, // 未择
    Y, // 已择
    X; // 放弃
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getPlanNo() {
    ChoosePlan p = getPlan();
    return (p == null) ? null : p.getNo();
  }

  public Integer getPlanBatch() {
    ChoosePlan p = getPlan();
    return (p == null) ? null : p.getBatch();
  }

  public ChoosePlan getPlan() {
    return (ChoosePlan) unproxy(plan);
  }

  public void setPlan(ChoosePlan plan) {
    this.plan = plan;
  }

  public String getHouseNo() {
    House h = getHouse();
    return (h == null) ? null : h.getNo();
  }

  public House getHouse() {
    Contract c = getContract();
    return (c == null) ? null : c.getHouse();
  }

  public String getContractNo() {
    Contract c = getContract();
    return (c == null) ? null : c.getNo();
  }

  public Contract getContract() {
    return (Contract) unproxy(contract);
  }

  public void setContract(Contract contract) {
    this.contract = contract;
  }

  public Person getNotifiee() {
    return (Person) unproxy(notifiee);
  }

  public void setNotifiee(Person notifiee) {
    this.notifiee = notifiee;
  }

  public Integer getSeq() {
    return seq;
  }

  public void setSeq(Integer seq) {
    this.seq = seq;
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
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", planNo=").append(getPlanNo())
        .append(", planBatch=").append(getPlanBatch()).append(", contractNo=").append(getContractNo()).append("}");
    return sb.toString();
  }

}
