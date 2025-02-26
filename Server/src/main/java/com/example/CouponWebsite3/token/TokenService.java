package com.example.CouponWebsite3.token;

import com.example.CouponWebsite3.enums.ClientType;
import com.example.CouponWebsite3.login.ClientTypeLoggedIn;
import com.example.CouponWebsite3.user.UserData;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final String SECRET_KEY = "1234";
    private final ClientTypeLoggedIn clientTypeLoggedIn;

    // function that receives a map and create a token
    public String generateToken(Map<String, Object> claims) {
        long expirationDuration = 1000 * 60 * 30;
        return Jwts.builder()
                .addClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationDuration))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // defining the algorithm and the secret key of the token.
                .compact();
    }

    // function that receives the token as a parameter and returns true if the token is expired else returns false
    public boolean isExpirationToken(String token) {
        return new Date().before(this.getExpirationFromToken(token));
    }

    // function that receives the token as a parameter and returns the expiration date of the token
    public Date getExpirationFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody().getExpiration();
    }

    // function that receives the token as a parameter and returns the expiration date of the token
    public Date getCreationFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody().getIssuedAt();
    }

    // function that receives the token as a parameter and returns the email from the token
    public String getEmailFromToken(String token) {
        String email = null;
        try {
            email = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("email").toString();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return email;
    }

    // function that receives the token as a parameter and returns the clientType from the token
    public String getClientTypeFromToken(String token) {
        String clientType = null;
        try {
            clientType = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("clientType").toString();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        if (clientType != null)
            this.clientTypeLoggedIn.setClientType(ClientType.valueOf(clientType));
        return clientType;
    }

    // function that receives the token as a parameter and returns the email from the token
    public int getIdFromToken(String token) {
        String id = null;
        try {
            id = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("id")
                    .toString();
            System.out.println(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return Integer.parseInt(id);
    }

    public Map<String, Object> buildClaims(UserData userData){
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", userData.getEmail());
        claims.put("firstName", userData.getFirstName());
        claims.put("lastName", userData.getLastName());
        claims.put("clientType", userData.getClientType());
        return claims;
    }
}
