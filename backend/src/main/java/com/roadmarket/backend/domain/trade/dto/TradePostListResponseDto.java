package com.roadmarket.backend.domain.trade.dto;

import com.roadmarket.backend.domain.trade.entity.TradePost;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class TradePostListResponseDto {

    private Long postSq;
    private String title;
    private String content;
    private String serverName;
    private String serverNumber;
    private String tradeType; // BUY 또는 SELL
    private String writerNickname;
    private String createdAt;
    private boolean hasImage;

    public TradePostListResponseDto(TradePost entity) {
        this.postSq = entity.getPostSq();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.serverName = entity.getServerName();
        this.serverNumber = entity.getServerNumber();
        this.tradeType = entity.getTradeType();
        this.writerNickname = entity.getWriterNickname();
        this.createdAt = entity.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        this.hasImage = entity.getFileId() != null && !entity.getFileId().isEmpty();
    }
}