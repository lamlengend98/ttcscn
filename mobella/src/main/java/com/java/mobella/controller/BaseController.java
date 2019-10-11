package com.java.mobella.controller;

import com.java.mobella.domain.APIException;
import com.java.mobella.domain.result.Constants;

import javax.servlet.http.HttpSession;

public class BaseController {
    public void checkSessionInstractor(HttpSession session) throws APIException {
        //return;
        String check = (String) session.getAttribute(Constants.SESSION_DATA_LOGIN);
        Object staff_no = session.getAttribute(Constants.SESSION_DATA_USERNAME);
        Object staff_name = session.getAttribute(Constants.SESSION_DATA_USER_ID);


        if(check != null && check.equals("OK") && staff_name != null && staff_no != null ){
            // 正常
            return;
        } else {
            throw new APIException(Constants.APIStatus.ERR_NO_SESSION);
        }
    }
}
