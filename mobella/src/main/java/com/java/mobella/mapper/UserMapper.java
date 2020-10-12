package com.java.mobella.mapper;

import com.java.mobella.domain.reponsitory.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

@Service
@Mapper
public interface UserMapper {
    User getUser(String username, String email);
    void updateUser(User user);
    void updatePassword(User user);
    User getPassword(Integer id);
}
