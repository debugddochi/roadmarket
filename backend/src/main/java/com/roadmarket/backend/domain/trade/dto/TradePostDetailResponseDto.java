package com.roadmarket.backend.domain.trade.dto;

import com.roadmarket.backend.domain.trade.entity.TradePost;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TradePostDetailResponseDto {
    private Long postSq;
    private String title;
    private String content;
    private String tradeType;
    private String serverName;
    private String serverNumber;
    private String writerNickname;
    private String createdAt;
    private boolean hasImage;
    private String fileId;

    // ✅ 엔티티로부터 세팅하는 생성자
    public TradePostDetailResponseDto(TradePost post) {
        this.postSq = post.getPostSq();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.tradeType = post.getTradeType();
        this.serverName = post.getServerName();
        this.serverNumber = post.getServerNumber();
        this.writerNickname = post.getWriterNickname();
        this.createdAt = post.getCreatedAt().toString();
        this.fileId = post.getFileId();
        this.hasImage = (fileId != null && !fileId.isEmpty());
    }
}