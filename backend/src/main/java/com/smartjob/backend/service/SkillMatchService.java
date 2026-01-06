package com.smartjob.backend.service;

import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.model.Job;
import com.smartjob.backend.model.JobMatchResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillMatchService {

    public JobMatchResponse matchCandidateToJob(Candidate candidate, Job job) {

        // --- SKILL MATCH CALCULATION ---
        List<String> candidateSkills = candidate.getSkills() == null
                ? List.of()
                : Arrays.stream(candidate.getSkills().split(","))
                .map(String::trim)
                .collect(Collectors.toList());

        List<String> jobSkills = job.getRequiredSkills() == null
                ? List.of()
                : Arrays.stream(job.getRequiredSkills().split(","))
                .map(String::trim)
                .collect(Collectors.toList());


        List<String> matchedSkills = jobSkills.stream()
                .filter(candidateSkills::contains)
                .collect(Collectors.toList());

        List<String> missingSkills = jobSkills.stream()
                .filter(skill -> !candidateSkills.contains(skill))
                .collect(Collectors.toList());

        double matchPercentage = jobSkills.isEmpty()
                ? 0.0
                : ((double) matchedSkills.size() / jobSkills.size()) * 100;

        boolean canApply = matchPercentage >= 40.0;

        // --- ACADEMIC ELIGIBILITY CHECK ---
        boolean academicEligible = true;

        if (job.getMinimumCgpa() != null && candidate.getCgpa() != null) {
            if (candidate.getCgpa() < job.getMinimumCgpa()) academicEligible = false;
        }

        if (job.getMinimumTenthPercentage() != null && candidate.getTenthMarks() != null) {
            if (candidate.getTenthMarks() < job.getMinimumTenthPercentage()) academicEligible = false;
        }

        if (job.getMinimumTwelfthPercentage() != null && candidate.getTwelfthMarks() != null) {
            if (candidate.getTwelfthMarks() < job.getMinimumTwelfthPercentage()) academicEligible = false;
        }

        // Final apply eligibility = skill match + academic eligibility
        if (!academicEligible) {
            canApply = false;
        }

        // --- CREATE RESPONSE ---
        JobMatchResponse response = new JobMatchResponse();
        response.setJobId(job.getId());
        response.setJobTitle(job.getJobTitle());
        response.setCompanyName(job.getCompanyName());
        response.setJobDescription(job.getJobDescription());
        response.setLocation(job.getLocation());
        response.setSalaryPackage(job.getSalaryPackage());
        response.setExperienceRequired(job.getExperienceRequired());
        response.setCompanyWebsite(job.getCompanyWebsite());

        response.setMinimumCgpa(job.getMinimumCgpa());
        response.setMinimumTenthPercentage(job.getMinimumTenthPercentage());
        response.setMinimumTwelfthPercentage(job.getMinimumTwelfthPercentage());
        response.setApplicationDeadline(job.getApplicationDeadline());

        response.setMatchedSkills(matchedSkills);
        response.setMissingSkills(missingSkills);
        response.setMatchPercentage(matchPercentage);
        response.setCanApply(canApply);

        return response;
    }
}
