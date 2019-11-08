package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class Moment {
    private int id;
    private String content;
    private int img;
    private int author_id;
    private int likes;
    private int status_accept;
    private Date createdAt;
    private Date updatedAt;
}
