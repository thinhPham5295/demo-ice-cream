package com.nashtech.icecream.web.rest;

import com.nashtech.icecream.IcecreamApp;
import com.nashtech.icecream.domain.PrizeHistory;
import com.nashtech.icecream.repository.PrizeHistoryRepository;
import com.nashtech.icecream.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.nashtech.icecream.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PrizeHistoryResource} REST controller.
 */
@SpringBootTest(classes = IcecreamApp.class)
public class PrizeHistoryResourceIT {

    private static final Boolean DEFAULT_ENABLE_STATUS = false;
    private static final Boolean UPDATED_ENABLE_STATUS = true;

    @Autowired
    private PrizeHistoryRepository prizeHistoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPrizeHistoryMockMvc;

    private PrizeHistory prizeHistory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrizeHistoryResource prizeHistoryResource = new PrizeHistoryResource(prizeHistoryRepository);
        this.restPrizeHistoryMockMvc = MockMvcBuilders.standaloneSetup(prizeHistoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrizeHistory createEntity(EntityManager em) {
        PrizeHistory prizeHistory = new PrizeHistory()
            .enableStatus(DEFAULT_ENABLE_STATUS);
        return prizeHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrizeHistory createUpdatedEntity(EntityManager em) {
        PrizeHistory prizeHistory = new PrizeHistory()
            .enableStatus(UPDATED_ENABLE_STATUS);
        return prizeHistory;
    }

    @BeforeEach
    public void initTest() {
        prizeHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrizeHistory() throws Exception {
        int databaseSizeBeforeCreate = prizeHistoryRepository.findAll().size();

        // Create the PrizeHistory
        restPrizeHistoryMockMvc.perform(post("/api/prize-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prizeHistory)))
            .andExpect(status().isCreated());

        // Validate the PrizeHistory in the database
        List<PrizeHistory> prizeHistoryList = prizeHistoryRepository.findAll();
        assertThat(prizeHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        PrizeHistory testPrizeHistory = prizeHistoryList.get(prizeHistoryList.size() - 1);
        assertThat(testPrizeHistory.isEnableStatus()).isEqualTo(DEFAULT_ENABLE_STATUS);
    }

    @Test
    @Transactional
    public void createPrizeHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prizeHistoryRepository.findAll().size();

        // Create the PrizeHistory with an existing ID
        prizeHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrizeHistoryMockMvc.perform(post("/api/prize-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prizeHistory)))
            .andExpect(status().isBadRequest());

        // Validate the PrizeHistory in the database
        List<PrizeHistory> prizeHistoryList = prizeHistoryRepository.findAll();
        assertThat(prizeHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPrizeHistories() throws Exception {
        // Initialize the database
        prizeHistoryRepository.saveAndFlush(prizeHistory);

        // Get all the prizeHistoryList
        restPrizeHistoryMockMvc.perform(get("/api/prize-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prizeHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].enableStatus").value(hasItem(DEFAULT_ENABLE_STATUS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPrizeHistory() throws Exception {
        // Initialize the database
        prizeHistoryRepository.saveAndFlush(prizeHistory);

        // Get the prizeHistory
        restPrizeHistoryMockMvc.perform(get("/api/prize-histories/{id}", prizeHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prizeHistory.getId().intValue()))
            .andExpect(jsonPath("$.enableStatus").value(DEFAULT_ENABLE_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrizeHistory() throws Exception {
        // Get the prizeHistory
        restPrizeHistoryMockMvc.perform(get("/api/prize-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrizeHistory() throws Exception {
        // Initialize the database
        prizeHistoryRepository.saveAndFlush(prizeHistory);

        int databaseSizeBeforeUpdate = prizeHistoryRepository.findAll().size();

        // Update the prizeHistory
        PrizeHistory updatedPrizeHistory = prizeHistoryRepository.findById(prizeHistory.getId()).get();
        // Disconnect from session so that the updates on updatedPrizeHistory are not directly saved in db
        em.detach(updatedPrizeHistory);
        updatedPrizeHistory
            .enableStatus(UPDATED_ENABLE_STATUS);

        restPrizeHistoryMockMvc.perform(put("/api/prize-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrizeHistory)))
            .andExpect(status().isOk());

        // Validate the PrizeHistory in the database
        List<PrizeHistory> prizeHistoryList = prizeHistoryRepository.findAll();
        assertThat(prizeHistoryList).hasSize(databaseSizeBeforeUpdate);
        PrizeHistory testPrizeHistory = prizeHistoryList.get(prizeHistoryList.size() - 1);
        assertThat(testPrizeHistory.isEnableStatus()).isEqualTo(UPDATED_ENABLE_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingPrizeHistory() throws Exception {
        int databaseSizeBeforeUpdate = prizeHistoryRepository.findAll().size();

        // Create the PrizeHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrizeHistoryMockMvc.perform(put("/api/prize-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prizeHistory)))
            .andExpect(status().isBadRequest());

        // Validate the PrizeHistory in the database
        List<PrizeHistory> prizeHistoryList = prizeHistoryRepository.findAll();
        assertThat(prizeHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrizeHistory() throws Exception {
        // Initialize the database
        prizeHistoryRepository.saveAndFlush(prizeHistory);

        int databaseSizeBeforeDelete = prizeHistoryRepository.findAll().size();

        // Delete the prizeHistory
        restPrizeHistoryMockMvc.perform(delete("/api/prize-histories/{id}", prizeHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PrizeHistory> prizeHistoryList = prizeHistoryRepository.findAll();
        assertThat(prizeHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrizeHistory.class);
        PrizeHistory prizeHistory1 = new PrizeHistory();
        prizeHistory1.setId(1L);
        PrizeHistory prizeHistory2 = new PrizeHistory();
        prizeHistory2.setId(prizeHistory1.getId());
        assertThat(prizeHistory1).isEqualTo(prizeHistory2);
        prizeHistory2.setId(2L);
        assertThat(prizeHistory1).isNotEqualTo(prizeHistory2);
        prizeHistory1.setId(null);
        assertThat(prizeHistory1).isNotEqualTo(prizeHistory2);
    }
}
