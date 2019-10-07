package com.java.mobella.mapper;

import com.java.mobella.domain.reponsitory.User;

public interface UserMapper {
    public User login(String username, String password);
    public String getPassword(String username);
}
