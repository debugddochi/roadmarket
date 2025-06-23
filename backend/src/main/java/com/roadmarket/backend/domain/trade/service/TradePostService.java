package com.roadmarket.backend.domain.trade.service;

import com.roadmarket.backend.domain.trade.dto.TradePostListResponseDto;
import com.roadmarket.backend.domain.trade.dto.TradePostSaveRequestDto;

import java.util.List;

public interface TradePostService {
    void createPost(TradePostSaveRequestDto dto, String token);
    List<TradePostListResponseDto> getAllPosts();
}