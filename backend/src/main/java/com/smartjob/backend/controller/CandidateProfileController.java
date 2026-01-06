package com.smartjob.backend.controller;

import com.smartjob.backend.model.CandidateProfile;
import com.smartjob.backend.service.CandidateProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin
public class CandidateProfileController {

    private final CandidateProfileService service;

    public CandidateProfileController(CandidateProfileService service) {
        this.service = service;
    }

    // Save or update profile
    @PostMapping
    public CandidateProfile saveProfile(@RequestBody CandidateProfile profile) {
        return service.saveProfile(profile);
    }

    // Get profile by profile ID
    @GetMapping("/{id}")
    public CandidateProfile getProfile(@PathVariable Long id) {
        return service.getProfile(id);
    }

    // Get profile by candidate ID
    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<CandidateProfile> getProfileByCandidate(
            @PathVariable Long candidateId) {

        return service
                .getProfileByCandidateId(candidateId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
