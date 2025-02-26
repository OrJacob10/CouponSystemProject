package com.example.CouponWebsite3.customersCoupons;

import com.example.CouponWebsite3.coupon.Coupon;
import com.example.CouponWebsite3.coupon.CouponDTO;
import com.example.CouponWebsite3.customer.CustomerDTO;
import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.exception.CouponException;
import com.example.CouponWebsite3.exception.CustomerCouponException;
import java.util.List;

public interface CustomerCouponService {

    CustomerCoupon addPurchase(CouponDTO couponDTO, CustomerDTO customerDTO) throws CustomerCouponException, CouponException, AuthorizationException;
    CustomerCoupon getSinglePurchase(int id) throws CustomerCouponException;
    void deletePurchase(int id) throws CustomerCouponException;
    List<Coupon> getAllCouponsPurchasedByCustomerId(int customerId) throws AuthorizationException;
    List<Coupon> getAllCouponsByCustomerIdAndCategoryId(int customerId, int categoryId) throws AuthorizationException;
    List<Coupon> getAllCouponsByCustomerIdAndMaxPrice(int customerId, double maxPrice) throws AuthorizationException;

}
