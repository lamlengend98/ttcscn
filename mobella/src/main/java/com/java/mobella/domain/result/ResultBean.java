package com.java.mobella.domain.result;

import com.java.mobella.domain.reponsitory.Moment;
import com.java.mobella.domain.reponsitory.User;
import lombok.Data;

import java.util.List;

@Data
public class ResultBean {
    private User user;
    private Moment moment;
    private List<Moment> lstMoment;
}
