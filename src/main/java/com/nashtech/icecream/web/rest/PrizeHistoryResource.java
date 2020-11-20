package com.nashtech.icecream.web.rest;

import com.nashtech.icecream.domain.PrizeHistory;
import com.nashtech.icecream.repository.PrizeHistoryRepository;
import com.nashtech.icecream.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.nashtech.icecream.domain.PrizeHistory}.
 */
@RestController
@RequestMapping("/api")
public class PrizeHistoryResource {

    private final Logger log = LoggerFactory.getLogger(PrizeHistoryResource.class);

    private static final String ENTITY_NAME = "prizeHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrizeHistoryRepository prizeHistoryRepository;

    public PrizeHistoryResource(PrizeHistoryRepository prizeHistoryRepository) {
        this.prizeHistoryRepository = prizeHistoryRepository;
    }

    /**
     * {@code POST  /prize-histories} : Create a new prizeHistory.
     *
     * @param prizeHistory the prizeHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prizeHistory, or with status {@code 400 (Bad Request)} if the prizeHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prize-histories")
    public ResponseEntity<PrizeHistory> createPrizeHistory(@RequestBody PrizeHistory prizeHistory) throws URISyntaxException {
        log.debug("REST request to save PrizeHistory : {}", prizeHistory);
        if (prizeHistory.getId() != null) {
            throw new BadRequestAlertException("A new prizeHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrizeHistory result = prizeHistoryRepository.save(prizeHistory);
        return ResponseEntity.created(new URI("/api/prize-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prize-histories} : Updates an existing prizeHistory.
     *
     * @param prizeHistory the prizeHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prizeHistory,
     * or with status {@code 400 (Bad Request)} if the prizeHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prizeHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prize-histories")
    public ResponseEntity<PrizeHistory> updatePrizeHistory(@RequestBody PrizeHistory prizeHistory) throws URISyntaxException {
        log.debug("REST request to update PrizeHistory : {}", prizeHistory);
        if (prizeHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrizeHistory result = prizeHistoryRepository.save(prizeHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, prizeHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prize-histories} : get all the prizeHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prizeHistories in body.
     */
    @GetMapping("/prize-histories")
    public List<PrizeHistory> getAllPrizeHistories() {
        log.debug("REST request to get all PrizeHistories");
        return prizeHistoryRepository.findAll();
    }

    /**
     * {@code GET  /prize-histories/:id} : get the "id" prizeHistory.
     *
     * @param id the id of the prizeHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prizeHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prize-histories/{id}")
    public ResponseEntity<PrizeHistory> getPrizeHistory(@PathVariable Long id) {
        log.debug("REST request to get PrizeHistory : {}", id);
        Optional<PrizeHistory> prizeHistory = prizeHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prizeHistory);
    }

    /**
     * {@code DELETE  /prize-histories/:id} : delete the "id" prizeHistory.
     *
     * @param id the id of the prizeHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prize-histories/{id}")
    public ResponseEntity<Void> deletePrizeHistory(@PathVariable Long id) {
        log.debug("REST request to delete PrizeHistory : {}", id);
        prizeHistoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
