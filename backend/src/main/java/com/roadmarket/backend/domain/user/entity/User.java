package com.roadmarket.backend.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * 회원 정보 엔티티
 * - userSq: 회원 PK
 * - userId, password, nickname, email: 기본 정보
 * - role: 권한 (ROLE_USER 또는 ROLE_ADMIN)
 * - emailVerified: 이메일 인증 여부
 * - useYn: 활성화 여부
 * - marketingAgree: 마케팅 정보 수신 동의 여부
 * - createdAt: 가입일
 */
@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSq; // PK

    @Column(nullable = false, unique = true, length = 30)
    private String userId; // 로그인 ID

    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false, length = 30)
    private String nickname; // 닉네임

    @Column(nullable = false, unique = true)
    private String email; // 이메일

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // 권한

    @Column(nullable = false)
    private boolean emailVerified; // 이메일 인증 여부

    @Column(nullable = false)
    private boolean useYn; // 활성화 여부

    @Column(nullable = false)
    private boolean marketingAgree; // 마케팅 정보 수신 동의 여부 (기본값: false)

    @Column(nullable = false)
    private LocalDateTime createdAt; // 가입일
}