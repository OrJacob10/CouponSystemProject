package com.example.CouponWebsite3.login;

import com.example.CouponWebsite3.enums.ClientType;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@RequiredArgsConstructor
public class ClientTypeLoggedIn {
    private ClientType clientType;
}
