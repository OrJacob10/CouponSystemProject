package com.example.CouponWebsite3.exception;


import com.example.CouponWebsite3.enums.ErrorMessage;
import lombok.Getter;

@Getter
public class CustomerException extends Exception{
    public final int code;

    public CustomerException(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
        this.code = errorMessage.getCode();
    }
}
