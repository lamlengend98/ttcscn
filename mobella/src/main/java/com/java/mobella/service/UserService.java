package com.java.mobella.service;

import com.java.mobella.domain.reponsitory.Student;
import com.java.mobella.domain.reponsitory.User;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.domain.result.ResultBean;
import com.java.mobella.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    protected static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserMapper userMapper;

    public APIResponseBase getUserInfo(User user) {
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();
        try {
            User user1 = userMapper.getUser(user.getUsername(), user.getEmail());
            System.out.println("user" + user1);
            result.setUser(user1);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e) {
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

    public APIResponseBase updateUserInfo(User user) {
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        try {
            userMapper.updateUser(user);
            res.setAPIStatus(Constants.APIStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

    public Boolean checkPassword(String password, String hashPassword) {
        System.out.println(password);
        System.out.println(hashPassword);
        if (password != null && hashPassword != null)
            return BCrypt.checkpw(password, hashPassword);
        return false;
    }


    public APIResponseBase updatePassword(User user, String newPassword) {
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        try {
            User user1 = userMapper.getPassword(user.getId());
            if (user1.getPassword() != null && checkPassword(user.getPassword(), user1.getPassword())) {
                String hashPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt(12));
                user.setPassword(hashPassword);
                userMapper.updatePassword(user);
                res.setAPIStatus(Constants.APIStatus.OK);
            } else {
                res.setAPIStatus(Constants.APIStatus.ERR_WRONG_PASSWORD);
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }
}
