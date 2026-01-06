package com.smartjob.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequestDTO {

    private String fullName;
    private Integer age;
    private String gender;
    private String department;
    private String rollNumber;
    private String collegeName;
    private String degree;
    private String specialization;

    private Double cgpa;
    private Double tenthMarks;
    private Double twelfthMarks;

    private String phoneNumber;
    private String email;
    private String currentAddress;

    private String linkedInUrl;
    private String githubUrl;
    private String hackerrankUrl;
    private String portfolioUrl;

    private Boolean willingToRelocate;
    private String preferredLocation;
    private String expectedJoiningDate;
    private String noticePeriod;
    private String expectedCtc;

    private String coverLetter;
    private String referenceName;
}
