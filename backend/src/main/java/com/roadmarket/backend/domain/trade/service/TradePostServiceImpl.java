package com.roadmarket.backend.domain.trade.service;

import com.roadmarket.backend.domain.user.repository.UserRepository;
import com.roadmarket.backend.domain.user.entity.User;
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
    private final UserRepository userRepository;

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

    @Override
    public boolean verifyGuestPassword(Long postSq, String inputPassword) {
        TradePost post = tradePostRepository.findById(postSq)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        if (post.getGuestPassword() == null) {
            throw new IllegalStateException("비회원 게시글이 아닙니다.");
        }

        return post.getGuestPassword().equals(inputPassword);
    }

    @Override
    public void deletePost(Long postSq, String guestPassword, String token) {
        TradePost post = tradePostRepository.findById(postSq)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        // 회원인 경우
        if (token != null) {
            String userId = jwtUtil.getUserIdFromToken(token);  // JWT에서 userId 추출
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다."));

            if (!post.getWriterNickname().equals(user.getNickname())) {
                throw new IllegalStateException("삭제 권한이 없습니다.");
            }
        }
        // 비회원인 경우
        else {
            if (post.getGuestPassword() == null) {
                throw new IllegalStateException("비회원 게시글이 아닙니다.");
            }

            if (guestPassword == null || !post.getGuestPassword().equals(guestPassword)) {
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
            }
        }

        post.setDeleted(true);
        tradePostRepository.save(post);
    }

    @Override
    public void updatePost(Long postSq, TradePostSaveRequestDto dto, String token) {
        TradePost post = tradePostRepository.findById(postSq)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        // 회원 권한 확인
        if (token != null && jwtUtil.validateToken(token)) {
            String nickname = jwtUtil.getNicknameFromToken(token);
            if (!nickname.equals(post.getWriterNickname())) {
                throw new IllegalStateException("수정 권한이 없습니다.");
            }
        }
        // 비회원 확인
        else {
            if (post.getGuestPassword() == null || !dto.getGuestPassword().equals(post.getGuestPassword())) {
                throw new IllegalArgumentException("비회원 비밀번호가 일치하지 않습니다.");
            }
        }

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setServerName(dto.getServerName());
        post.setServerNumber(dto.getServerNumber());
        post.setTradeType(dto.getTradeType());
        tradePostRepository.save(post);
    }
}