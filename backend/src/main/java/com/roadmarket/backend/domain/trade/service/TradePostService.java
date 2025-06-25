package com.roadmarket.backend.domain.trade.service;

import com.roadmarket.backend.domain.trade.dto.TradePostDetailResponseDto;
import com.roadmarket.backend.domain.trade.dto.TradePostListResponseDto;
import com.roadmarket.backend.domain.trade.dto.TradePostSaveRequestDto;

import java.util.List;

public interface TradePostService {
    void createPost(TradePostSaveRequestDto dto, String token);
    List<TradePostListResponseDto> getAllPosts();
    TradePostDetailResponseDto getPostDetail(Long postSq);
    boolean verifyGuestPassword(Long postSq, String inputPassword);
    void deletePost(Long postSq, String guestPassword, String token);
    void updatePost(Long postSq, TradePostSaveRequestDto dto, String token);
}