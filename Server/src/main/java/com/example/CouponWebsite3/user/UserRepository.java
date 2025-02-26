package com.example.CouponWebsite3.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserData, Integer> {

    boolean existsByEmail(String email);
    UserData findByEmailAndIsActiveTrue(String email);
}

