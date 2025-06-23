package com.roadmarket.backend.global.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // JWT 서명에 사용할 비밀키
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // 유효 기간: 1시간
    private final long EXPIRATION_TIME = 60 * 60 * 1000;

    /**
     * 사용자 ID와 닉네임을 기반으로 JWT 생성
     */
    public String generateToken(String userId, String nickname) {
        return Jwts.builder()
                .setSubject(userId) // subject: userId
                .claim("userId", userId)
                .claim("nickname", nickname) // ✅ 닉네임 claim에 추가
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    /**
     * 토큰에서 사용자 ID 추출
     */
    public String getUserIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); // subject == userId
    }

    /**
     * 토큰에서 닉네임 추출
     */
    public String getNicknameFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("nickname", String.class);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 토큰 유효성 검증
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