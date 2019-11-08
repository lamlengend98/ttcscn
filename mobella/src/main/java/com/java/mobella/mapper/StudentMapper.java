package com.java.mobella.mapper;

import com.java.mobella.domain.reponsitory.Student;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Mapper
public interface StudentMapper {
    List<Student> getStudents();
    Student getStudent(int id);
    void insertStudent(Student student);
    void updateStudent(Student student);
    void deleteStudent(int id);
    List<Student> searchStudent(String searchContent);
}
