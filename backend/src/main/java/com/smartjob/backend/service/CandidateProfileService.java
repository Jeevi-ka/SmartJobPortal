package com.smartjob.backend.service;

import com.smartjob.backend.model.CandidateProfile;
import com.smartjob.backend.repository.CandidateProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CandidateProfileService {

    private final CandidateProfileRepository repository;

    public CandidateProfileService(CandidateProfileRepository repository) {
        this.repository = repository;
    }

    // Save or update profile
    // Save or update profile
    public CandidateProfile saveProfile(CandidateProfile profile) {
        // Check if a profile already exists for this candidate
        Optional<CandidateProfile> existing = repository.findByCandidateId(profile.getCandidateId());

        if (existing.isPresent()) {
            CandidateProfile p = existing.get();
            // Copy all fields from incoming profile to existing
            p.setName(profile.getName());
            p.setEmail(profile.getEmail());
            p.setPhone(profile.getPhone());
            p.setSummary(profile.getSummary());
            p.setSkills(profile.getSkills());
            p.setExperience(profile.getExperience());
            p.setProjectTitle(profile.getProjectTitle());
            p.setProjectDescription(profile.getProjectDescription());
            p.setTechStack(profile.getTechStack());
            p.setTenthPercentage(profile.getTenthPercentage());
            p.setTwelfthPercentage(profile.getTwelfthPercentage());
            p.setCgpa(profile.getCgpa());
            p.setLinkedIn(profile.getLinkedIn());
            p.setGithub(profile.getGithub());
            p.setPortfolio(profile.getPortfolio());
            p.setCodingProfile(profile.getCodingProfile());
            p.setCertifications(profile.getCertifications());
            p.setOnlineCourses(profile.getOnlineCourses());
            p.setHackathons(profile.getHackathons());
            p.setAwards(profile.getAwards());
            p.setScholarships(profile.getScholarships());
            p.setJobPreferences(profile.getJobPreferences());
            p.setBacklogs(profile.getBacklogs());
            p.setArrears(profile.getArrears());

            return repository.save(p); // update existing
        } else {
            return repository.save(profile); // insert new
        }
    }


    // Get profile by profile ID
    public CandidateProfile getProfile(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    // ✅ Correct method
    public Optional<CandidateProfile> getProfileByCandidateId(Long candidateId) {
        return repository.findByCandidateId(candidateId);
    }
}
