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
@Table(name = "T_CHSLOG")
public class ChooseLog extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -983602272486339988L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_CHSLOG")
  @SequenceGenerator(name = "KG_CHSLOG", sequenceName = "SEQ_CHSLOG", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_PLAN", insertable = true, updatable = true)
  private ChoosePlan plan;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_HOUSE", insertable = true, updatable = true)
  private House house;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_CHSCON", insertable = true, updatable = true)
  private ChooseCon con;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_CHOOSER", insertable = true, updatable = true)
  private Person chooser;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_CHSTIME")
  private Calendar chooseTime;

  @Column(name = "C_CHSSEQ")
  private Integer seq;

  @Column(name = "C_SEQCHGJUS")
  private String just;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_STATUS")
  private Status status = Status.N;

  @Column(name = "C_MEMO")
  private String memo;

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
    return (House) unproxy(house);
  }

  public void setHouse(House house) {
    this.house = house;
  }

  public String getOldHouseNo() {
    House h = getOldHouse();
    return (h == null) ? null : h.getNo();
  }

  public House getOldHouse() {
    Contract c = getContract();
    return (c == null) ? null : c.getHouse();
  }

  public String getContractNo() {
    Contract c = getContract();
    return (c == null) ? null : c.getNo();
  }

  public Contract getContract() {
    ChooseCon c = getCon();
    return (c == null) ? null : c.getContract();
  }

  public ChooseCon getCon() {
    return (ChooseCon) unproxy(con);
  }

  public void setCon(ChooseCon con) {
    this.con = con;
  }

  public Person getChooser() {
    return (Person) unproxy(chooser);
  }

  public void setChooser(Person chooser) {
    this.chooser = chooser;
  }

  public Calendar getChooseTime() {
    return chooseTime;
  }

  public void setChooseTime(Calendar chooseTime) {
    this.chooseTime = chooseTime;
  }

  public String getJust() {
    return just;
  }

  public void setJust(String just) {
    this.just = just;
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

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", planNo=").append(getPlanNo())
        .append(", planBatch=").append(getPlanBatch()).append(", contractNo=").append(getContractNo()).append("}");
    return sb.toString();
  }

}
