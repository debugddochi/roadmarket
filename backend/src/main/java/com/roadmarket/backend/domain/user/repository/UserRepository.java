package com.roadmarket.backend.domain.user.repository;

import com.roadmarket.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * 회원 데이터 조회가능한 JPA 레파지토리
 * - findByUserId() : 사용자 ID로 회원 조회
 * - existsByUserId() : ID 중복 확인용
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);
}
