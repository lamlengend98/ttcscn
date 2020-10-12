package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private int id;
    private String username;
    private String password;
    private String email;
    private String address;
    private String phone;
    private Date createdAt;
    private Date updatedAt;
    private String role;
    private String token;
}
