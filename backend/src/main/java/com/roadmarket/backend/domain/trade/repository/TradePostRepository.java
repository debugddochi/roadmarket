package com.roadmarket.backend.domain.trade.repository;

import com.roadmarket.backend.domain.trade.entity.TradePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradePostRepository extends JpaRepository<TradePost, Long> {

}