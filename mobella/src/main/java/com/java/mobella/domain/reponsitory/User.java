package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private int id;
    private String username;
    private String password;
    private int role;
    private Date createdAt;
    private Date updatedAt;
}
