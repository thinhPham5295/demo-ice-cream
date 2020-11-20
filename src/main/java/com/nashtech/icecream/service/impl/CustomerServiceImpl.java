package com.nashtech.icecream.service.impl;

import com.nashtech.icecream.domain.Customer;
import com.nashtech.icecream.repository.CustomerRepository;
import com.nashtech.icecream.service.CustomerService;
import com.nashtech.icecream.service.dto.CustomerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Page<Customer> search(Optional<String> searchKey, Pageable pageable) {
        Page<Customer> customers = customerRepository.findByUsername(searchKey.isPresent() ? searchKey.get() :  null, pageable);
        return customers;
    }

    @Override
    public Optional<Customer> findById(Long id) {
        return customerRepository.findById(id);
    }
}
