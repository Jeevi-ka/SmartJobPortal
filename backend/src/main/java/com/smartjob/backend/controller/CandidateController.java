package com.smartjob.backend.controller;

import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "https://venerable-churros-55f2fa.netlify.app")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    // REGISTER API
    @PostMapping("/register")
    public Candidate registerCandidate(@RequestBody Candidate candidate) {
        return candidateService.registerCandidate(candidate);
    }

    // LOGIN API
    @PostMapping("/login")
    public Candidate loginCandidate(@RequestBody Candidate candidate) {
        return candidateService.loginCandidate(
                candidate.getEmail(),
                candidate.getPassword()
        );
    }
}
