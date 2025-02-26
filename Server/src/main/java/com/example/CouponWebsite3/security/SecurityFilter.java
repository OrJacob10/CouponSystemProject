package com.example.CouponWebsite3.security;

import com.example.CouponWebsite3.enums.ClientType;
import com.example.CouponWebsite3.enums.ErrorMessage;
import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.exception.CustomerException;
import com.example.CouponWebsite3.token.TokenService;
import com.example.CouponWebsite3.user.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserService userService;

    @SneakyThrows
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String tokenHeader = request.getHeader("Authorization");
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response); //if the request don't have a token,can go to controller if authorized in securityConfig!
            return;
        }

        final String token = tokenHeader.substring(7); // header starts with: Bearer someToken, so the token start after index 7
        String email = this.tokenService.getEmailFromToken(token);
        String clientType = this.tokenService.getClientTypeFromToken(token);

        // if the user is not an admin but contains admin in URL -> throw an exception
        // also if the user is admin but not contains admin in URL -> throes an exception
//        if (clientType == null || !clientType.equals(ClientType.ADMIN.name()) && request.getRequestURI().contains("admin") || clientType.equals(ClientType.ADMIN.name()) && !request.getRequestURI().contains("admin")) {
//            throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
//        }

        if (email != null) {
            boolean isTokenExpirationValid = this.tokenService.isExpirationToken(token);
            if (isTokenExpirationValid) {
                UserDetails userDetails = this.userService.loadUserByUsername(email);
                if (userDetails != null) {
                    UsernamePasswordAuthenticationToken authentication
                            = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            new ArrayList<>()
                    );
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}

