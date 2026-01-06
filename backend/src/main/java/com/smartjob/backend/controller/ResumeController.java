package com.smartjob.backend.controller;

import com.smartjob.backend.model.Candidate;
import com.smartjob.backend.model.Resume;
import com.smartjob.backend.service.CandidateService;
import com.smartjob.backend.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private CandidateService candidateService;

    // Upload or update resume skills
    @PostMapping("/upload/pdf/{candidateId}")
    public Resume uploadResumePDF(
            @PathVariable Long candidateId,
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        Candidate candidate = candidateService.getCandidateById(candidateId);
        return resumeService.uploadResumeFromPDF(candidate, file);
    }

    @GetMapping("/download/{resumeId}")
    public org.springframework.http.ResponseEntity<org.springframework.core.io.ByteArrayResource>
    downloadResume(@PathVariable Long resumeId) throws Exception {

        Resume resume = resumeService.getResumeById(resumeId);

        if (resume == null || resume.getFilePath() == null) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }

        java.nio.file.Path path = java.nio.file.Path.of(resume.getFilePath());
        byte[] pdfBytes = java.nio.file.Files.readAllBytes(path);

        org.springframework.core.io.ByteArrayResource resource =
                new org.springframework.core.io.ByteArrayResource(pdfBytes);

        return org.springframework.http.ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=resume.pdf")
                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                .contentLength(pdfBytes.length)
                .body(resource);
    }
    // Check if resume exists for a candidate
    @GetMapping("/check/{candidateId}")
    public boolean checkResume(@PathVariable Long candidateId) {
        return resumeService.hasResume(candidateId);
    }


}
