package com.example.CouponWebsite3.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponseDTO {

    private String token;
    private long expiration; // expiration time

}
