package com.example.CouponWebsite3.admin;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    public Map<String, Object> buildClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getUsername());
        return claims;
    }
}
