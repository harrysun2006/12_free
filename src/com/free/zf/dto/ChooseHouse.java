package com.free.zf.dto;

import java.io.Serializable;

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

@Entity
@Table(name = "T_CHSHOUSE")
public class ChooseHouse extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -1162650389058874922L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_CHSHOUSE")
  @SequenceGenerator(name = "KG_CHSHOUSE", sequenceName = "SEQ_CHSHOUSE", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Column(name = "C_PLANNO")
  private String planNo;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_HOUSE", insertable = true, updatable = true)
  private House house;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_CHSCON", insertable = true, updatable = true)
  private ChooseCon con;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_STATUS")
  private Status status = Status.N;

  @Column(name = "C_MEMO")
  private String memo;

  public enum Status { // 择房状态
    N, // 未被择
    Y; // 已被择
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getPlanNo() {
    return planNo;
  }

  public void setPlanNo(String planNo) {
    this.planNo = planNo;
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

  public ChooseCon getCon() {
    return (ChooseCon) unproxy(con);
  }

  public void setCon(ChooseCon con) {
    this.con = con;
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
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", planNo=").append(planNo)
        .append(", houseNo=").append(getHouseNo()).append("}");
    return sb.toString();
  }

}
