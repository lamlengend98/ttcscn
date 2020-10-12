package com.java.mobella.controller;

import com.java.mobella.domain.reponsitory.User;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.domain.result.ResultBean;
import com.java.mobella.service.LoginService;
import com.java.mobella.service.UserService;
import io.jsonwebtoken.Claims;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MainController {

    @Autowired
    LoginService loginService;

    @Autowired
    UserService userService;

    @ResponseBody
    @RequestMapping(path = "/")
    public void home(HttpServletRequest request) {

        String hash = BCrypt.hashpw("123", BCrypt.gensalt(12));
        System.out.println(hash);
    }

    @ResponseBody
    @RequestMapping(path = "/checkToken", method = RequestMethod.POST, produces = "application/json")
    public APIResponseBase test(@Param("token") String token, HttpSession session){
        APIResponseBase res = new APIResponseBase();
        try{
            System.out.println(session.getAttribute(Constants.SESSION_DATA_USER_ID));
            System.out.println(session.getAttribute(Constants.SESSION_DATA_USERNAME));
            System.out.println(session.getAttribute(Constants.SESSION_DATA_ROLE));
            String username = String.valueOf(session.getAttribute(Constants.SESSION_DATA_USERNAME));
            String role = String.valueOf(session.getAttribute(Constants.SESSION_DATA_ROLE));
            User user = new User();
            user.setUsername(username);
            user.setRole(role);
            boolean isVerify = loginService.verifyToken(token, user);
            res.setAPIStatus(isVerify ? Constants.APIStatus.OK : Constants.APIStatus.ERR_ANY);
        } catch (Exception e) {
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }
    @ResponseBody
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public APIResponseBase getUser(@RequestHeader(value="Authorization") String token) {
        APIResponseBase res = new APIResponseBase();
        System.out.println(token);
        try {
            Claims claims = loginService.checkToken(token);
            if(claims != null) {
                User user1 = new User();
                user1.setUsername(String.valueOf(claims.get("username")));
                user1.setEmail(String.valueOf(claims.get("email")));
                System.out.println(claims);
                res = userService.getUserInfo(user1);
            } else {
                res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
            }
        } catch (Exception e) {
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }
    @ResponseBody
    @RequestMapping(path = "/user", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public APIResponseBase updateUser(@RequestHeader(value="Authorization") String token, @RequestBody User user, HttpSession session) {
        APIResponseBase res = new APIResponseBase();
        System.out.println(token);
        System.out.println(user);
        System.out.println(session.getAttribute(Constants.SESSION_DATA_USERNAME));
        try {
            Claims claims = loginService.checkToken(token);
            if(String.valueOf(session.getAttribute(Constants.SESSION_DATA_USERNAME)).equals(String.valueOf(claims.get("username")))) {
                res = userService.updateUserInfo(user);
            } else {
                res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
            }
        } catch (Exception e) {
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }
    @ResponseBody
    @RequestMapping(path = "/update-password", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public APIResponseBase updatePasswod(@RequestHeader(value="Authorization") String token, @RequestBody ResultBean result, HttpSession session) {
        APIResponseBase res = new APIResponseBase();
        System.out.println(token);
        System.out.println(result);
        System.out.println(session.getAttribute(Constants.SESSION_DATA_USER_ID));
        try {
            if(String.valueOf(session.getAttribute(Constants.SESSION_DATA_USER_ID)).equals(String.valueOf(result.getId()))) {
                User user = new User();
                user.setId(result.getId());
                user.setPassword(result.getOldPassword());
                res = userService.updatePassword(user, result.getPassword());
            } else {
                res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
            }
        } catch (Exception e) {
            e.printStackTrace();
            res = new APIResponseBase(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

}
