package com.roadmarket.backend.domain.trade.controller;

import com.roadmarket.backend.domain.trade.dto.TradePostDetailResponseDto;
import com.roadmarket.backend.domain.trade.dto.TradePostListResponseDto;
import com.roadmarket.backend.domain.trade.dto.TradePostSaveRequestDto;
import com.roadmarket.backend.domain.trade.service.TradePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trade")
@RequiredArgsConstructor
public class TradePostController {

    private final TradePostService tradePostService;

    @PostMapping("/write")
    public ResponseEntity<?> createPost(
            @RequestBody TradePostSaveRequestDto dto,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        tradePostService.createPost(dto, token);
        return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
    }

    @GetMapping("/list")
    public ResponseEntity<List<TradePostListResponseDto>> getAllPosts() {
        List<TradePostListResponseDto> posts = tradePostService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{postSq}")
    public ResponseEntity<TradePostDetailResponseDto> getPostDetail(@PathVariable Long postSq) {
        TradePostDetailResponseDto detail = tradePostService.getPostDetail(postSq);
        return ResponseEntity.ok(detail);
    }

    @PostMapping("/{postSq}/verify-password")
    public ResponseEntity<?> verifyGuestPassword(
            @PathVariable Long postSq,
            @RequestBody Map<String, String> request
    ) {
        String inputPassword = request.get("password");
        boolean result = tradePostService.verifyGuestPassword(postSq, inputPassword);

        if (result) {
            return ResponseEntity.ok().build(); // 비밀번호 일치
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
        }
    }

    @DeleteMapping("/delete/{postSq}")
    public ResponseEntity<String> deletePost(
            @PathVariable Long postSq,
            @RequestParam(required = false) String guestPassword,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        tradePostService.deletePost(postSq, guestPassword, token);
        return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
    }

    @PutMapping("/{postSq}")
    public ResponseEntity<?> updatePost(
            @PathVariable Long postSq,
            @RequestBody TradePostSaveRequestDto dto,
            @RequestHeader(value = "Authorization", required = false) String token
    ) {
        tradePostService.updatePost(postSq, dto, token);
        return ResponseEntity.ok("게시글이 수정되었습니다.");
    }
}