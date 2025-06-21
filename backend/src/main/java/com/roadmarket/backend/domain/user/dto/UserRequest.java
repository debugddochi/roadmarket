package com.roadmarket.backend.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * 회원가입용 요청 DTO
 * - 사용자가 입력하는 회원 정보를 받는 조체
 */
@Getter
@Setter
public class UserRequest {

    private String userId;     // 로그인 ID
    private String password;   // 비밀번호
    private String nickname;   // 닉네임
    private String email;      // 이메일
    private boolean marketingAgree;
}
