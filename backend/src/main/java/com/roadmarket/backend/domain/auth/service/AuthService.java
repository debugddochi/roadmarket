package com.roadmarket.backend.domain.auth.service;

import com.roadmarket.backend.domain.auth.dto.LoginRequestDto;
import com.roadmarket.backend.domain.user.entity.User;
import com.roadmarket.backend.domain.user.repository.UserRepository;
import com.roadmarket.backend.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * 인증 관련 서비스 클래스
 * - 로그인 기능 처리 + JWT 발급
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * 로그인 기능
     * 1. 사용자 ID로 회원 조회
     * 2. 비밀번호 일치 여부 확인
     * 3. JWT 토큰 발급 후 반환
     */
    public ResponseEntity<String> login(LoginRequestDto requestDto) {
        Optional<User> optionalUser = userRepository.findByUserId(requestDto.getUserId());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("존재하지 않는 사용자입니다.");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
        }

        // JWT 토큰 발급
        String token = jwtUtil.generateToken(user.getUserId(), user.getNickname());

        return ResponseEntity.ok(token);
    }
}