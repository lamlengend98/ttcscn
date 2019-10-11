package com.java.mobella.controller;

import com.java.mobella.domain.reponsitory.Moment;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.service.MomentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/moment")
public class MomentController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(MomentController.class);

    @Autowired
    private MomentService momentService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public APIResponseBase getMoments(HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = momentService.getMoment();
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public APIResponseBase getMoment(@PathVariable int id, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = momentService.getAMoment(id);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public APIResponseBase insertMoment(@RequestBody Moment moment, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = momentService.insertOrUpdateMoment(moment);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public APIResponseBase updateMoment(@RequestBody Moment moment, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = momentService.insertOrUpdateMoment(moment);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public APIResponseBase deleteMoment(@PathVariable int id, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = momentService.deleteMoment(id);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }
}
