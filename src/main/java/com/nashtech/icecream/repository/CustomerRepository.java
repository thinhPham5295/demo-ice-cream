package com.nashtech.icecream.repository;

import com.nashtech.icecream.domain.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Customer entity.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("select c " +
        "from Customer c " +
        "left join c.user u " +
        "where (:searchKey is null or lower(u.login) like lower(concat('%',:searchKey,'%')))" +
        "and u.activated = true")
    Page<Customer> findByUsername(@Param("searchKey") String searchKey, Pageable pageable);

}
