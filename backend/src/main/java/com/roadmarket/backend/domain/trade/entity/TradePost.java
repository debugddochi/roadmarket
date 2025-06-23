package com.roadmarket.backend.domain.trade.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TradePost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postSq;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String serverName;
    private String serverNumber;

    private String tradeType; // BUY or SELL

    private String writerNickname; // 로그인 유저 닉네임 or "비회원"
    private String guestPassword; // 비회원일 경우 비밀번호 저장

    private String fileId; // UUID

    private LocalDateTime createdAt;

    private boolean isDeleted = false;
}