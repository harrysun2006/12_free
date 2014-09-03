package com.free.zf.dto;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "T_PROFILE")
public class Profile extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = 3317605644770241776L;

  @Id
  @OneToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_USER", insertable = true, updatable = true)
  private User user;

  @Lob
  @Column(name = "C_PROFILE")
  private String profile;

  @Lob
  @Column(name = "C_PHOTO")
  private byte[] photo;

  public Profile() {
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getProfile() {
    return profile;
  }

  public void setProfile(String profile) {
    this.profile = profile;
  }

  public byte[] getPhoto() {
    return photo;
  }

  public void setPhoto(byte[] photo) {
    this.photo = photo;
  }

}
