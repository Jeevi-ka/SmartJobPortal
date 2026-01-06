package com.smartjob.backend.service;

import com.smartjob.backend.model.Recruiter;
import com.smartjob.backend.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecruiterService {

    @Autowired
    private RecruiterRepository recruiterRepository;

    // Register Recruiter
    public Recruiter registerRecruiter(Recruiter recruiter) {

        Optional<Recruiter> existingRecruiter =
                recruiterRepository.findByEmail(recruiter.getEmail());

        if (existingRecruiter.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        return recruiterRepository.save(recruiter);
    }

    // Login Recruiter
    public Recruiter loginRecruiter(String email, String password) {

        Recruiter recruiter = recruiterRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!recruiter.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return recruiter;
    }
}
