package com.example.CouponWebsite3.company;

import com.example.CouponWebsite3.enums.ErrorMessage;
import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.exception.CompanyException;
import com.example.CouponWebsite3.validations.ValidateClient;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService{

    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final ValidateClient validateClient;

    // constructor for the service
    public CompanyServiceImpl(CompanyRepository companyRepository, @Lazy PasswordEncoder passwordEncoder, ModelMapper modelMapper,@Lazy ValidateClient validateClient){
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.validateClient=validateClient;
    }

    /*
      The function gets a company and adds the company to the database, to the table: companies
      To add a company you have to enter the correct details such as: not a name or email that already exists
    */
    public CompanyDTO addCompany(CompanyDTO companyDTO) throws CompanyException, AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        Company company = this.modelMapper.map(companyDTO, Company.class);
        if (this.companyRepository.existsById(company.getId())) {
            throw new CompanyException(ErrorMessage.ID_ALREADY_EXIST);
        }
        if (this.companyRepository.existsByName(company.getName())) {
            throw new CompanyException(ErrorMessage.NAME_EXIST);
        }
        if (this.companyRepository.existsByEmail(company.getEmail())) {
            throw new CompanyException(ErrorMessage.EMAIL_EXIST);
        }
        company.setPassword(this.passwordEncoder.encode(company.getPassword()));
        Company companyFromDB = this.companyRepository.save(company);
        return this.modelMapper.map(companyFromDB, CompanyDTO.class);
    }

    // function that returns all the companies in the database.
    @Override
    public List<CompanyDTO> getCompanies() throws AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        return this.companyRepository.findAll().stream().map(company -> this.modelMapper.map(company,CompanyDTO.class)).collect(Collectors.toList());
    }


    // function that returns true if the email and password exist in the company table in the database and false otherwise.
    @Override
    public boolean isEmailAndPasswordExist(String email, String password) {
        return this.companyRepository.existsByEmailAndPassword(email, password);
    }

    // function that returns UserDetails by userName(email) from the company table in the database.
    @Override
    public UserDetails findByEmail(String username) {
        return this.companyRepository.findByEmail(username);
    }


    /*
      The function gets a company's id return the company with the id from the database, from the table: companies
    */
    @Override
    public CompanyDTO getCompany(int id) throws CompanyException, AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        Company company = this.companyRepository.findById(id).orElseThrow(() -> new CompanyException(ErrorMessage.ID_NOT_FOUND));
        return this.modelMapper.map(company, CompanyDTO.class);
    }

    public Company getCompanyFromDB(int id) throws CompanyException {
        return this.companyRepository.findById(id).orElseThrow(() -> new CompanyException(ErrorMessage.ID_NOT_FOUND));
    }

    /*
      The function gets a company and a company id and updates the company in the database, in the table: companies.
      To update a company you have to enter the correct details such as: not a name or email
      that already exists, and an id that exists in companies table.
    */
    @Override
    public void updateCompany(int id, CompanyDTO companyDTO) throws CompanyException, AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        Company companyFromDb = this.getCompanyFromDB(id);
        if (!this.companyRepository.existsById(id)){
            throw new CompanyException((ErrorMessage.ID_NOT_FOUND));
        }
        if (!companyDTO.getName().equals(companyFromDb.getName())) {
            throw new CompanyException(ErrorMessage.CANT_CHANGE_NAME);
        }

        if (this.companyRepository.existsByEmail(companyDTO.getEmail()) && this.companyRepository.findByEmail(companyDTO.getEmail()).getId() != id){
            throw new CompanyException(ErrorMessage.EMAIL_EXIST);
        }

        Company company = this.modelMapper.map(companyDTO, Company.class);
        company.setId(id);
        company.setEmail(companyDTO.getEmail());
        this.companyRepository.save(company);
    }

    /*
      The function gets a company's id deletes the company from the database, from the table: companies
      To delete a company you have to enter an id that exists in companies table
      The function delete the company and deletes all the coupons and purchase history that related to the company
    */

    @Override
    public void deleteCompany(int id) throws CompanyException, AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        if (!this.companyRepository.existsById(id)) {
            throw new CompanyException(ErrorMessage.ID_NOT_FOUND);
        }
        this.companyRepository.deleteById(id);
    }


    // function that receives company and builds the properties of the token
    @Override
    public Map<String, Object> buildClaims(CompanyDTO companyDTO) {
        Company company = this.modelMapper.map(companyDTO, Company.class);
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", company.getId());
        claims.put("email", company.getEmail());
        claims.put("name", company.getName());
        return claims;
    }


}
