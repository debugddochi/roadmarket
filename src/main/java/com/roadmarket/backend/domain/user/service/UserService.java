package com.roadmarket.backend.domain.user.service;

import com.roadmarket.backend.domain.user.dto.UserRequest;
import com.roadmarket.backend.domain.user.entity.Role;
import com.roadmarket.backend.domain.user.entity.User;
import com.roadmarket.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 회원 가입 및 복사 관리 요청을 처리하는 서비스
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    /**
     * 회원가입 처리
     * - ID 중복여부 확인
     * - 비밀번호 암호화
     * - 기본 정보 + ROLE_USER + createdAt 설정
     */
    public void signup(UserRequest request) {
        if (userRepository.existsByUserId(request.getUserId())) {
            throw new IllegalArgumentException("이미 사용 중인 ID입니다.");
        }

        User user = new User();
        user.setUserId(request.getUserId());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNickname(request.getNickname());
        user.setEmail(request.getEmail());
        user.setRole(Role.ROLE_USER);
        user.setEmailVerified(false);
        user.setUseYn(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setMarketingAgree(request.isMarketingAgree());

        userRepository.save(user);
    }

    public boolean isUserIdDuplicated(String userId) {
        return userRepository.existsByUserId(userId);
    }

    public boolean isEmailDuplicated(String email) {
        return userRepository.existsByEmail(email);
    }
}
