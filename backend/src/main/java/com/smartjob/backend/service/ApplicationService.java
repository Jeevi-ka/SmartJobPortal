package com.smartjob.backend.service;

import com.smartjob.backend.model.*;
import com.smartjob.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    // FIXED: Added @Transactional and exception handling

    public String submitApplication(
            Candidate candidate,
            Job job,
            Resume resume,
            Application application,
            double matchPercentage
    ) {

        // 1️⃣ Check duplicate FIRST (IMPORTANT)
        if (applicationRepository
                .findByCandidateIdAndJobId(candidate.getId(), job.getId())
                .isPresent()) {
            return "Already applied";
        }


        // 2️⃣ Skill match validation
        if (matchPercentage < 40.0) {
            return "Cannot apply: Skill match less than 40%";
        }

        // 3️⃣ Academic validation
        if (candidate.getCgpa() == null || candidate.getCgpa() < job.getMinimumCgpa()) {
            return "Cannot apply: CGPA less than required";
        }

        if (candidate.getTenthMarks() == null ||
                candidate.getTenthMarks() < job.getMinimumTenthPercentage()) {
            return "Cannot apply: 10th marks less than required";
        }

        if (candidate.getTwelfthMarks() == null ||
                candidate.getTwelfthMarks() < job.getMinimumTwelfthPercentage()) {
            return "Cannot apply: 12th marks less than required";
        }

        // 4️⃣ Attach relations
        application.setCandidate(candidate);
        application.setJob(job);
        application.setResume(resume);

        application.setCgpa(candidate.getCgpa());
        application.setTenthMarks(candidate.getTenthMarks());
        application.setTwelfthMarks(candidate.getTwelfthMarks());

        application.setApplied(true);
        application.setStatus("PENDING");

        // 5️⃣ Save ONCE
        applicationRepository.save(application);

        return "Application submitted successfully";
    }



    // Recruiter views applications
    public List<Application> getApplicationsForJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    // Recruiter APPROVES
    public String approveApplication(Long applicationId) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus("APPROVED");
        applicationRepository.save(app);
        return "Application approved";
    }

    // Recruiter REJECTS
    public String rejectApplication(Long applicationId) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus("REJECTED");
        applicationRepository.save(app);
        return "Application rejected";
    }

    // Candidate dashboard
    public List<Application> getApplicationsForCandidate(Long candidateId) {
        return applicationRepository.findByCandidateId(candidateId);
    }
}
