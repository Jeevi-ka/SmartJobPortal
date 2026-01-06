package com.smartjob.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobMatchResponse {

    private Long jobId;
    private String jobTitle;
    private String companyName;
    private String jobDescription;
    private String location;
    private Double salaryPackage;
    private String experienceRequired;
    private String companyWebsite;

    // Academic requirements
    private Double minimumCgpa;
    private Double minimumTenthPercentage;
    private Double minimumTwelfthPercentage;
    private LocalDate applicationDeadline;

    private List<String> matchedSkills;
    private List<String> missingSkills;
    private Double matchPercentage;
    private Boolean canApply; // true if eligible + skills >= 40%
}
