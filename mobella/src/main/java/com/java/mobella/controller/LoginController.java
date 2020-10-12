package com.java.mobella.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.java.mobella.domain.APIException;
import com.java.mobella.domain.reponsitory.User;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.service.LoginService;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
public class LoginController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService service;

    @RequestMapping(value = "/login", produces = "application/json", method = RequestMethod.POST)
    public APIResponseBase loginUser(@Param("username") String username, @Param("password") String password, HttpSession session) {
        logger.debug("username: {}, password: {}", username, password);

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        APIResponseBase res = new APIResponseBase();
        try {
            res = service.login(user, session);
        } catch (Exception e) {
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }


    @ResponseBody
    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public APIResponseBase register(@RequestBody User user){

        System.out.println("user" + user);
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
        try {
            System.out.println(session.getAttribute(Constants.SESSION_DATA_USER_ID));
            int userId = Integer.parseInt((String.valueOf(session.getAttribute(Constants.SESSION_DATA_USER_ID))));
            this.checkSessionInstractor(session);
            user.setId(userId);
            res = service.registerOrUpdate(user);
            res.setAPIStatus(Constants.APIStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_NO_SESSION);
        }

        return res;
    }

    @RequestMapping(value = "/verifyAccount", method = RequestMethod.POST)
    public APIResponseBase verifyAcccount(@RequestBody User user, HttpSession session) throws APIException {
        APIResponseBase res = new APIResponseBase();
        try {
//            System.out.println("User " + user);
            res = service.verifyAccount(user);
        } catch (Exception e) {
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_NO_SESSION);
        }

        return res;
    }

    @ResponseBody
    @RequestMapping(value = "/resetPassword", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public APIResponseBase resetPassword(@RequestBody User user) {
        APIResponseBase res = new APIResponseBase();
        try {
            System.out.println("User " + user);
            res = service.resetPassword(user.getPassword(), user.getToken());
        } catch (Exception e) {
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_NO_SESSION);
        }

        return res;
    }

//    @RequestMapping(value = "/logout", method = RequestMethod.GET)
//    public APIResponseBase logoutUser(HttpSession session) {
//        APIResponseBase responseBase = new APIResponseBase();
//        try {
//            session.invalidate();
//            responseBase.setAPIStatus(Constants.APIStatus.OK_LOGOUT);
//        } catch (Exception e) {
//            e.printStackTrace();
//            responseBase.setAPIStatus(Constants.APIStatus.ERR_ANY);
//        }
//
//        return responseBase;
//    }

}
