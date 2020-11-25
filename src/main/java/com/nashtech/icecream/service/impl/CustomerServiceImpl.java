package com.nashtech.icecream.service.impl;

import com.nashtech.icecream.domain.Customer;
import com.nashtech.icecream.domain.User;
import com.nashtech.icecream.repository.CustomerRepository;
import com.nashtech.icecream.repository.UserRepository;
import com.nashtech.icecream.service.CustomerService;
import com.nashtech.icecream.service.dto.CustomerDTO;
import com.nashtech.icecream.service.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<CustomerDTO> search(String searchKey, Pageable pageable) {
        return customerRepository.findByUsername(searchKey, pageable).map(CustomerDTO::new);
    }

    @Override
    public Optional<Customer> findById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public void setActivated(CustomerDTO customer) {
    }
}
