package com.smartjob.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobTitle;
    private String companyName;  // <-- ADD THIS

    @Column(length = 2000)
    private String jobDescription;

    private String requiredSkills; // comma separated

    private String experienceRequired;

    private String location;
    private String companyWebsite;

    // Academic requirements
    private Double minimumCgpa;
    private Double minimumTenthPercentage;
    private Double minimumTwelfthPercentage;

    // Salary offered
    private Double salaryPackage; // LPA

    // Last date to apply
    private LocalDate applicationDeadline;

    // Recruiter who posted the job
    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private Recruiter recruiter;
}
