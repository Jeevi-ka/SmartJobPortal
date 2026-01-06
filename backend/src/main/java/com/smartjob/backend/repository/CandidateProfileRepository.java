package com.smartjob.backend.repository;

import com.smartjob.backend.model.CandidateProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateProfileRepository
        extends JpaRepository<CandidateProfile, Long> {

    Optional<CandidateProfile> findByCandidateId(Long candidateId);
}
