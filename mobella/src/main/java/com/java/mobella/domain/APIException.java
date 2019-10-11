package com.java.mobella.domain;

import com.java.mobella.domain.result.Constants;

/**
 * API用Exception クラス
 * Constants.message、発生時のExcepton を保持。
 * エラー発生時にメッセージを設定する。
 */
public class APIException extends Exception {
	private Constants.APIStatus message;

	public APIException(Constants.APIStatus message){
		this.message = message;

	}
	public APIException(Constants.APIStatus message, Throwable cause){
		super(cause);
		this.message = message;
	}

	public void setAPIStatus(Constants.APIStatus message){
		this.message = message;
	}

	public String getAPIErrorMessage(){
		return this.message == null ? "" : this.message.toString();
	}

	public Constants.APIStatus getAPIStatus(){

		if (this.message == null) {
			return Constants.APIStatus.ERR_ANY;
		}
		return this.message;
	}

}
