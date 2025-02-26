package com.example.CouponWebsite3.coupon;


import com.example.CouponWebsite3.category.Category;
import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.exception.CompanyException;
import com.example.CouponWebsite3.exception.CouponException;

import java.util.List;

public interface CouponService {
    CouponDTO addCoupon(CouponDTO couponDTO, int companyId) throws CouponException, CompanyException, AuthorizationException;
    CouponDTO getSingleCoupon(int id) throws CouponException;
    void updateCoupon(int id, CouponDTO couponDTO) throws CouponException, AuthorizationException;
    void deleteCoupon(int id) throws CouponException, AuthorizationException;
    List<CouponDTO> getCouponsByCategory(Category category) throws AuthorizationException;
    List<CouponDTO> getCouponsByMaxPrice(double maxPrice) throws AuthorizationException;
    boolean isExist(Coupon coupon);
    List<CouponDTO> getAllCouponsByCompanyId(int companyId) throws AuthorizationException;
    List<CouponDTO> getAllCouponsByCompanyIdAndCategoryId(int companyId, int categoryId) throws AuthorizationException;
    List<CouponDTO> getAllCouponsByCompanyIdAndMaxPrice(int companyId, double maxPrice) throws AuthorizationException;
    List<CouponDTO> getAllCoupons() throws AuthorizationException;
    List<CouponDTO> getAllCouponsExpired();
}
