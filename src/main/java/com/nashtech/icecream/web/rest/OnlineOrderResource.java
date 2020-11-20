package com.nashtech.icecream.web.rest;

import com.nashtech.icecream.domain.OnlineOrder;
import com.nashtech.icecream.repository.OnlineOrderRepository;
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
 * REST controller for managing {@link com.nashtech.icecream.domain.OnlineOrder}.
 */
@RestController
@RequestMapping("/api")
public class OnlineOrderResource {

    private final Logger log = LoggerFactory.getLogger(OnlineOrderResource.class);

    private static final String ENTITY_NAME = "onlineOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OnlineOrderRepository onlineOrderRepository;

    public OnlineOrderResource(OnlineOrderRepository onlineOrderRepository) {
        this.onlineOrderRepository = onlineOrderRepository;
    }

    /**
     * {@code POST  /online-orders} : Create a new onlineOrder.
     *
     * @param onlineOrder the onlineOrder to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new onlineOrder, or with status {@code 400 (Bad Request)} if the onlineOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/online-orders")
    public ResponseEntity<OnlineOrder> createOnlineOrder(@RequestBody OnlineOrder onlineOrder) throws URISyntaxException {
        log.debug("REST request to save OnlineOrder : {}", onlineOrder);
        if (onlineOrder.getId() != null) {
            throw new BadRequestAlertException("A new onlineOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OnlineOrder result = onlineOrderRepository.save(onlineOrder);
        return ResponseEntity.created(new URI("/api/online-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /online-orders} : Updates an existing onlineOrder.
     *
     * @param onlineOrder the onlineOrder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated onlineOrder,
     * or with status {@code 400 (Bad Request)} if the onlineOrder is not valid,
     * or with status {@code 500 (Internal Server Error)} if the onlineOrder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/online-orders")
    public ResponseEntity<OnlineOrder> updateOnlineOrder(@RequestBody OnlineOrder onlineOrder) throws URISyntaxException {
        log.debug("REST request to update OnlineOrder : {}", onlineOrder);
        if (onlineOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OnlineOrder result = onlineOrderRepository.save(onlineOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, onlineOrder.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /online-orders} : get all the onlineOrders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of onlineOrders in body.
     */
    @GetMapping("/online-orders")
    public List<OnlineOrder> getAllOnlineOrders() {
        log.debug("REST request to get all OnlineOrders");
        return onlineOrderRepository.findAll();
    }

    /**
     * {@code GET  /online-orders/:id} : get the "id" onlineOrder.
     *
     * @param id the id of the onlineOrder to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the onlineOrder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/online-orders/{id}")
    public ResponseEntity<OnlineOrder> getOnlineOrder(@PathVariable Long id) {
        log.debug("REST request to get OnlineOrder : {}", id);
        Optional<OnlineOrder> onlineOrder = onlineOrderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(onlineOrder);
    }

    /**
     * {@code DELETE  /online-orders/:id} : delete the "id" onlineOrder.
     *
     * @param id the id of the onlineOrder to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/online-orders/{id}")
    public ResponseEntity<Void> deleteOnlineOrder(@PathVariable Long id) {
        log.debug("REST request to delete OnlineOrder : {}", id);
        onlineOrderRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
