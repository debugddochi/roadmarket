// src/main/java/com/roadmarket/backend/global/config/CorsConfig.java

package com.roadmarket.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 🌐 CORS 전역 설정 클래스
 * - 프론트엔드 개발 환경(https://localhost:5173)에서 오는 요청 허용
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ 프론트엔드 개발 환경 허용 (Vite 기본 HTTPS 포트)
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedOrigin("https://localhost:5173");

        // ✅ 메서드 및 헤더 허용
        config.addAllowedMethod("*");      // GET, POST, PUT, DELETE 등
        config.addAllowedHeader("*");      // Authorization, Content-Type 등

        // ✅ 인증정보(쿠키/헤더 등) 포함 허용
        config.setAllowCredentials(true);

        // ✅ 응답 헤더 노출 허용 (JWT 사용 시 Authorization 등)
        config.addExposedHeader("Authorization");

        // ✅ 모든 경로에 대해 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}