package com.java.mobella.service;

import com.java.mobella.domain.reponsitory.Logs;
import com.java.mobella.domain.reponsitory.User;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.mapper.LoginMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class LoginService {

    protected static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private LoginMapper loginMapper;

    public APIResponseBase login(User user, HttpSession session){
        logger.info("Service start");
        APIResponseBase responseBase = new APIResponseBase();

        try {
            String password1 = loginMapper.getPassword(user.getUsername());
            if (user.getPassword().equals(password1)) {
                User userLogin = loginMapper.login(user.getUsername(), user.getPassword());
                session.setAttribute(Constants.SESSION_DATA_USER_ID, userLogin.getId());
                session.setAttribute(Constants.SESSION_DATA_USERNAME, userLogin.getUsername());
                session.setAttribute(Constants.SESSION_DATA_LOGIN, "OK");
                Logs logs = new Logs();
                logs.setUser_id(userLogin.getId());
                loginMapper.insertLastLogin(logs);
                responseBase.setAPIStatus(Constants.APIStatus.OK);
            } else {
                responseBase.setAPIStatus(Constants.APIStatus.ERR_LOGIN_FAILED);
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        logger.debug("Service end");

        return responseBase;
    }

    public APIResponseBase registerOrUpdate(User user){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            if (user.getId() > 0)
                loginMapper.updateUser(user);
            else
                loginMapper.register(user);
            res.setAPIStatus(Constants.APIStatus.OK);
        } catch (Exception e){
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
            e.printStackTrace();
        }
        return res;
    }
}
