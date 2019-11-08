package com.java.mobella.controller;

import com.java.mobella.domain.reponsitory.Activity;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.service.ActivityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/activity")
public class ActivityController extends BaseController {
    private static final Logger logger = LoggerFactory.getLogger(ActivityController.class);

    @Autowired
    private ActivityService activityService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public APIResponseBase getActivities(HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = activityService.getActivities();
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public APIResponseBase getActivity(@PathVariable int id, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = activityService.getActivity(id);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public APIResponseBase insertActivity(@RequestBody Activity activity, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            System.out.println(activity);
            this.checkSessionInstractor(session);
            res = activityService.insertOrUpdateActivity(activity);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public APIResponseBase updateActivity(@RequestBody Activity activity, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = activityService.insertOrUpdateActivity(activity);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public APIResponseBase deleteActivity(@PathVariable int id, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = activityService.deleteActivity(id);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }
}
