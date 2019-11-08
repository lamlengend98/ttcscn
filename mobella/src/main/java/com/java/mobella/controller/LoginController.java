package com.java.mobella.controller;

import com.java.mobella.domain.APIException;
import com.java.mobella.domain.reponsitory.User;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
public class LoginController extends BaseController{

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService service;

    @RequestMapping(value = "/login/{username}/{password}", method = RequestMethod.GET)
    public APIResponseBase loginUser(@PathVariable String username, @PathVariable String password, HttpSession session){
        logger.debug("username: {}, password: {}", username, password);

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        APIResponseBase res = new APIResponseBase();
        try{
            res = service.login(user, session);
        }catch (Exception e){
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public APIResponseBase register(@RequestBody User user){

        APIResponseBase res = new APIResponseBase();
        try{
            res = service.registerOrUpdate(user);
        }catch (Exception e){
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

    @RequestMapping(value = "/login", method = RequestMethod.PUT)
    public APIResponseBase updateUser(@RequestBody User user, HttpSession session) throws APIException {
        APIResponseBase res = new APIResponseBase();
        try{
            System.out.println(session.getAttribute(Constants.SESSION_DATA_USER_ID));
            int userId = Integer.parseInt((String.valueOf(session.getAttribute(Constants.SESSION_DATA_USER_ID))));
            this.checkSessionInstractor(session);
            user.setId(userId);
            res = service.registerOrUpdate(user);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_NO_SESSION);
        }

        return res;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public APIResponseBase logoutUser(HttpSession session){
        APIResponseBase responseBase = new APIResponseBase();
        try{
            session.invalidate();
            responseBase.setAPIStatus(Constants.APIStatus.OK_LOGOUT);
        }catch (Exception e){
            e.printStackTrace();
            responseBase.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }

        return responseBase;
    }

}
