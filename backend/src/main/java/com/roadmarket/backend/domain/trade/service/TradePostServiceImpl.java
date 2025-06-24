package com.roadmarket.backend.domain.trade.service;

import com.roadmarket.backend.domain.trade.dto.TradePostListResponseDto;
import com.roadmarket.backend.domain.trade.dto.TradePostSaveRequestDto;
import com.roadmarket.backend.domain.trade.entity.TradePost;
import com.roadmarket.backend.domain.trade.repository.TradePostRepository;
import com.roadmarket.backend.domain.trade.dto.TradePostDetailResponseDto;
import com.roadmarket.backend.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TradePostServiceImpl implements TradePostService {

    private final TradePostRepository tradePostRepository;
    private final JwtUtil jwtUtil;

    @Override
    public void createPost(TradePostSaveRequestDto dto, String token) {
        String nickname = "비회원";

        if (token != null && jwtUtil.validateToken(token)) {
            nickname = jwtUtil.getNicknameFromToken(token); // 🔥 토큰에서 nickname 꺼냄
        } else if (dto.getWriterNickname() != null && !dto.getWriterNickname().isEmpty()) {
            nickname = dto.getWriterNickname(); // fallback
        }

        TradePost post = new TradePost();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setServerName(dto.getServerName());
        post.setServerNumber(dto.getServerNumber());
        post.setTradeType(dto.getTradeType());
        post.setWriterNickname(nickname); // ✅ 닉네임 저장
        post.setGuestPassword(dto.getGuestPassword());
        post.setFileId(dto.getFileId());
        post.setCreatedAt(LocalDateTime.now());
        post.setDeleted(false);

        tradePostRepository.save(post);
    }

    @Override
    public List<TradePostListResponseDto> getAllPosts() {
        return tradePostRepository.findAll().stream()
                .filter(post -> !post.isDeleted())
                .map(TradePostListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public TradePostDetailResponseDto getPostDetail(Long postSq) {
        System.out.println("📥 게시글 상세 조회 요청 postSq: {}" + postSq);
        TradePost post = tradePostRepository.findById(postSq)
                .orElseThrow(() -> {
                    return new RuntimeException("해당 게시글이 없습니다.");
                });
        System.out.println("✅ 게시글 조회 성공: {}" + post.getTitle());

        return new TradePostDetailResponseDto(post);
    }
}