package com.java.mobella.controller;

import com.java.mobella.domain.reponsitory.Notification;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/notification")
public class NotificationController extends BaseController {
    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public APIResponseBase getNotifications(HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = notificationService.getNotifications();
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public APIResponseBase getNotification(@PathVariable int id, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = notificationService.getNotification(id);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public APIResponseBase insertNotification(@RequestBody Notification notification, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = notificationService.insertOrUpdateNotification(notification);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public APIResponseBase updateNotification(@RequestBody Notification notification, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = notificationService.insertOrUpdateNotification(notification);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public APIResponseBase deleteNotification(@PathVariable int id, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = notificationService.deleteNotification(id);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }
}
