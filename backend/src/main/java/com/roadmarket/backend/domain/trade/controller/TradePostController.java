package com.roadmarket.backend.domain.trade.controller;

import com.roadmarket.backend.domain.trade.dto.TradePostSaveRequestDto;
import com.roadmarket.backend.domain.trade.service.TradePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;

@RestController
@RequestMapping("/api/trade")
@RequiredArgsConstructor
public class TradePostController {

    private final TradePostService tradePostService;

    @PostMapping("/write")
    public ResponseEntity<?> createPost(@ModelAttribute TradePostSaveRequestDto dto) {
        try {
            tradePostService.createPost(dto);
            return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
        } catch (MultipartException e) {
            return ResponseEntity.badRequest().body("파일 업로드 실패: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("에러 발생: " + e.getMessage());
        }
    }
}