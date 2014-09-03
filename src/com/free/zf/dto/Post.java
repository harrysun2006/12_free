package com.free.zf.dto;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Map;

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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonManagedReference;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
@Table(name = "T_POST")
public class Post extends AnnotatedEntity implements Serializable {

  private static final long serialVersionUID = -3255191824956188296L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KG_POST")
  @SequenceGenerator(name = "KG_POST", sequenceName = "SEQ_POST", allocationSize = 1)
  @Column(name = "C_ID")
  private Integer id;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "TOPIC_ID", insertable = true, updatable = true)
  private Topic topic;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "FORUM_ID", insertable = true, updatable = true)
  private Forum forum;

  @ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
  @JoinColumn(name = "C_CREATOR", insertable = true, updatable = true)
  private User creator;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "C_DATELINE")
  private Calendar dateline;

  @Column(name = "C_IP")
  private String ip;

  @Lob
  @Column(name = "C_CONTENT")
  private String content;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_FLAG")
  private Flag flag = Flag.H;

  @Enumerated(EnumType.STRING)
  @Column(name = "C_STATUS")
  private Status status = Status.N;

  @Column(name = "C_UP")
  private Integer up = 0;

  @Column(name = "C_DOWN")
  private Integer down = 0;

  @Column(name = "IS_TOP")
  private Integer top = 0;

  public enum Flag { // 编码类型
    B, // BBCode
    H, // HTML
    S, // Smile
  }

  public enum Status { // 帖子状态
    N, // 正常
    C, // 关闭
    D, // 删除
  }

  public Post() {
  }

  @SuppressWarnings("unchecked")
  public Post(Map<String, Object> d) {
    if (d.containsKey("id"))
      setId((Integer) d.get("id"));
    if (d.containsKey("content"))
      setContent((String) d.get("content"));
    if (d.containsKey("topic"))
      setTopic(new Topic((Map<String, Object>) d.get("topic")));
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getTopicId() {
    Topic topic = getTopic();
    return topic == null ? null : topic.getId();
  }

  @JsonManagedReference
  public Topic getTopic() {
    return (Topic) unproxy(topic);
  }

  public void setTopic(Topic topic) {
    this.topic = topic;
    setForum(topic.getForum());
  }

  public Integer getForumId() {
    Forum forum = getForum();
    return forum == null ? null : forum.getId();
  }

  public Forum getForum() {
    return (Forum) unproxy(forum);
  }

  public void setForum(Forum forum) {
    this.forum = forum;
  }

  public User getCreator() {
    return (User) unproxy(creator);
  }

  public void setCreator(User creator) {
    this.creator = creator;
  }

  public Calendar getDateline() {
    return dateline;
  }

  public void setDateline(Calendar dateline) {
    this.dateline = dateline;
  }

  public String getIp() {
    return ip;
  }

  public void setIp(String ip) {
    this.ip = ip;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Flag getFlag() {
    return flag;
  }

  public void setFlag(Flag flag) {
    this.flag = flag;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public Integer getUp() {
    return up;
  }

  public void setUp(Integer up) {
    this.up = up;
  }

  public Integer getDown() {
    return down;
  }

  public void setDown(Integer down) {
    this.down = down;
  }

  public boolean isTop() {
    return top != null && top == 1;
  }

  public void setTop(boolean top) {
    this.top = top ? 1 : 0;
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(getClass().getName()).append("{").append("id=").append(id).append(", flag=").append(flag)
        .append(", status=").append(status).append("}");
    return sb.toString();
  }

}
