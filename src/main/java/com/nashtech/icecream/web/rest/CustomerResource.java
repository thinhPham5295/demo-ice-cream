package com.nashtech.icecream.web.rest;

import com.nashtech.icecream.domain.Authority;
import com.nashtech.icecream.domain.Customer;
import com.nashtech.icecream.security.AuthoritiesConstants;
import com.nashtech.icecream.service.CustomerService;
import com.nashtech.icecream.service.UserService;
import com.nashtech.icecream.service.dto.CustomerDTO;
import com.nashtech.icecream.service.dto.UserDTO;
import com.nashtech.icecream.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.nashtech.icecream.domain.Customer}.
 */
@RestController
@RequestMapping("/api")
@PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
public class CustomerResource {

    private final Logger log = LoggerFactory.getLogger(CustomerResource.class);

    private static final String ENTITY_NAME = "customer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserService userService;

    @Autowired
    private CustomerService customerService;

    public CustomerResource(UserService userService) {
        this.userService = userService;
    }

    /**
     * {@code PUT  /customers} : Updates an existing customer.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customer,
     * or with status {@code 400 (Bad Request)} if the customer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/v1/customers")
    public ResponseEntity<CustomerDTO> updateCustomer(@RequestBody CustomerDTO customerDTO) throws URISyntaxException {
        log.debug("REST request to update Customer : {}", customerDTO);
        if (customerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerDTO result = null;
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /customers} : get all the customers.
     *
     * @param pageable the pagination information.
     * @param searchKey the search key by Username.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customers in body.
     */
    @GetMapping("/v1/customers")
    public ResponseEntity<List<CustomerDTO>> searchCustomer(Pageable pageable, @RequestParam(required = false) String searchKey) {
        log.debug("REST request to search by searchKey and page request of Customers");
        final Page<CustomerDTO> page = customerService.search(searchKey, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /customers/:id} : get the "id" customer.
     *
     * @param id the id of the customer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/v1/customers/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        log.debug("REST request to get Customer : {}", id);
        Optional<Customer> customer = customerService.findById(id);
        return ResponseUtil.wrapOrNotFound(customer);
    }

    /**
     * {@code P  /customers/:id} : get the "id" customer.
     *
     * @param customer the id of the customer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customer, or with status {@code 404 (Not Found)}.
     */
    @PutMapping("/v1/customers/active")
    public void setActivated(@RequestBody CustomerDTO customer) {
        log.debug("REST request to set activated Customer : {}", customer.getLogin());
        customerService.setActivated(customer);
    }

}
