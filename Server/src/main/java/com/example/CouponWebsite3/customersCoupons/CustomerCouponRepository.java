package com.example.CouponWebsite3.customersCoupons;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerCouponRepository extends JpaRepository<CustomerCoupon, Integer> {
    boolean existsByCouponIdAndCustomerId(int couponId, int customerId);

    List<CustomerCoupon> findByCustomerId(int customerId);

    @Query(value = "SELECT c.id,coupon_id,customer_id \n" +
            "FROM coupon_website3.coupons c JOIN coupon_website3.customers_coupons cvc \n" +
            "ON c.id = cvc.coupon_id\n" +
            "WHERE customer_id = ? AND category_id = ?;", nativeQuery = true)
    List<CustomerCoupon> findAllByCustomerIdAndCategoryId(int customerId, int categoryId);

    @Query(value = "SELECT c.id,coupon_id,customer_id \n" +
            "FROM coupon_website3.coupons c JOIN coupon_website3.customers_coupons cvc \n" +
            "ON c.id = cvc.coupon_id\n" +
            "WHERE customer_id = ? AND price <= ?;", nativeQuery = true)
    List<CustomerCoupon> findAllByCustomerIdAndMaxPrice(int customerId, double maxPrice);

    List<CustomerCoupon> findAllCouponsToPurchaseByCustomer(int customerId);

}
