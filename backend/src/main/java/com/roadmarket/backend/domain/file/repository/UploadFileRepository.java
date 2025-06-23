package com.roadmarket.backend.domain.file.repository;

import com.roadmarket.backend.domain.file.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {
    List<UploadFile> findByFileId(String fileId);
}