package com.smartjob.backend.repository;

import com.smartjob.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByRecruiterId(Long recruiterId);

    // Only jobs whose deadline is today or future
    List<Job> findByApplicationDeadlineGreaterThanEqual(LocalDate date);
}
