package com.example.CouponWebsite3.customer;

import com.example.CouponWebsite3.enums.ErrorMessage;
import com.example.CouponWebsite3.exception.AuthorizationException;
import com.example.CouponWebsite3.exception.CustomerException;
import com.example.CouponWebsite3.validations.ValidateClient;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final ValidateClient validateClient;


    public CustomerServiceImpl(CustomerRepository customerRepository, @Lazy PasswordEncoder passwordEncoder, ModelMapper modelMapper,@Lazy ValidateClient validateClient) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.validateClient = validateClient;
    }

    /*
      The function gets a customer and adds the customer to the database, to the table: customers.
      To add a customer you have to enter the correct details such as: not an email that already exists
   */

    @Override
    public CustomerDTO addCustomer(CustomerDTO customerDTO) throws CustomerException, AuthorizationException {
        this.validateClient.validateUserIsAdmin();
        Customer customer = this.modelMapper.map(customerDTO, Customer.class);
        if (this.customerRepository.existsById(customer.getId())) {
            throw new CustomerException(ErrorMessage.ID_ALREADY_EXIST);
        }

        if (this.customerRepository.existsByEmail(customerDTO.getEmail())){
            throw new CustomerException(ErrorMessage.EMAIL_EXIST);
        }
        customer.setPassword(this.passwordEncoder.encode(customer.getPassword()));
        Customer customerFromDB = this.customerRepository.save(customer);
        return this.modelMapper.map(customerFromDB, CustomerDTO.class);
    }

    @Override
    public List<CustomerDTO> getCustomerList() throws AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        return this.customerRepository.findAll().stream().map(customer -> this.modelMapper.map(customer,CustomerDTO.class)).collect(Collectors.toList());
    }

    /*
      The function gets a customer's id and return the customer with the id from the database, from the table: customers
      To get a customer you have to enter an id that exists in the customers table otherwise the program will throw an exception.
    */
    @Override
    public CustomerDTO getSingleCustomer(int id) throws CustomerException, AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        Customer customer = this.customerRepository.findById(id).orElseThrow(() -> new CustomerException(ErrorMessage.ID_NOT_FOUND));
        return this.modelMapper.map(customer, CustomerDTO.class);
    }

    /*
        The function gets a customer and a customer's id and updates the customer in the database, in the table: customers.
        To update a customer you have to enter an id that exists in customers table.
    */
    @Override
    public void updateCustomer(int id, CustomerDTO customerDTO) throws CustomerException, AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        if (!this.customerRepository.existsById(id)){
            throw new CustomerException((ErrorMessage.ID_NOT_FOUND));
        }

        if(this.customerRepository.existsByEmail(customerDTO.getEmail()) && this.customerRepository.findByEmail(customerDTO.getEmail()).getId() != id){
            throw new CustomerException(ErrorMessage.EMAIL_EXIST);
        }

        Customer customer = this.modelMapper.map(customerDTO, Customer.class);
        customer.setId(id);
        customer.setEmail(customerDTO.getEmail());
        customer.setFirstName(customerDTO.getFirstName());
        customer.setLastName(customerDTO.getLastName());
        this.customerRepository.save(customer);
    }

    /*
        The function gets a customer's id and deletes the customer from the database, from the table: customers
        To delete a customer you have to enter an id that exists in customers table
        The function deletes the customer and all the customer's purchase history
    */
    @Override
    public void deleteCustomer(int id) throws CustomerException, AuthorizationException {
        this.validateClient.validateUserIsAdmin();

        if (!this.customerRepository.existsById(id)) {
            throw new CustomerException(ErrorMessage.ID_NOT_FOUND);
        }
        this.customerRepository.deleteById(id);
    }

    // function that receives customer and builds the properties of the token
    @Override
    public Map<String, Object> buildClaims(CustomerDTO customerDTO) {
        Customer customer = this.modelMapper.map(customerDTO, Customer.class);
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", customer.getId());
        claims.put("email", customer.getEmail());
        claims.put("firstName", customer.getFirstName());
        claims.put("lastName", customer.getLastName());
        return claims;
    }

    @Override
    public Customer findByEmail(String email) {
        return this.customerRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmailAndPassword(String email, String password){
        return this.customerRepository.existsByEmailAndPassword(email, password);
    }

    @Override
    public boolean isExist(Customer customer){
        return this.customerRepository.existsById(customer.getId());
    }
}
