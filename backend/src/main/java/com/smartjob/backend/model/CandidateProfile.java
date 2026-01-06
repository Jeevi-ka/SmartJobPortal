package com.smartjob.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "candidate_profiles")
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔑 IMPORTANT LINK
    @Column(nullable = false, unique = true)
    private Long candidateId;

    // Basic
    private String name;
    private String email;
    private String phone;

    // Education
    private Double tenthPercentage;
    private Double twelfthPercentage;
    private Double cgpa;

    // Profile
    @Column(length = 2000)
    private String summary;

    private String skills;
    private String experience;

    // Projects
    private String projectTitle;

    @Column(length = 2000)
    private String projectDescription;

    private String techStack;

    // Extras
    private String certifications;
    private String onlineCourses;
    private String hackathons;
    private String awards;
    private String scholarships;

    // Links
    private String linkedIn;
    private String github;
    private String portfolio;
    private String codingProfile; // LeetCode / HackerRank

    // Preferences
    private String jobPreferences;
    private Boolean backlogs;
    private Boolean arrears;
}
