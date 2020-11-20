package com.nashtech.icecream.service.dto;

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

    private String username;

    private String fullName;

    private String email;

    private LocalDate expiredDate;

    private Boolean enableStatus;
}
