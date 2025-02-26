package com.example.CouponWebsite3.validations;

import com.example.CouponWebsite3.company.CompanyDTO;
import com.example.CouponWebsite3.customer.CustomerDTO;
import com.example.CouponWebsite3.enums.ErrorMessage;
import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class ValidateClient {

    @Autowired
    private UserService userService;

    // function that validates if the user is a company
    public void validateUserIsCompany() throws AuthorizationException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (!(userService.loadUserByUsername(userDetails.getUsername()) instanceof CompanyDTO)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }
    // function that validates if the user is a company by company Id
    public void validateUserIsCompany(int companyId) throws AuthorizationException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (!(userService.loadUserByUsername(userDetails.getUsername()) instanceof CompanyDTO)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }

            if (((CompanyDTO) userService.loadUserByUsername(userDetails.getUsername())).getId() != companyId) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }

    // function that validates if the user is a customer
    public void validateUserIsCustomer() throws AuthorizationException{
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (!(userService.loadUserByUsername(userDetails.getUsername()) instanceof CustomerDTO)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }
    // function that validates if the user is a company by customer Id
    public void validateUserIsCustomer(int customerId) throws AuthorizationException{
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (!(userService.loadUserByUsername(userDetails.getUsername()) instanceof CustomerDTO)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }

            if (((CustomerDTO) userService.loadUserByUsername(userDetails.getUsername())).getId() != customerId) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }

    public void validateUserIsAdmin() throws AuthorizationException{
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (userService.loadUserByUsername(userDetails.getUsername()) instanceof CustomerDTO || userService.loadUserByUsername(userDetails.getUsername()) instanceof CompanyDTO) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }
}
