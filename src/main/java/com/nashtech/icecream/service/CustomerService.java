package com.nashtech.icecream.service;

import com.nashtech.icecream.domain.Customer;
import com.nashtech.icecream.service.dto.CustomerDTO;
import com.nashtech.icecream.service.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CustomerService {

    Page<CustomerDTO> search(String searchKey, Pageable pageable);

    Optional<Customer> findById(Long id);

    void setActivated(CustomerDTO customer);
}
