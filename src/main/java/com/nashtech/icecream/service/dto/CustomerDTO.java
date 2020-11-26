package com.nashtech.icecream.service.dto;

import com.nashtech.icecream.domain.Customer;
import com.nashtech.icecream.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Long id;

    private String login;

    private String fullName;

    private String email;

    private LocalDate expiredDate;

    private Boolean activated;

    public CustomerDTO(Customer customer) {
        this.id = customer.getUser().getId();
        this.login = customer.getUser().getLogin();
        this.activated = customer.getUser().getActivated();
        this.email = customer.getUser().getEmail();
        this.expiredDate = customer.getExpiredDate();
        this.fullName = customer.getFullName();
    }

    public Long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getExpiredDate() {
        return expiredDate;
    }

    public Boolean getActivated() {
        return activated;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setExpiredDate(LocalDate expiredDate) {
        this.expiredDate = expiredDate;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }
}
