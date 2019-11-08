package com.java.mobella.controller;

import com.java.mobella.domain.reponsitory.Student;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/student")
public class StudentController extends BaseController{
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private StudentService studentService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public APIResponseBase getStudents(HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = studentService.getStudents();
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public APIResponseBase getStudent(@PathVariable int id, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = studentService.getStudent(id);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/search/{searchContent}", method = RequestMethod.GET)
    public APIResponseBase searchStudent(@PathVariable String searchContent, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = studentService.searchStudent(searchContent);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public APIResponseBase insertStudent(@RequestBody Student student, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = studentService.insertOrUpdateStudent(student);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public APIResponseBase updateStudent(@RequestBody Student student, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = studentService.insertOrUpdateStudent(student);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public APIResponseBase deleteStudent(@PathVariable int id, HttpSession session){
        logger.debug(Constants.LOG_D_API_START);

        APIResponseBase res = new APIResponseBase();
        try{
            this.checkSessionInstractor(session);
            res = studentService.deleteStudent(id);
            res.setAPIStatus(Constants.APIStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            res.setAPIStatus(Constants.APIStatus.ERR_NO_SESSION);
        }
        return res;
    }
}
