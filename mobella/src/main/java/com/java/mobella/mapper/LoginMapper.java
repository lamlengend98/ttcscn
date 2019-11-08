package com.java.mobella.mapper;

import com.java.mobella.domain.reponsitory.Logs;
import com.java.mobella.domain.reponsitory.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

@Service
@Mapper
public interface LoginMapper {
    public User login(String username, String password);
    public String getPassword(String username);
    public void insertLastLogin(Logs logs);
    public void register(User user);
    public void updateUser(User user);
}
