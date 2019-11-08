package com.java.mobella.mapper;

import com.java.mobella.domain.reponsitory.Notification;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Mapper
public interface NotificationMapper {
    List<Notification> getNotifications();
    Notification getNotification(int id);
    void insertNotification(Notification notification);
    void updateNotification(Notification notification);
    void deleteNotification(int id);
    List<Notification> searchNotification(String searchContent);
}
