package com.java.mobella.service;

import com.java.mobella.domain.reponsitory.Moment;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.domain.result.ResultBean;
import com.java.mobella.mapper.MomentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MomentService {

    protected static final Logger logger = LoggerFactory.getLogger(MomentService.class);

    @Autowired
    private MomentMapper momentMapper;

    public APIResponseBase getMoment() {
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();

        List<Moment> lstMoment = new ArrayList<>();
        try {
            lstMoment = momentMapper.getLstMoment();
            result.setLstMoment(lstMoment);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

    public APIResponseBase getAMoment(int id){
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();

        try {

            Moment moment = momentMapper.getMomentById(id);
            result.setMoment(moment);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }
        return res;
    }

    public APIResponseBase insertOrUpdateMoment(Moment moment){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            if (moment.getId() > 0)
                momentMapper.updateMoment(moment);
            else
                momentMapper.insertMoment(moment);
            res.setAPIStatus(Constants.APIStatus.OK);
        } catch (Exception e){
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
            e.printStackTrace();
        }
        return res;
    }

    public APIResponseBase deleteMoment(int id){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            if (id > 0){
                momentMapper.deleteMoment(id);
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

    public APIResponseBase searchMoment(String searchContent){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();
        try{
            List<Moment> lstMoment = momentMapper.searchMoment(searchContent);
            if (lstMoment.size() > 0){
                result.setLstMoment(lstMoment);
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
