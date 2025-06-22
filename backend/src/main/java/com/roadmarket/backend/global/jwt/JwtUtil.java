package com.roadmarket.backend.global.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * JWT 발급 및 검증을 담당하는 유틸리티 클래스
 */
@Component
public class JwtUtil {

    // JWT 서명에 사용할 비밀키 (보통 application.yml에서 주입받음)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // JWT 유효 기간 설정 (예: 1시간)
    private final long EXPIRATION_TIME = 60 * 60 * 1000;

    /**
     * 사용자 ID를 기반으로 JWT 토큰을 생성
     */
    public String generateToken(String userId) {
        return Jwts.builder()
                .setSubject("로드마켓 로그인 토큰") // 사용자 식별 정보
                .claim("userId", userId)
                .setIssuedAt(new Date()) // 토큰 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 만료 시간
                .signWith(key) // 서명
                .compact();
    }

    /**
     * JWT 토큰에서 사용자 ID를 추출
     */
    public String getUserIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key) // 서명 키 설정
                .build()
                .parseClaimsJws(token) // 토큰 파싱
                .getBody()
                .getSubject(); // subject에 저장된 사용자 ID 반환
    }

    /**
     * 토큰이 유효한지 검증
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}