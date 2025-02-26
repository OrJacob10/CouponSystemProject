package com.example.CouponWebsite3.coupon;

import com.example.CouponWebsite3.category.Category;
import com.example.CouponWebsite3.company.Company;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CouponDTO {

    private int id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private int amount;
    private double price;
    private String image;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Category category;

    @JsonIgnore
    private Company company;
}
