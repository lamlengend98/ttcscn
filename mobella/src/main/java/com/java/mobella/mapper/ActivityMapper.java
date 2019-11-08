package com.java.mobella.mapper;

import com.java.mobella.domain.reponsitory.Activity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Mapper
public interface ActivityMapper {
    List<Activity> getActivities();
    Activity getActivity(int id);
    void insertActivity(Activity activity);
    void updateActivity(Activity activity);
    void delteActivity(int id);
    List<Activity> searchActivities(String searchContent);
}
