package com.smartjob.backend.service;

import com.smartjob.backend.model.Job;
import com.smartjob.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.model.JobMatchResponse;
import com.smartjob.backend.service.SkillMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.stream.Collectors;
import com.smartjob.backend.model.Job;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    // Recruiter posts a job
    public Job postJob(Job job) {
        return jobRepository.save(job);
    }

    public Job getJobById(Long jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));
    }


    @Autowired
    private SkillMatchService skillMatchService;

    // Get all active jobs with match info for candidate
    public List<JobMatchResponse> getJobsForCandidate(Candidate candidate) {
        List<Job> jobs = jobRepository.findByApplicationDeadlineGreaterThanEqual(LocalDate.now());

        return jobs.stream()
                .map(job -> skillMatchService.matchCandidateToJob(candidate, job))
                .collect(Collectors.toList());
    }

    // Candidate views all jobs
    // Candidate views only active jobs
    public List<Job> getAllJobs() {
        return jobRepository.findByApplicationDeadlineGreaterThanEqual(LocalDate.now());
    }


    // Recruiter views jobs posted by them
    public List<Job> getJobsByRecruiter(Long recruiterId) {
        return jobRepository.findByRecruiterId(recruiterId);
    }
}
