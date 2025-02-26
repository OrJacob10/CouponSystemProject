package com.example.CouponWebsite3.company;

import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.exception.CompanyException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping("/admin/company")
    public CompanyDTO addCompany(@RequestBody CompanyDTO companyDTO) throws CompanyException, AuthorizationException {
        return this.companyService.addCompany(companyDTO);
    }

    @PutMapping("/admin/company/{id}")
    public void updateCompany(@PathVariable int id, @RequestBody CompanyDTO companyDTO) throws CompanyException, AuthorizationException {
        this.companyService.updateCompany(id, companyDTO);
    }

    @GetMapping("/admin/company/{id}")
    public CompanyDTO getSingleCompany(@PathVariable int id) throws CompanyException, AuthorizationException {
        return this.companyService.getCompany(id);
    }

    @GetMapping("/admin/company")
    public List<CompanyDTO> getCompanies() throws AuthorizationException {
        return this.companyService.getCompanies();
    }

    @DeleteMapping("/admin/company/{id}")
    public void deleteCompany(@PathVariable int id) throws CompanyException, AuthorizationException{
        this.companyService.deleteCompany(id);
    }
}
