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
    private int parent;
    private int school_year;
    private int class_id;
    private int school;
    private Boolean is_delete;
    private String avatar;
    private Date created_at;
    private Date updated_at;
}
