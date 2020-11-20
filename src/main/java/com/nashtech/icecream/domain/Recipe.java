package com.nashtech.icecream.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Recipe.
 */
@Entity
@Table(name = "recipe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "desciption")
    private String desciption;

    @Column(name = "details")
    private String details;

    @Column(name = "author")
    private String author;

    @Column(name = "view_number")
    private Long viewNumber;

    @Column(name = "upload_date")
    private LocalDate uploadDate;

    @Column(name = "enable_status")
    private Boolean enableStatus;

    @ManyToOne
    @JsonIgnoreProperties("recipes")
    private Customer customer;

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

    public Recipe name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public Recipe image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDesciption() {
        return desciption;
    }

    public Recipe desciption(String desciption) {
        this.desciption = desciption;
        return this;
    }

    public void setDesciption(String desciption) {
        this.desciption = desciption;
    }

    public String getDetails() {
        return details;
    }

    public Recipe details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getAuthor() {
        return author;
    }

    public Recipe author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Long getViewNumber() {
        return viewNumber;
    }

    public Recipe viewNumber(Long viewNumber) {
        this.viewNumber = viewNumber;
        return this;
    }

    public void setViewNumber(Long viewNumber) {
        this.viewNumber = viewNumber;
    }

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public Recipe uploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
        return this;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Boolean isEnableStatus() {
        return enableStatus;
    }

    public Recipe enableStatus(Boolean enableStatus) {
        this.enableStatus = enableStatus;
        return this;
    }

    public void setEnableStatus(Boolean enableStatus) {
        this.enableStatus = enableStatus;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Recipe customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recipe)) {
            return false;
        }
        return id != null && id.equals(((Recipe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", image='" + getImage() + "'" +
            ", desciption='" + getDesciption() + "'" +
            ", details='" + getDetails() + "'" +
            ", author='" + getAuthor() + "'" +
            ", viewNumber=" + getViewNumber() +
            ", uploadDate='" + getUploadDate() + "'" +
            ", enableStatus='" + isEnableStatus() + "'" +
            "}";
    }
}
