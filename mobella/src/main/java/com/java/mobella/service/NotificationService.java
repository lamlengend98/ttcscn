package com.java.mobella.service;

import com.java.mobella.domain.reponsitory.Notification;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.domain.result.ResultBean;
import com.java.mobella.mapper.NotificationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {
    protected static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    @Autowired
    private NotificationMapper notificationMapper;

    public APIResponseBase getNotifications() {
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();

        List<Notification> lstNotification = new ArrayList<>();
        try {
            lstNotification = notificationMapper.getNotifications();
            result.setLstNotification(lstNotification);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

    public APIResponseBase getNotification(int id){
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();

        try {

            Notification Notification = notificationMapper.getNotification(id);
            result.setNotification(Notification);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }
        return res;
    }

    public APIResponseBase insertOrUpdateNotification(Notification notification){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            if (notification.getId() > 0)
                notificationMapper.updateNotification(notification);
            else
                notificationMapper.insertNotification(notification);
            res.setAPIStatus(Constants.APIStatus.OK);
        } catch (Exception e){
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
            e.printStackTrace();
        }
        return res;
    }

    public APIResponseBase deleteNotification(int id){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            if (id > 0){
                notificationMapper.deleteNotification(id);
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

    public APIResponseBase searchNotification(String searchContent){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();
        try{
            List<Notification> lstNotification = notificationMapper.searchNotification(searchContent);
            if (lstNotification.size() > 0){
                result.setLstNotification(lstNotification);
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
