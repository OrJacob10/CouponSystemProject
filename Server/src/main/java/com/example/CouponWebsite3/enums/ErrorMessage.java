package com.example.CouponWebsite3.enums;

import lombok.Getter;

@Getter
public enum ErrorMessage {
    ID_ALREADY_EXIST(101,"Id Already Exist"),
    ID_NOT_FOUND(102,"Id Not Found"),
    NAME_EXIST(103,"Name Already Exist"),
    TITLE_EXIST(104,"Title Already Exist"),
    CANT_CHANGE_NAME(105,"You Can't change a Company's Name"),
    CANT_CHANGE_COMPANY_ID(106,"You Can't Change Coupon's Company ID"),
    EMAIL_EXIST(107, "Email Already Exist"),
    EMAIL_NOT_FOUND(108, "Invalid email. Please verify your email and try again"),
    COUPON_ALREADY_EXIST(109, "Coupon Already Exist"),
    COUPON_NOT_IN_THE_COMPANY(110, "Coupon Is Not Listed Under The Company"),
    COUPON_AMOUNT_ZERO(111, "The Coupon Is Sold Out"),
    COUPON_DATE_EXPIRED(112, "The Coupon Date Has Expired"),
    CANT_BUY_COUPON_TWICE(113, "You Already Bought This Coupon"),
    INVALID_START_DATE(114, "Start Date Already Passed"),
    INVALID_END_DATE(115, "End Date Can't Be Before Start Date"),
    INVALID_DETAILS(116, "invalid details"),
    NOT_AUTHORIZED(117, "Not Authorized, Can't Access This Action"),
    PASSWORD_NOT_FOUND(118, "Invalid password. Please verify your password and try again"),
    CLIENT_TYPE_ERROR(119, "The chosen client type is not supported. Please select a valid option");

    private final String message;
    private int code;

    ErrorMessage(int code, String message) {
        this.message = message;
        this.code = code;
    }

}
