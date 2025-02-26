package com.example.CouponWebsite3.coupon;

import com.example.CouponWebsite3.category.Category;
import com.example.CouponWebsite3.company.CompanyService;
import com.example.CouponWebsite3.enums.ErrorMessage;
import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.exception.CompanyException;
import com.example.CouponWebsite3.exception.CouponException;
import com.example.CouponWebsite3.validations.ValidateClient;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CouponServiceImpl implements CouponService{

    private final CompanyService companyService;
    private final CouponRepository couponRepository;
    private final ModelMapper modelMapper;
    private final ValidateClient validateClient;


    /*
       The function gets a coupon and adds the coupon to the database, to the table: coupons
       To add a coupon it must not be null and have the exact same title for an existing coupon
    */
    @Override
    public CouponDTO addCoupon(CouponDTO couponDTO, int companyId) throws CouponException, CompanyException, AuthorizationException {
        this.validateClient.validateUserIsCompany();
        Coupon coupon = this.modelMapper.map(couponDTO, Coupon.class);
        if (this.couponRepository.existsById(coupon.getId())) {
            throw new CouponException(ErrorMessage.ID_ALREADY_EXIST);
        }
        if (this.couponRepository.existsByTitleAndCompanyId(coupon.getTitle(), companyId)) {
            throw new CouponException(ErrorMessage.TITLE_EXIST);
        }

        if (coupon.getStartDate().isBefore(LocalDate.now())){
            throw new CouponException(ErrorMessage.INVALID_START_DATE);
        }

        if (coupon.getEndDate().isBefore(coupon.getStartDate())){
            throw new CouponException(ErrorMessage.INVALID_END_DATE);
        }

        coupon.setCompany(this.companyService.getCompanyFromDB(companyId));
        Coupon couponFromDB = this.couponRepository.save(coupon);
        return this.modelMapper.map(couponFromDB, CouponDTO.class);
    }

    // the function gets an id the returns a coupon from the database with the id, from the table: coupons.
    @Override
    public CouponDTO getSingleCoupon(int id) throws CouponException {
        Coupon coupon = this.couponRepository.findById(id).orElseThrow(() -> new CouponException(ErrorMessage.ID_NOT_FOUND));
        return this.modelMapper.map(coupon, CouponDTO.class);
    }

    /*
       The function gets a coupon and a coupon id and updates the coupon in the database, in the table: coupons.
       To update a coupon you have to enter an id that exists in coupons table and coupon must not be
       null,have a different company id or have the same title for an existing coupon.
    */
    @Override
    public void updateCoupon(int id, CouponDTO couponDTO) throws CouponException, AuthorizationException {
        this.validateClient.validateUserIsCompany();

        Coupon couponFromDb = this.couponRepository.findById(id).orElseThrow(() -> new CouponException(ErrorMessage.ID_NOT_FOUND));
        if (couponDTO.getCompany() != null) {
            if (!this.couponRepository.existsByCompanyId(couponDTO.getCompany().getId())) {
                throw new CouponException(ErrorMessage.CANT_CHANGE_COMPANY_ID);
            }
        }

        if (couponDTO.getStartDate().isBefore(LocalDate.now()) && couponDTO.getStartDate().isBefore(couponFromDb.getStartDate())){
            throw new CouponException(ErrorMessage.INVALID_START_DATE);
        }

        if (couponDTO.getEndDate().isBefore(couponDTO.getStartDate())){
            throw new CouponException(ErrorMessage.INVALID_END_DATE);
        }

        couponFromDb.setTitle(couponDTO.getTitle());
        couponFromDb.setDescription(couponDTO.getDescription());
        couponFromDb.setCategory(couponDTO.getCategory());
        couponFromDb.setStartDate(couponDTO.getStartDate());
        couponFromDb.setEndDate(couponDTO.getEndDate());
        couponFromDb.setPrice(couponDTO.getPrice());
        couponFromDb.setAmount(couponDTO.getAmount());
        couponFromDb.setImage(couponDTO.getImage());
        this.couponRepository.save(couponFromDb);
    }


    /*
         The function gets a coupon's id and deletes the coupon from the database, from the table: coupons
         To delete a coupon you have to enter an id that exists in coupons table and the coupon must be with the id of the coupon
         The function deletes the coupon and all the coupon's purchase history
    */
    @Override
    public void deleteCoupon(int id) throws CouponException, AuthorizationException {
        this.validateClient.validateUserIsCompany();
        if (!this.couponRepository.existsById(id)) {
            throw new CouponException(ErrorMessage.ID_NOT_FOUND);
        }
        this.couponRepository.deleteById(id);
    }

    /*
        The function receives a category and returns all coupons in the database with this category, from the table: coupons.
    */
    @Override
    public List<CouponDTO> getCouponsByCategory(Category category) throws AuthorizationException {
        this.validateClient.validateUserIsCustomer();
        return this.couponRepository.findAllByCategory(category).stream().map(coupon -> this.modelMapper.map(coupon, CouponDTO.class)).collect(Collectors.toList());
    }

    /*
        The function receives a max price and returns all coupons in the database that their price is equal or lower than the max price, from the table: coupons.
    */
    @Override
    public List<CouponDTO> getCouponsByMaxPrice(double maxPrice) throws AuthorizationException {
        this.validateClient.validateUserIsCustomer();
        return this.couponRepository.findAllByMaxPrice(maxPrice).stream().map(coupon -> this.modelMapper.map(coupon, CouponDTO.class)).collect(Collectors.toList());
    }

    /*
        The function gets a coupon, and returns true if the coupon exist in the database (from the table: coupons)
    */
    @Override
    public boolean isExist(Coupon coupon) {
        return this.couponRepository.existsById(coupon.getId());
    }


    /*
        The function returns all coupons from the database with the company id, from the table: coupons.
    */
    @Override
    public List<CouponDTO> getAllCouponsByCompanyId(int companyId) throws AuthorizationException {
        this.validateClient.validateUserIsCompany(companyId);
        return this.couponRepository.findAllByCompanyId(companyId).stream().map(coupon -> this.modelMapper.map(coupon, CouponDTO.class)).collect(Collectors.toList());
    }

    /*
        The function returns all coupons with the company id and category id, from the database, from the table: coupons.
    */
    @Override
    public List<CouponDTO> getAllCouponsByCompanyIdAndCategoryId(int companyId, int categoryId) throws AuthorizationException {
        this.validateClient.validateUserIsCompany(companyId);
        return this.couponRepository.findAllByCompanyIdAndCategoryId(companyId, categoryId).stream().map(coupon -> this.modelMapper.map(coupon, CouponDTO.class)).collect(Collectors.toList());
    }

    /*
        The function returns all coupons from the database with the company id and price equal or lower than max price, from the table: coupons.
    */
    @Override
    public List<CouponDTO> getAllCouponsByCompanyIdAndMaxPrice(int companyId, double maxPrice) throws AuthorizationException {
        this.validateClient.validateUserIsCompany(companyId);
        return this.couponRepository.findAllByCompanyIdAndMaxPrice(companyId, maxPrice).stream().map(coupon -> this.modelMapper.map(coupon, CouponDTO.class)).collect(Collectors.toList());
    }

    /*
        The function returns all coupons from the table: coupons in the database.
    */
    @Override
    public List<CouponDTO> getAllCoupons() throws AuthorizationException {
        this.validateClient.validateUserIsCustomer();
        return this.couponRepository.findAll().stream().map(coupon -> this.modelMapper.map(coupon, CouponDTO.class)).collect(Collectors.toList());
    }

    /*
        The function returns all coupons that their end date expired from the table: coupons in the database.
    */
    @Override
    public List<CouponDTO> getAllCouponsExpired(){
        return this.couponRepository.findAllByEndDateExpired().stream().map(coupon -> this.modelMapper.map(coupon, CouponDTO.class)).collect(Collectors.toList());
    }
}
