package com.roadmarket.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 🔐 Spring Security 설정 클래스
 * - 인증 없이 접근 허용 (임시 설정)
 * - CSRF 보호 비활성화 (현재는 REST API 테스트를 위해)
 * - 향후 인증/인가 로직 추가 예정
 */
@Configuration
public class SecurityConfig {

    /**
     * 🔐 비밀번호 암호화용 BCrypt 빈 등록
     * - 회원가입 시 비밀번호 저장에 사용
     * - 로그인 시 비밀번호 비교에도 사용
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 🔐 HTTP 보안 필터 체인 설정
     * - 현재는 모든 요청을 인증 없이 허용
     * - CSRF 보호는 비활성화 (POST 테스트 용이하게 하기 위해)
     * - 향후 URL 경로별 접근 제어 설정 가능
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화 (람다 방식 허용)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // 모든 요청 허용 (테스트용)
                );

        return http.build();
    }
}