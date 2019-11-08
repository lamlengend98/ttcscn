package com.java.mobella.service;

import com.java.mobella.domain.reponsitory.Activity;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.domain.result.ResultBean;
import com.java.mobella.mapper.ActivityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityService {

    protected static final Logger logger = LoggerFactory.getLogger(ActivityService.class);

    @Autowired
    private ActivityMapper activityMapper;

    public APIResponseBase getActivities() {
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();

        List<Activity> lstActivity = new ArrayList<>();
        try {
            lstActivity = activityMapper.getActivities();
            result.setLstActivity(lstActivity);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

    public APIResponseBase getActivity(int id){
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();

        try {

            Activity activity = activityMapper.getActivity(id);
            result.setActivity(activity);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }
        return res;
    }

    public APIResponseBase insertOrUpdateActivity(Activity activity){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            System.out.println(activity);
            if (activity.getId() > 0)
                activityMapper.updateActivity(activity);
            else
                activityMapper.insertActivity(activity);
            res.setAPIStatus(Constants.APIStatus.OK);
        } catch (Exception e){
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
            e.printStackTrace();
        }
        return res;
    }

    public APIResponseBase deleteActivity(int id){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            if (id > 0){
                activityMapper.delteActivity(id);
                res.setAPIStatus(Constants.APIStatus.OK);
            }
            else{
                res.setAPIStatus(Constants.APIStatus.ERR_PARAM);
            }

        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }
        return res;
    }

    public APIResponseBase searchActivity(String searchContent){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();
        try{
            List<Activity> lstActivity = activityMapper.searchActivities(searchContent);
            if (lstActivity.size() > 0){
                result.setLstActivity(lstActivity);
                res.setAPIStatus(Constants.APIStatus.OK);
                res.setResult(result);
            } else {
                res.setAPIStatus(Constants.APIStatus.ERR_DATA_SEARCH);
            }
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }
        return res;
    }
}
