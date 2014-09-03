package com.free.zf.dto;

import java.io.Serializable;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "T_FORUM")
public class Forum extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -1358553649182065349L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_FORUM")
  @SequenceGenerator(name = "KG_FORUM", sequenceName = "SEQ_FORUM", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @Column(name = "C_NAME")
  private String name;

  @Column(name = "C_DESCRIPTION")
  private String description;

  @Column(name = "C_IDX")
  private Integer idx = 1;

  @Column(name = "CNT_TOPIC")
  private Integer cntTopic = 0;

  @Column(name = "CNT_POST")
  private Integer cntPost = 0;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "LAST_PID", insertable = true, updatable = true)
  private Post lastPost;

  public Forum() {
  }

  public Forum(String name, String description, Integer idx) {
    setName(name);
    setDescription(description);
    setIdx(idx);
  }

  public Forum(Integer id) {
    setId(id);
  }

  public Forum(Map<String, Object> d) {
    if (d.containsKey("id"))
      setId((Integer) d.get("id"));
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getIdx() {
    return idx;
  }

  public void setIdx(Integer idx) {
    this.idx = idx;
  }

  public Integer getCntTopic() {
    return cntTopic;
  }

  public void setCntTopic(Integer cntTopic) {
    this.cntTopic = cntTopic;
  }

  public Integer getCntPost() {
    return cntPost;
  }

  public void setCntPost(Integer cntPost) {
    this.cntPost = cntPost;
  }

  public Post getLastPost() {
    return lastPost;
  }

  public void setLastPost(Post lastPost) {
    this.lastPost = lastPost;
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", name=").append(name)
        .append(", description=").append(description).append("}");
    return sb.toString();
  }

}
