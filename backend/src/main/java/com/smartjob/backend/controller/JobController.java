package com.smartjob.backend.controller;

import com.smartjob.backend.model.Job;
import com.smartjob.backend.service.JobService;
import com.smartjob.backend.service.SkillMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.model.JobMatchResponse;
import com.smartjob.backend.service.CandidateService;
import org.springframework.web.bind.annotation.PathVariable;
import com.smartjob.backend.model.Application;
import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.model.Job;
import com.smartjob.backend.service.ApplicationService;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {
    @Autowired
    private SkillMatchService skillMatchService;

    @Autowired
    private JobService jobService;

    // Recruiter posts a job
    @PostMapping("/post")
    public Job postJob(@RequestBody Job job) {
        return jobService.postJob(job);
    }

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private CandidateService candidateService;

    // Candidate dashboard with match info
    @GetMapping("/candidate/{candidateId}")
    public List<JobMatchResponse> getJobsForCandidate(@PathVariable Long candidateId) {
        Candidate candidate = candidateService.getCandidateById(candidateId);
        return jobService.getJobsForCandidate(candidate);
    }

    // Candidate views all jobs
    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Recruiter views jobs posted by them
    @GetMapping("/recruiter/{recruiterId}")
    public List<Job> getJobsByRecruiter(@PathVariable Long recruiterId) {
        return jobService.getJobsByRecruiter(recruiterId);
    }
}
