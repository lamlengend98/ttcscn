package com.java.mobella.domain.result;

import lombok.Data;

@Data
public class APIResponseBase {

    private String message;
    private String status;
    private ResultBean result;
    //huantn add param
    private String auth;
    //end huantn

    public APIResponseBase(){
    }

    public APIResponseBase(Constants.APIStatus mes){
        this.status = mes.code();
        this.message = mes.messgage();
    }

    public void setAPIStatus(Constants.APIStatus mes){
        this.status = mes.code();
        this.message = mes.messgage();
    }
    //huantn add param
    public void setAPIStatusWithAuth(Constants.APIStatus mes,String auth){
        this.status = mes.code();
        this.message = mes.messgage();
        this.auth = auth;
    }
    //end huantn
}
