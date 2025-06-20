// 위치: com.roadmarket.backend.domain.auth.dto.LoginRequestDto

package com.roadmarket.backend.domain.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor  // 기본 생성자 필수 (Spring이 객체 생성할 때 필요)
public class LoginRequestDto {

    // 사용자가 입력한 아이디
    private String userId;

    // 사용자가 입력한 비밀번호
    private String password;

    // 생성자 (편의용, 테스트나 객체 수동 생성 시 사용 가능)
    public LoginRequestDto(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }
}