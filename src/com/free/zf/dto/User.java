package com.free.zf.dto;

import java.io.Serializable;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 * JPA & Hibernate查询部分字段 Hibernate的方法: setResultTransformer, addEntity,
 * setEntity, select new DTO(...) JPA的方法:
 * 
 * @NamedNativeQuery+@SqlResultSetMapping, select new DTO(...) 在Hibernate3.6.6/4.1.1使用@SqlResultSetMapping时,
 * 必须在@NamedNativeQuery的query中包含所有类的属性, 否则抛错: invalid column name!!! 
 * 参见https://hibernate.onjira.com/browse/HHH-4169
 * OpenJPA not usable! JPA学习笔记: http://hi.baidu.com/ericwanghx/blog/item/6befd118efbfc6e1af5133ac.html 
 * JPA Native Query & SqlResultSetMappings: http://www.diybl.com/course/3_program/java/javajs/20090917/175630.htm l
 */
@NamedQueries({ @NamedQuery(name = "Dict.All", query = "SELECT d FROM Dict d ORDER BY d.cat, d.idx"),
    @NamedQuery(name = "Dict.Cat", query = "SELECT d FROM Dict d WHERE d.cat = :cat ORDER BY d.idx") })
@NamedNativeQueries({ @NamedNativeQuery(name = "Topic.ListNoContent", query = "SELECT C_ID, C_TITLE FROM T_TOPIC ", resultSetMapping = "Topic.ListNoContent") })
@SqlResultSetMappings({ @SqlResultSetMapping(name = "Topic.ListNoContent", entities = { @EntityResult(entityClass = Topic.class) }) })
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
@Table(name = "T_USER")
public class User extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = 8401804100785453379L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_USER")
  @SequenceGenerator(name = "KG_USER", sequenceName = "SEQ_USER", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Column(name = "C_USERNAME")
  private String username;

  @Column(name = "C_PASSWORD")
  private String password;

  @Column(name = "C_SALT")
  private String salt;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_PERSON", insertable = true, updatable = true)
  private Person person;

  @Column(name = "C_NICKNAME")
  private String nickname;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_LASTLOGIN")
  private Calendar lastLogin;

  @Column(name = "C_LASTLOGINIP")
  private String lastLoginIp;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_STATUS")
  private Status status = Status.U;

  public enum Status { // 状态
    U, // 在用
    X; // 已注销
  }

  @Transient
  private Set<String> roles = new HashSet<String>();

  public User() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getSalt() {
    return salt;
  }

  public void setSalt(String salt) {
    this.salt = salt;
  }

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public Calendar getLastLogin() {
    return lastLogin;
  }

  public void setLastLogin(Calendar lastLogin) {
    this.lastLogin = lastLogin;
  }

  public String getLastLoginIp() {
    return lastLoginIp;
  }

  public void setLastLoginIp(String lastLoginIp) {
    this.lastLoginIp = lastLoginIp;
  }

  public Set<String> getRoles() {
    return roles;
  }

  public void setRoles(Set<String> roles) {
    this.roles = roles;
  }

  public void addRole(String role) {
    roles.add(role);
  }

  public void removeRole(String role) {
    roles.remove(role);
  }

  public void clearRoles() {
    roles.clear();
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", username=").append(username)
        .append("}");
    return sb.toString();
  }

}
