package com.roadmarket.backend.domain.auth.controller;

import com.roadmarket.backend.domain.auth.dto.LoginRequestDto;
import com.roadmarket.backend.domain.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 인증 관련 요청을 처리하는 컨트롤러
 * - 로그인 기능 제공
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 로그인 요청 처리
     * @param requestDto 로그인 요청 DTO (userId, password)
     * @return 로그인 결과 메시지
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto requestDto) {
        return authService.login(requestDto);
    }
}