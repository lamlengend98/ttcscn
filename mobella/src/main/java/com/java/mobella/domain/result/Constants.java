package com.java.mobella.domain.result;

public class Constants {
    public enum APIStatus {

        OK("0",""),
        OK_LOGOUT("0","Logout successfully"),

        ERR_NO_SESSION("1","No session found"),
        ERR_LOGIN_FAILED("2","Thông tin đăng nhập không chính xác"),
        //huantn add
        ERR_LOGIN_FAILED_TOKEN("3","ログイントークンなし"),
        ERR_WRONG_PASSWORD("4","Wrong pass!!!"),
        ERR_NOTHING("-1","No Thing"),
        //end huantn
        WARN_RE_OPERATION("10","データが古いため、再度操作してください。"),

        ERR_PARAM("99", "Not found param"),
        ERR_ANY("100","Error"),
        ERR_DATA_SEARCH("101","Not found result"),
        ERR_DATA_INSERT("102","データが登録できませんでした"),
        ERR_DATA_UPDATE("103","データが更新できませんでした"),
        ERR_DATA_DELETE("104","データが削除できませんでした"),
        ERR_NO_DATA("105","対象データがありませんでした"),
        ERR_FILE_SAVE("106","ファイルを保存できませんでした"),
        ERR_FILE_DELETE("107","ファイルを削除できませんでした"),
        ERR_DB_CONNECT("199","内部エラーが発生しました"),

        ERR_EST_API_ERROR("200","検索処理が失敗しました"),
        ERR_EST_API_LIMIT_REQUEST("201","ただいま処理が込み合っています。\n少し時間を置いてから検索してください。"),
        ERR_EST_API_TIMEOUT("202","ただいま処理が込み合っています。\n少し時間を置いてから検索してください。")
        ;

        private final String message;
        private final String code;

        APIStatus(String code, String message){
            this.code = code;
            this.message = message;
        }
        public String messgage(){
            return this.message;
        }
        public String code(){
            return this.code;
        }
        public String toString(){
            return message + "(" + code + ")";
        }
    }
    public static final String SESSION_DATA_USER_ID = "user_id";
    public static final String SESSION_DATA_USERNAME = "username";
    public static final String SESSION_DATA_ROLE = "role";
    public static final String SESSION_DATA_LOGIN = "login";

    public static final String LOG_D_API_START = "API START";
    public static final String LOG_D_API_END = "API END";
    public static final String LOG_D_SERVICE_START = "SERVICE START";
    public static final String LOG_D_SERVICE_END = "SERVICE END";

}
