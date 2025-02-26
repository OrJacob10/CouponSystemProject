package com.example.CouponWebsite3.auth;

import com.example.CouponWebsite3.exception.CompanyException;
import com.example.CouponWebsite3.exception.CustomerException;
import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.token.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final TokenService tokenService;

    @PostMapping("/login")
    public TokenResponseDTO login(@RequestBody LoginRequestDTO loginRequestDTO) throws AuthorizationException {
        return this.authService.createTokenFromLoginDetails(loginRequestDTO);
    }
}
