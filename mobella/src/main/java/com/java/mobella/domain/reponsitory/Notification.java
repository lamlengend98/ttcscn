package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class Notification {
    private int id;
    private String title;
    private int author;
    private String content;
    private int img;
    private String notice_class;
    private Date createdAt;
    private Date updatedAt;
}
