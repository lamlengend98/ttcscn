package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class Student {
    private int id;
    private String first_name;
    private String last_name;
    private int gender;
    private Date birthday;
    private String address;
    private int grade;
    private int parent_id;
    private int school_id;
    private int class_id;
    private int is_delete;
    private String avatar;
    private Date createdAt;
    private Date updatedAt;
}
