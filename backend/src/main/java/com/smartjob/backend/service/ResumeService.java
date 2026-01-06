package com.smartjob.backend.service;

import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.model.Resume;
import com.smartjob.backend.repository.CandidateRepository;
import com.smartjob.backend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import java.util.Optional;

@Service
public class ResumeService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    // Upload or update resume
    public Resume uploadResume(Candidate candidate, String skills) {

        Optional<Resume> existingResume =
                resumeRepository.findByCandidateId(candidate.getId());

        Resume resume;

        if (existingResume.isPresent()) {
            resume = existingResume.get();
            resume.setSkills(skills);
        } else {
            resume = new Resume();
            resume.setCandidate(candidate);
            resume.setSkills(skills);
        }

        return resumeRepository.save(resume);
    }

    // Get resume by candidate id
    public Resume getResumeByCandidate(Long candidateId) {
        return resumeRepository.findByCandidateId(candidateId)
                .orElse(null);
    }

    public Resume uploadResumeFromPDF(Candidate candidate, MultipartFile file) throws Exception {

        // 1. Save PDF to disk
        String uploadDir = "uploads/resumes/";
        java.io.File dir = new java.io.File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName = candidate.getId() + "_" + file.getOriginalFilename();
        java.nio.file.Path filePath =
                java.nio.file.Paths.get(uploadDir + fileName);
        java.nio.file.Files.write(filePath, file.getBytes());

        // 2. Parse PDF
        InputStream inputStream = file.getInputStream();
        PDDocument document = PDDocument.load(inputStream);
        PDFTextStripper pdfStripper = new PDFTextStripper();
        String text = pdfStripper.getText(document);
        document.close();

        // 3. Extract skills
        List<String> possibleSkills =
                Arrays.asList("Java", "Spring Boot", "MySQL", "React", "Python", "AWS", "Docker");

        List<String> extractedSkills = possibleSkills.stream()
                .filter(skill -> text.toLowerCase().contains(skill.toLowerCase()))
                .collect(Collectors.toList());

        String skillsString = String.join(",", extractedSkills);

        // 4. Save Resume
        Optional<Resume> existingResume = resumeRepository.findByCandidateId(candidate.getId());
        Resume resume;

        if (existingResume.isPresent()) {
            resume = existingResume.get();
        } else {
            resume = new Resume();
            resume.setCandidate(candidate);
        }

        resume.setSkills(skillsString);
        resume.setFilePath(filePath.toString()); // ✅ NEW
        resumeRepository.save(resume);

        // 5. Update Candidate skills
        candidate.setSkills(skillsString);
        candidateRepository.save(candidate);

        return resume;
    }

    public Resume getResumeById(Long resumeId) {
        return resumeRepository.findById(resumeId).orElse(null);
    }
    // Check if resume exists for a candidate
    public boolean hasResume(Long candidateId) {
        return resumeRepository.findByCandidateId(candidateId).isPresent();
    }


}
