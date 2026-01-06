package com.smartjob.backend.controller;

import com.smartjob.backend.model.Recruiter;
import com.smartjob.backend.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiters")
@CrossOrigin(origins = "http://localhost:3000")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;

    // REGISTER API
    @PostMapping("/register")
    public Recruiter registerRecruiter(@RequestBody Recruiter recruiter) {
        return recruiterService.registerRecruiter(recruiter);
    }

    // LOGIN API
    @PostMapping("/login")
    public Recruiter loginRecruiter(@RequestBody Recruiter recruiter) {
        return recruiterService.loginRecruiter(
                recruiter.getEmail(),
                recruiter.getPassword()
        );
    }
}
