package com.smartjob.backend.repository;

import com.smartjob.backend.model.Application;
import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Optional<Application> findByCandidateIdAndJobId(Long candidateId, Long jobId);


    List<Application> findByJobId(Long jobId);

    // NEW → Candidate dashboard
    List<Application> findByCandidateId(Long candidateId);
}
