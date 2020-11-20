package com.nashtech.icecream.web.rest;

import com.nashtech.icecream.IcecreamApp;
import com.nashtech.icecream.domain.FAQ;
import com.nashtech.icecream.repository.FAQRepository;
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
 * Integration tests for the {@Link FAQResource} REST controller.
 */
@SpringBootTest(classes = IcecreamApp.class)
public class FAQResourceIT {

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    private static final String DEFAULT_QNSWER = "AAAAAAAAAA";
    private static final String UPDATED_QNSWER = "BBBBBBBBBB";

    @Autowired
    private FAQRepository fAQRepository;

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

    private MockMvc restFAQMockMvc;

    private FAQ fAQ;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FAQResource fAQResource = new FAQResource(fAQRepository);
        this.restFAQMockMvc = MockMvcBuilders.standaloneSetup(fAQResource)
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
    public static FAQ createEntity(EntityManager em) {
        FAQ fAQ = new FAQ()
            .question(DEFAULT_QUESTION)
            .qnswer(DEFAULT_QNSWER);
        return fAQ;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FAQ createUpdatedEntity(EntityManager em) {
        FAQ fAQ = new FAQ()
            .question(UPDATED_QUESTION)
            .qnswer(UPDATED_QNSWER);
        return fAQ;
    }

    @BeforeEach
    public void initTest() {
        fAQ = createEntity(em);
    }

    @Test
    @Transactional
    public void createFAQ() throws Exception {
        int databaseSizeBeforeCreate = fAQRepository.findAll().size();

        // Create the FAQ
        restFAQMockMvc.perform(post("/api/faqs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fAQ)))
            .andExpect(status().isCreated());

        // Validate the FAQ in the database
        List<FAQ> fAQList = fAQRepository.findAll();
        assertThat(fAQList).hasSize(databaseSizeBeforeCreate + 1);
        FAQ testFAQ = fAQList.get(fAQList.size() - 1);
        assertThat(testFAQ.getQuestion()).isEqualTo(DEFAULT_QUESTION);
        assertThat(testFAQ.getQnswer()).isEqualTo(DEFAULT_QNSWER);
    }

    @Test
    @Transactional
    public void createFAQWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fAQRepository.findAll().size();

        // Create the FAQ with an existing ID
        fAQ.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFAQMockMvc.perform(post("/api/faqs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fAQ)))
            .andExpect(status().isBadRequest());

        // Validate the FAQ in the database
        List<FAQ> fAQList = fAQRepository.findAll();
        assertThat(fAQList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFAQS() throws Exception {
        // Initialize the database
        fAQRepository.saveAndFlush(fAQ);

        // Get all the fAQList
        restFAQMockMvc.perform(get("/api/faqs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fAQ.getId().intValue())))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION.toString())))
            .andExpect(jsonPath("$.[*].qnswer").value(hasItem(DEFAULT_QNSWER.toString())));
    }
    
    @Test
    @Transactional
    public void getFAQ() throws Exception {
        // Initialize the database
        fAQRepository.saveAndFlush(fAQ);

        // Get the fAQ
        restFAQMockMvc.perform(get("/api/faqs/{id}", fAQ.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fAQ.getId().intValue()))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION.toString()))
            .andExpect(jsonPath("$.qnswer").value(DEFAULT_QNSWER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFAQ() throws Exception {
        // Get the fAQ
        restFAQMockMvc.perform(get("/api/faqs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFAQ() throws Exception {
        // Initialize the database
        fAQRepository.saveAndFlush(fAQ);

        int databaseSizeBeforeUpdate = fAQRepository.findAll().size();

        // Update the fAQ
        FAQ updatedFAQ = fAQRepository.findById(fAQ.getId()).get();
        // Disconnect from session so that the updates on updatedFAQ are not directly saved in db
        em.detach(updatedFAQ);
        updatedFAQ
            .question(UPDATED_QUESTION)
            .qnswer(UPDATED_QNSWER);

        restFAQMockMvc.perform(put("/api/faqs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFAQ)))
            .andExpect(status().isOk());

        // Validate the FAQ in the database
        List<FAQ> fAQList = fAQRepository.findAll();
        assertThat(fAQList).hasSize(databaseSizeBeforeUpdate);
        FAQ testFAQ = fAQList.get(fAQList.size() - 1);
        assertThat(testFAQ.getQuestion()).isEqualTo(UPDATED_QUESTION);
        assertThat(testFAQ.getQnswer()).isEqualTo(UPDATED_QNSWER);
    }

    @Test
    @Transactional
    public void updateNonExistingFAQ() throws Exception {
        int databaseSizeBeforeUpdate = fAQRepository.findAll().size();

        // Create the FAQ

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFAQMockMvc.perform(put("/api/faqs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fAQ)))
            .andExpect(status().isBadRequest());

        // Validate the FAQ in the database
        List<FAQ> fAQList = fAQRepository.findAll();
        assertThat(fAQList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFAQ() throws Exception {
        // Initialize the database
        fAQRepository.saveAndFlush(fAQ);

        int databaseSizeBeforeDelete = fAQRepository.findAll().size();

        // Delete the fAQ
        restFAQMockMvc.perform(delete("/api/faqs/{id}", fAQ.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FAQ> fAQList = fAQRepository.findAll();
        assertThat(fAQList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FAQ.class);
        FAQ fAQ1 = new FAQ();
        fAQ1.setId(1L);
        FAQ fAQ2 = new FAQ();
        fAQ2.setId(fAQ1.getId());
        assertThat(fAQ1).isEqualTo(fAQ2);
        fAQ2.setId(2L);
        assertThat(fAQ1).isNotEqualTo(fAQ2);
        fAQ1.setId(null);
        assertThat(fAQ1).isNotEqualTo(fAQ2);
    }
}
