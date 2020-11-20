package com.nashtech.icecream.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * A OnlineOrder.
 */
@Entity
@Table(name = "online_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OnlineOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "contact")
    private String contact;

    @Column(name = "address")
    private String address;

    @Column(name = "book_cost", precision = 21, scale = 2)
    private BigDecimal bookCost;

    @Column(name = "paying_option")
    private String payingOption;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "status")
    private Boolean status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public OnlineOrder name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public OnlineOrder email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public OnlineOrder contact(String contact) {
        this.contact = contact;
        return this;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAddress() {
        return address;
    }

    public OnlineOrder address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getBookCost() {
        return bookCost;
    }

    public OnlineOrder bookCost(BigDecimal bookCost) {
        this.bookCost = bookCost;
        return this;
    }

    public void setBookCost(BigDecimal bookCost) {
        this.bookCost = bookCost;
    }

    public String getPayingOption() {
        return payingOption;
    }

    public OnlineOrder payingOption(String payingOption) {
        this.payingOption = payingOption;
        return this;
    }

    public void setPayingOption(String payingOption) {
        this.payingOption = payingOption;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public OnlineOrder orderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Boolean isStatus() {
        return status;
    }

    public OnlineOrder status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OnlineOrder)) {
            return false;
        }
        return id != null && id.equals(((OnlineOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OnlineOrder{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", contact='" + getContact() + "'" +
            ", address='" + getAddress() + "'" +
            ", bookCost=" + getBookCost() +
            ", payingOption='" + getPayingOption() + "'" +
            ", orderDate='" + getOrderDate() + "'" +
            ", status='" + isStatus() + "'" +
            "}";
    }
}
