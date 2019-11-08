package com.java.mobella.domain.reponsitory;

import lombok.Data;

import java.util.Date;

@Data
public class Logs {
    private int id;
    private int user_id;
    private Date createdAt;
    private Date updatedAt;
}
