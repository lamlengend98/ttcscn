package com.java.mobella.controller;

import com.java.mobella.domain.reponsitory.User;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    protected static final Logger logger = LoggerFactory.getLogger(LoginController.class);

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

}
