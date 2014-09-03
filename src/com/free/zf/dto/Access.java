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
@Table(name = "T_ACCESS")
public class Access extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = 2985673508884125276L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_ACCESS")
  @SequenceGenerator(name = "KG_ACCESS", sequenceName = "SEQ_ACCESS", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_USER", insertable = true, updatable = true)
  private User user;

  
  @Enumerated(EnumType.STRING)
  @Column(name = "C_ROLE")
  private Role role = Role.none;

  public enum Role { // 角色
    admin, // 管理员，不能操作，只能管理系统
    poweruser, // 高级用户，可以更改择房顺序
    worker, // 操作用户
    view, // 查看
    none; // N/A

  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

 public String getUsername() {
     User u = getUser();
   return (u == null) ? null : u.getUsername();
  }
 
  public User getUser() {
    return (User) unproxy(user);
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", user=").append(getUsername())
        .append(", role=").append(getRole()).append("}");
    return sb.toString();
  }

}
