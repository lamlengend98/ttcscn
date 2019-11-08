package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class Activity {
    private int id;
    private String title;
    private Date acti_time_from;
    private Date acti_time_to;
    private Date regis_time_from;
    private Date regis_time_to;
    private String notice_class;
    private String content;
    private int regis_status;
    private int img;
    private Date createdAt;
    private Date updatedAt;
}
