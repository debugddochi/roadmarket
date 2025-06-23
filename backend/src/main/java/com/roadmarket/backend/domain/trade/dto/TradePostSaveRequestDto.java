package com.roadmarket.backend.domain.trade.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TradePostSaveRequestDto {
    private String title;
    private String content;
    private String serverName;
    private String serverNumber;
    private String tradeType;
    private String writerNickname;
    private String guestPassword;
    private String fileId;
}