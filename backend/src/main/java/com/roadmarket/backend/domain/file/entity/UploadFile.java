package com.roadmarket.backend.domain.file.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UploadFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileId; // 게시글과 연결되는 고유 식별자

    private String originalFileName;

    private String storedFileName;

    private String filePath;
}