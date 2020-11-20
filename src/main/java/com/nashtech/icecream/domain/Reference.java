package com.nashtech.icecream.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A Reference.
 */
@Entity
@Table(name = "reference")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reference implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "monthly_fee", precision = 21, scale = 2)
    private BigDecimal monthlyFee;

    @Column(name = "yearly_fee", precision = 21, scale = 2)
    private BigDecimal yearlyFee;

    @Column(name = "book_cost", precision = 21, scale = 2)
    private BigDecimal bookCost;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMonthlyFee() {
        return monthlyFee;
    }

    public Reference monthlyFee(BigDecimal monthlyFee) {
        this.monthlyFee = monthlyFee;
        return this;
    }

    public void setMonthlyFee(BigDecimal monthlyFee) {
        this.monthlyFee = monthlyFee;
    }

    public BigDecimal getYearlyFee() {
        return yearlyFee;
    }

    public Reference yearlyFee(BigDecimal yearlyFee) {
        this.yearlyFee = yearlyFee;
        return this;
    }

    public void setYearlyFee(BigDecimal yearlyFee) {
        this.yearlyFee = yearlyFee;
    }

    public BigDecimal getBookCost() {
        return bookCost;
    }

    public Reference bookCost(BigDecimal bookCost) {
        this.bookCost = bookCost;
        return this;
    }

    public void setBookCost(BigDecimal bookCost) {
        this.bookCost = bookCost;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reference)) {
            return false;
        }
        return id != null && id.equals(((Reference) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Reference{" +
            "id=" + getId() +
            ", monthlyFee=" + getMonthlyFee() +
            ", yearlyFee=" + getYearlyFee() +
            ", bookCost=" + getBookCost() +
            "}";
    }
}
