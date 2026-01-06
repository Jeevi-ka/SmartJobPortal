package com.smartjob.backend.service;

import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    // Register Candidate
    public Candidate registerCandidate(Candidate candidate) {

        Optional<Candidate> existingCandidate =
                candidateRepository.findByEmail(candidate.getEmail());

        if (existingCandidate.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        return candidateRepository.save(candidate);
    }

    // Login Candidate
    public Candidate loginCandidate(String email, String password) {

        Candidate candidate = candidateRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!candidate.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return candidate;
    }

    // Get candidate by ID
    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + id));
    }

}
