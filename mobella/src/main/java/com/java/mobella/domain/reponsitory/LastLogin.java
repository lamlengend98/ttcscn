package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class LastLogin {
    private int id;
    private int is_boss;
    private int is_admin;
    private int is_teacher;
    private int is_parent;
    private int id_grant;
    private Date login_log;
}
