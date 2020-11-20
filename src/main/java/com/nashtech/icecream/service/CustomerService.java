package com.nashtech.icecream.service;

import com.nashtech.icecream.domain.Customer;
import com.nashtech.icecream.service.dto.CustomerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CustomerService {

    Customer save(Customer customer);

    Page<Customer> search(Optional<String> searchKey, Pageable pageable);

    Optional<Customer> findById(Long id);
}
