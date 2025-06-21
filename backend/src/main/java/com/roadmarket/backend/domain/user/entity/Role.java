package com.roadmarket.backend.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * ❌ 사용자 역할 정의 enum
 * - ROLE_USER: 일반 사용자
 * - ROLE_ADMIN: 관리자
 */
public enum Role {
    ROLE_USER,    // 일반 회원
    ROLE_ADMIN    // 관리자
}
