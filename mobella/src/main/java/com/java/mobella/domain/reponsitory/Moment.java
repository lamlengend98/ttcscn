package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class Moment {
    private int id;
    private String content;
    private int img;
    private int author;
    private int like_status;
    private Date created_at;
    private Date update_at;
}
