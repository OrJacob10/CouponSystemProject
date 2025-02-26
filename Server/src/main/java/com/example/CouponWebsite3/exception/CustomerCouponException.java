package com.example.CouponWebsite3.exception;

import com.example.CouponWebsite3.enums.ErrorMessage;
import lombok.Getter;

@Getter
public class CustomerCouponException extends Exception{
    private final int code;

    public CustomerCouponException(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
        this.code = errorMessage.getCode();
    }
}
