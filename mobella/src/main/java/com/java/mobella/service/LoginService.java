package com.java.mobella.service;

import com.java.mobella.domain.reponsitory.User;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.domain.result.ResultBean;
import com.java.mobella.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class LoginService {

    protected static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    UserMapper userMapper;

    public APIResponseBase login(User user, HttpSession session){
        logger.info("Service start");

        ResultBean resultBean = new ResultBean();
        APIResponseBase responseBase = new APIResponseBase();
        String password1 = userMapper.getPassword(user.getUsername());
        if(user.getPassword().equals(password1)){
            session.setAttribute(Constants.SESSION_DATA_USER_ID, user.getId());
            session.setAttribute(Constants.SESSION_DATA_USERNAME, user.getUsername());
            responseBase.setAPIStatus(Constants.APIStatus.OK);
        } else {
            responseBase.setAPIStatus(Constants.APIStatus.ERR_LOGIN_FAILED);
            session.invalidate();
        }

        logger.debug("Service end");

        return responseBase;
    }
}
