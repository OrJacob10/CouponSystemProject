package com.example.CouponWebsite3.auth;

import com.example.CouponWebsite3.enums.ClientType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {

    private String email;
    private String password;
    private ClientType clientType;

}
