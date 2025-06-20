package com.roadmarket.backend.domain.user.controller;

import com.roadmarket.backend.domain.user.dto.UserRequest;
import com.roadmarket.backend.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 회원가입 관리 컨트롤러
 * - /api/users/signup 키워 회원가입 요청을 받아서 처리
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    /**
     * 회원가입 요청 처리
     * @param request 회원가입 요청 DTO
     * @return 가입 결과 메시지
     */
    @PostMapping("/signup")
    public String signup(@RequestBody UserRequest request) {
        userService.signup(request);
        return "회원가입이 완료되었습니다.";
    }

    @GetMapping("/check-id")
    public ResponseEntity<String> checkId(@RequestParam String userId) {
        boolean exists = userService.isUserIdDuplicated(userId);
        if (exists) {
            return ResponseEntity.ok("이미 사용 중인 아이디입니다.");
        } else {
            return ResponseEntity.ok("사용 가능한 아이디입니다.");
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<String> checkEmail(@RequestParam String email) {
        boolean exists = userService.isEmailDuplicated(email);
        if (exists) {
            return ResponseEntity.ok("이미 사용 중인 이메일입니다.");
        } else {
            return ResponseEntity.ok("사용 가능한 이메일입니다.");
        }
    }
}
