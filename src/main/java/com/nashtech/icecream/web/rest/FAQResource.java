package com.nashtech.icecream.web.rest;

import com.nashtech.icecream.domain.FAQ;
import com.nashtech.icecream.repository.FAQRepository;
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
 * REST controller for managing {@link com.nashtech.icecream.domain.FAQ}.
 */
@RestController
@RequestMapping("/api")
public class FAQResource {

    private final Logger log = LoggerFactory.getLogger(FAQResource.class);

    private static final String ENTITY_NAME = "fAQ";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FAQRepository fAQRepository;

    public FAQResource(FAQRepository fAQRepository) {
        this.fAQRepository = fAQRepository;
    }

    /**
     * {@code POST  /faqs} : Create a new fAQ.
     *
     * @param fAQ the fAQ to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fAQ, or with status {@code 400 (Bad Request)} if the fAQ has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/faqs")
    public ResponseEntity<FAQ> createFAQ(@RequestBody FAQ fAQ) throws URISyntaxException {
        log.debug("REST request to save FAQ : {}", fAQ);
        if (fAQ.getId() != null) {
            throw new BadRequestAlertException("A new fAQ cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FAQ result = fAQRepository.save(fAQ);
        return ResponseEntity.created(new URI("/api/faqs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /faqs} : Updates an existing fAQ.
     *
     * @param fAQ the fAQ to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fAQ,
     * or with status {@code 400 (Bad Request)} if the fAQ is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fAQ couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/faqs")
    public ResponseEntity<FAQ> updateFAQ(@RequestBody FAQ fAQ) throws URISyntaxException {
        log.debug("REST request to update FAQ : {}", fAQ);
        if (fAQ.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FAQ result = fAQRepository.save(fAQ);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, fAQ.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /faqs} : get all the fAQS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fAQS in body.
     */
    @GetMapping("/faqs")
    public List<FAQ> getAllFAQS() {
        log.debug("REST request to get all FAQS");
        return fAQRepository.findAll();
    }

    /**
     * {@code GET  /faqs/:id} : get the "id" fAQ.
     *
     * @param id the id of the fAQ to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fAQ, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/faqs/{id}")
    public ResponseEntity<FAQ> getFAQ(@PathVariable Long id) {
        log.debug("REST request to get FAQ : {}", id);
        Optional<FAQ> fAQ = fAQRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fAQ);
    }

    /**
     * {@code DELETE  /faqs/:id} : delete the "id" fAQ.
     *
     * @param id the id of the fAQ to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/faqs/{id}")
    public ResponseEntity<Void> deleteFAQ(@PathVariable Long id) {
        log.debug("REST request to delete FAQ : {}", id);
        fAQRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
