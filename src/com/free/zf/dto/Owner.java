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
@Table(name = "T_OWNER")
public class Owner extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -2099394587187404287L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_OWNER")
  @SequenceGenerator(name = "KG_OWNER", sequenceName = "SEQ_OWNER", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_HOUSE", insertable = true, updatable = true)
  private House house;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_PERSON", insertable = true, updatable = true)
  private Person person;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_TYPE")
  private Type type = Type.P;

  @Column(name = "C_MEMO")
  private String memo;

  public enum Type { // 房主类型
    P, // 第一房主
    O, // 其他共有房主
    X; // 无效
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
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

  public String getPersonName() {
    Person p = getPerson();
    return (p == null) ? null : p.getName();
  }

  public Person getPerson() {
    return (Person) unproxy(person);
  }

  public void setPerson(Person person) {
    this.person = person;
  }

  public Type getType() {
    return type;
  }

  public void setType(Type type) {
    this.type = type;
  }

  public String getMemo() {
    return memo;
  }

  public void setMemo(String memo) {
    this.memo = memo;
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", person=").append(getPersonName())
        .append(", house=").append(getHouseNo()).append("}");
    return sb.toString();
  }

}
