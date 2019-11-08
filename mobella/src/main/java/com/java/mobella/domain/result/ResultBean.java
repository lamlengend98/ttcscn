package com.java.mobella.domain.result;

import com.java.mobella.domain.reponsitory.*;
import lombok.Data;

import java.util.List;

@Data
public class ResultBean {
    private User user;
    private Moment moment;
    private List<Moment> lstMoment;
    private Activity activity;
    private List<Activity> lstActivity;
    private List<Notification> lstNotification;
    private Notification notification;
    private Student student;
    private List<Student> lstStudent;
}
