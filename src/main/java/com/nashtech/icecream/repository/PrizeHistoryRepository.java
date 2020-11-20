package com.nashtech.icecream.repository;

import com.nashtech.icecream.domain.PrizeHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PrizeHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrizeHistoryRepository extends JpaRepository<PrizeHistory, Long> {

}
