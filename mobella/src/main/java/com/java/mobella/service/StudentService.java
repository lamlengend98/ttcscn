package com.java.mobella.service;

import com.java.mobella.domain.reponsitory.Student;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.domain.result.ResultBean;
import com.java.mobella.mapper.StudentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    protected static final Logger logger = LoggerFactory.getLogger(StudentService.class);

    @Autowired
    private StudentMapper studentMapper;

    public APIResponseBase getStudents() {
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();

        List<Student> lstStudent = new ArrayList<>();
        try {
            lstStudent = studentMapper.getStudents();
            result.setLstStudent(lstStudent);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }

        return res;
    }

    public APIResponseBase getStudent(int id){
        logger.debug("Service start");
        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();

        try {

            Student Student = studentMapper.getStudent(id);
            result.setStudent(Student);
            res.setAPIStatus(Constants.APIStatus.OK);
            res.setResult(result);
        } catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
        }
        return res;
    }

    public APIResponseBase insertOrUpdateStudent(Student student){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            if (student.getId() > 0)
                studentMapper.updateStudent(student);
            else
                studentMapper.insertStudent(student);
            res.setAPIStatus(Constants.APIStatus.OK);
        } catch (Exception e){
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
            e.printStackTrace();
        }
        return res;
    }

    public APIResponseBase deleteStudent(int id){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try{
            if (id > 0){
                studentMapper.deleteStudent(id);
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

    public APIResponseBase searchStudent(String searchContent){
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        ResultBean result = new ResultBean();
        try{
            List<Student> lstStudent = studentMapper.searchStudent("%"+searchContent+"%");
            if (lstStudent.size() > 0){
                result.setLstStudent(lstStudent);
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
