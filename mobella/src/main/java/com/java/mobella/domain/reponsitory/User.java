package com.java.mobella.domain.reponsitory;

import lombok.Data;

@Data
public class User {
    private int id;
    private String username;
    private String password;
    private Boolean is_boss;
    private Boolean is_admin;
    private Boolean is_teacher;
    private Boolean is_student;
    private Boolean is_parent;
    private Boolean is_grant;
}
