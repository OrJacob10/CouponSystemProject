package com.example.CouponWebsite3.clr;

import com.example.CouponWebsite3.category.Category;
import com.example.CouponWebsite3.category.CategoryService;
import com.example.CouponWebsite3.company.Company;
import com.example.CouponWebsite3.company.CompanyDTO;
import com.example.CouponWebsite3.company.CompanyService;
import com.example.CouponWebsite3.coupon.Coupon;
import com.example.CouponWebsite3.coupon.CouponDTO;
import com.example.CouponWebsite3.coupon.CouponService;
import com.example.CouponWebsite3.customer.Customer;
import com.example.CouponWebsite3.customer.CustomerDTO;
import com.example.CouponWebsite3.customer.CustomerService;
import com.example.CouponWebsite3.customersCoupons.CustomerCouponService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Random;

@Component
@Transactional
public class DemoApplication implements CommandLineRunner {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CouponService couponService;

    @Autowired
    private CustomerCouponService customerCouponService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private Random random;

    @Override
    public void run(String... args) throws Exception {

        //defining categories for the project
        final String[]arr = {"Sport", "Fast Food", "Vacation", "Fashion", "Business", "Gaming", "Toys", "Vehicles", "Beverages", "Cleaning Supplies"};

        // adding companies to the database
        for (int i = 1; i <= 100; i++) {
            Company company = Company.builder().name("company" + i).email("email" + i +"@gmail.com").password("password" + i).build();
            CompanyDTO companyDTO = this.modelMapper.map(company, CompanyDTO.class);
            this.companyService.addCompany(companyDTO);
        }

        // adding categories to the database
        for (int i = 0; i < 10; i++) {
            Category category = Category.builder().name(arr[i]).build();
            this.categoryService.addCategory(category);
        }

        for (int i = 1; i <= 100; i++) {
            Customer customer = Customer.builder().firstName("first" + i).lastName("last" + i).email("customer" + i + "@gmail.com").password("password" + i).build();
            CustomerDTO customerDTO = this.modelMapper.map(customer, CustomerDTO.class);
            this.customerService.addCustomer(customerDTO);
        }

        for (int i = 1; i <= 100; i++) {
            Coupon coupon = Coupon.builder().title("coupon" + i).description("description" + i).category(this.categoryService.getCategory(random.nextInt(1,11))).startDate(LocalDate.now()).endDate(LocalDate.now().plusDays(100 + i)).amount(i*5).price(20 * i).image("image" + i).build();
            CouponDTO couponDTO = this.modelMapper.map(coupon, CouponDTO.class);
            this.couponService.addCoupon(couponDTO, random.nextInt(1,11));
        }


        this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(1), this.customerService.getSingleCustomer(1));
        this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(2), this.customerService.getSingleCustomer(1));
        this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(5), this.customerService.getSingleCustomer(1));
        this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(1), this.customerService.getSingleCustomer(3));
        this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(9), this.customerService.getSingleCustomer(3));
        this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(7), this.customerService.getSingleCustomer(7));
        this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(6), this.customerService.getSingleCustomer(1));

        System.out.println(this.customerCouponService.getAllCouponsPurchasedByCustomerId(1));
    }
}
