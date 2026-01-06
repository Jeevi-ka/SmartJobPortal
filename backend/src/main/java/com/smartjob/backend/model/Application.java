package com.smartjob.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relations
    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @OneToOne
    @JoinColumn(name = "resume_id", nullable = true)
    private Resume resume;

    // ===== NEW FIELD FOR RECRUITER DECISION =====
    private String status = "PENDING"; // PENDING | APPROVED | REJECTED

    // ===== PERSONAL DETAILS =====
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

    // ===== PROFESSIONAL DETAILS =====
    private String linkedInUrl;
    private String githubUrl;
    private String hackerrankUrl;
    private String portfolioUrl;

    private Boolean willingToRelocate;
    private String preferredLocation;
    private String expectedJoiningDate;
    private String noticePeriod;
    private String expectedCtc;

    @Column(length = 2000)
    private String coverLetter;

    private String referenceName;

    private Boolean applied = true;
}
