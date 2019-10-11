package com.java.mobella.mapper;

import com.java.mobella.domain.reponsitory.Moment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Mapper
@Service
public interface MomentMapper {
    public List<Moment> getLstMoment();
    public Moment getMomentById(int id);
    public void insertMoment(Moment moment);
    public List<Moment> searchMoment(String searchContent);
    public void updateMoment(Moment moment);
    public void deleteMoment(int id);
}
