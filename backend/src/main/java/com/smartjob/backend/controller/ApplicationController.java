package com.smartjob.backend.controller;

import com.smartjob.backend.model.*;
import com.smartjob.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.smartjob.backend.dto.ApplicationRequestDTO;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "https://venerable-churros-55f2fa.netlify.app")
public class ApplicationController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private JobService jobService;

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private SkillMatchService skillMatchService;

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsForJob(@PathVariable Long jobId) {
        return applicationService.getApplicationsForJob(jobId);
    }

    @PostMapping("/submit/{candidateId}/{jobId}")
    public String submitApplication(
            @PathVariable Long candidateId,
            @PathVariable Long jobId,
            @RequestBody ApplicationRequestDTO dto
    ) {
        System.out.println("=== Application Submit API HIT ===");

        Candidate candidate = candidateService.getCandidateById(candidateId);
        Job job = jobService.getJobById(jobId);
        Resume resume = resumeService.getResumeByCandidate(candidateId);

        if (resume == null) {
            return "Resume not uploaded";
        }

        double matchPercentage = 100.0;
        try {
            matchPercentage = skillMatchService
                    .matchCandidateToJob(candidate, job)
                    .getMatchPercentage();
        } catch (Exception e) {
            System.out.println("Skill match failed: " + e.getMessage());
        }

        Application application = mapDtoToEntity(dto);

        return applicationService.submitApplication(
                candidate,
                job,
                resume,
                application,
                matchPercentage
        );
    }

    private Application mapDtoToEntity(ApplicationRequestDTO dto) {
        Application application = new Application();

        application.setFullName(dto.getFullName());
        application.setAge(dto.getAge());
        application.setGender(dto.getGender());
        application.setDepartment(dto.getDepartment());
        application.setRollNumber(dto.getRollNumber());
        application.setCollegeName(dto.getCollegeName());
        application.setDegree(dto.getDegree());
        application.setSpecialization(dto.getSpecialization());

        application.setCgpa(dto.getCgpa());
        application.setTenthMarks(dto.getTenthMarks());
        application.setTwelfthMarks(dto.getTwelfthMarks());

        application.setPhoneNumber(dto.getPhoneNumber());
        application.setEmail(dto.getEmail());
        application.setCurrentAddress(dto.getCurrentAddress());

        application.setLinkedInUrl(dto.getLinkedInUrl());
        application.setGithubUrl(dto.getGithubUrl());
        application.setHackerrankUrl(dto.getHackerrankUrl());
        application.setPortfolioUrl(dto.getPortfolioUrl());

        application.setWillingToRelocate(dto.getWillingToRelocate());
        application.setPreferredLocation(dto.getPreferredLocation());
        application.setExpectedJoiningDate(dto.getExpectedJoiningDate());
        application.setNoticePeriod(dto.getNoticePeriod());
        application.setExpectedCtc(dto.getExpectedCtc());

        application.setCoverLetter(dto.getCoverLetter());
        application.setReferenceName(dto.getReferenceName());

        return application;
    }

    // NEW — Recruiter APPROVES
    @PutMapping("/approve/{applicationId}")
    public String approve(@PathVariable Long applicationId) {
        return applicationService.approveApplication(applicationId);
    }

    // NEW — Recruiter REJECTS
    @PutMapping("/reject/{applicationId}")
    public String reject(@PathVariable Long applicationId) {
        return applicationService.rejectApplication(applicationId);
    }

    // NEW — Candidate dashboard
    @GetMapping("/candidate/{candidateId}")
    public List<Application> getApplicationsForCandidate(@PathVariable Long candidateId) {
        return applicationService.getApplicationsForCandidate(candidateId);
    }
}
