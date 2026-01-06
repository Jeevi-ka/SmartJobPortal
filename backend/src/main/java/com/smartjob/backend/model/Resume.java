package com.smartjob.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // extracted skills as comma separated
    @Column(length = 2000)
    private String skills;

    // Path where PDF is stored
    @Column(length = 500)
    private String filePath;


    @OneToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
}
