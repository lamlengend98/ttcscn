package com.java.mobella.domain.reponsitory;

import lombok.Data;

@Data
public class User {
    private int id;
    private String username;
    private String password;
    private int is_boss;
    private int is_admin;
    private int is_teacher;
    private int is_student;
    private int is_parent;
    private int id_grant;
}
