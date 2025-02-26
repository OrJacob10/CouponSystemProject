package com.example.CouponWebsite3.exception;

import com.example.CouponWebsite3.enums.ErrorMessage;
import lombok.Getter;

@Getter
public class CategoryException extends Exception{
    private final int code;

    public CategoryException(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
        this.code = errorMessage.getCode();
    }
}
