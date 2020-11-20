package com.nashtech.icecream.web.rest;

import com.nashtech.icecream.IcecreamApp;
import com.nashtech.icecream.domain.OnlineOrder;
import com.nashtech.icecream.repository.OnlineOrderRepository;
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
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.nashtech.icecream.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link OnlineOrderResource} REST controller.
 */
@SpringBootTest(classes = IcecreamApp.class)
public class OnlineOrderResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_BOOK_COST = new BigDecimal(1);
    private static final BigDecimal UPDATED_BOOK_COST = new BigDecimal(2);

    private static final String DEFAULT_PAYING_OPTION = "AAAAAAAAAA";
    private static final String UPDATED_PAYING_OPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ORDER_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ORDER_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    @Autowired
    private OnlineOrderRepository onlineOrderRepository;

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

    private MockMvc restOnlineOrderMockMvc;

    private OnlineOrder onlineOrder;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OnlineOrderResource onlineOrderResource = new OnlineOrderResource(onlineOrderRepository);
        this.restOnlineOrderMockMvc = MockMvcBuilders.standaloneSetup(onlineOrderResource)
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
    public static OnlineOrder createEntity(EntityManager em) {
        OnlineOrder onlineOrder = new OnlineOrder()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .contact(DEFAULT_CONTACT)
            .address(DEFAULT_ADDRESS)
            .bookCost(DEFAULT_BOOK_COST)
            .payingOption(DEFAULT_PAYING_OPTION)
            .orderDate(DEFAULT_ORDER_DATE)
            .status(DEFAULT_STATUS);
        return onlineOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OnlineOrder createUpdatedEntity(EntityManager em) {
        OnlineOrder onlineOrder = new OnlineOrder()
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .contact(UPDATED_CONTACT)
            .address(UPDATED_ADDRESS)
            .bookCost(UPDATED_BOOK_COST)
            .payingOption(UPDATED_PAYING_OPTION)
            .orderDate(UPDATED_ORDER_DATE)
            .status(UPDATED_STATUS);
        return onlineOrder;
    }

    @BeforeEach
    public void initTest() {
        onlineOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createOnlineOrder() throws Exception {
        int databaseSizeBeforeCreate = onlineOrderRepository.findAll().size();

        // Create the OnlineOrder
        restOnlineOrderMockMvc.perform(post("/api/online-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(onlineOrder)))
            .andExpect(status().isCreated());

        // Validate the OnlineOrder in the database
        List<OnlineOrder> onlineOrderList = onlineOrderRepository.findAll();
        assertThat(onlineOrderList).hasSize(databaseSizeBeforeCreate + 1);
        OnlineOrder testOnlineOrder = onlineOrderList.get(onlineOrderList.size() - 1);
        assertThat(testOnlineOrder.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOnlineOrder.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testOnlineOrder.getContact()).isEqualTo(DEFAULT_CONTACT);
        assertThat(testOnlineOrder.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testOnlineOrder.getBookCost()).isEqualTo(DEFAULT_BOOK_COST);
        assertThat(testOnlineOrder.getPayingOption()).isEqualTo(DEFAULT_PAYING_OPTION);
        assertThat(testOnlineOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testOnlineOrder.isStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createOnlineOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = onlineOrderRepository.findAll().size();

        // Create the OnlineOrder with an existing ID
        onlineOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOnlineOrderMockMvc.perform(post("/api/online-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(onlineOrder)))
            .andExpect(status().isBadRequest());

        // Validate the OnlineOrder in the database
        List<OnlineOrder> onlineOrderList = onlineOrderRepository.findAll();
        assertThat(onlineOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOnlineOrders() throws Exception {
        // Initialize the database
        onlineOrderRepository.saveAndFlush(onlineOrder);

        // Get all the onlineOrderList
        restOnlineOrderMockMvc.perform(get("/api/online-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(onlineOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].contact").value(hasItem(DEFAULT_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].bookCost").value(hasItem(DEFAULT_BOOK_COST.intValue())))
            .andExpect(jsonPath("$.[*].payingOption").value(hasItem(DEFAULT_PAYING_OPTION.toString())))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getOnlineOrder() throws Exception {
        // Initialize the database
        onlineOrderRepository.saveAndFlush(onlineOrder);

        // Get the onlineOrder
        restOnlineOrderMockMvc.perform(get("/api/online-orders/{id}", onlineOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(onlineOrder.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.contact").value(DEFAULT_CONTACT.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.bookCost").value(DEFAULT_BOOK_COST.intValue()))
            .andExpect(jsonPath("$.payingOption").value(DEFAULT_PAYING_OPTION.toString()))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOnlineOrder() throws Exception {
        // Get the onlineOrder
        restOnlineOrderMockMvc.perform(get("/api/online-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOnlineOrder() throws Exception {
        // Initialize the database
        onlineOrderRepository.saveAndFlush(onlineOrder);

        int databaseSizeBeforeUpdate = onlineOrderRepository.findAll().size();

        // Update the onlineOrder
        OnlineOrder updatedOnlineOrder = onlineOrderRepository.findById(onlineOrder.getId()).get();
        // Disconnect from session so that the updates on updatedOnlineOrder are not directly saved in db
        em.detach(updatedOnlineOrder);
        updatedOnlineOrder
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .contact(UPDATED_CONTACT)
            .address(UPDATED_ADDRESS)
            .bookCost(UPDATED_BOOK_COST)
            .payingOption(UPDATED_PAYING_OPTION)
            .orderDate(UPDATED_ORDER_DATE)
            .status(UPDATED_STATUS);

        restOnlineOrderMockMvc.perform(put("/api/online-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOnlineOrder)))
            .andExpect(status().isOk());

        // Validate the OnlineOrder in the database
        List<OnlineOrder> onlineOrderList = onlineOrderRepository.findAll();
        assertThat(onlineOrderList).hasSize(databaseSizeBeforeUpdate);
        OnlineOrder testOnlineOrder = onlineOrderList.get(onlineOrderList.size() - 1);
        assertThat(testOnlineOrder.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOnlineOrder.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testOnlineOrder.getContact()).isEqualTo(UPDATED_CONTACT);
        assertThat(testOnlineOrder.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testOnlineOrder.getBookCost()).isEqualTo(UPDATED_BOOK_COST);
        assertThat(testOnlineOrder.getPayingOption()).isEqualTo(UPDATED_PAYING_OPTION);
        assertThat(testOnlineOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testOnlineOrder.isStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingOnlineOrder() throws Exception {
        int databaseSizeBeforeUpdate = onlineOrderRepository.findAll().size();

        // Create the OnlineOrder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOnlineOrderMockMvc.perform(put("/api/online-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(onlineOrder)))
            .andExpect(status().isBadRequest());

        // Validate the OnlineOrder in the database
        List<OnlineOrder> onlineOrderList = onlineOrderRepository.findAll();
        assertThat(onlineOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOnlineOrder() throws Exception {
        // Initialize the database
        onlineOrderRepository.saveAndFlush(onlineOrder);

        int databaseSizeBeforeDelete = onlineOrderRepository.findAll().size();

        // Delete the onlineOrder
        restOnlineOrderMockMvc.perform(delete("/api/online-orders/{id}", onlineOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OnlineOrder> onlineOrderList = onlineOrderRepository.findAll();
        assertThat(onlineOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OnlineOrder.class);
        OnlineOrder onlineOrder1 = new OnlineOrder();
        onlineOrder1.setId(1L);
        OnlineOrder onlineOrder2 = new OnlineOrder();
        onlineOrder2.setId(onlineOrder1.getId());
        assertThat(onlineOrder1).isEqualTo(onlineOrder2);
        onlineOrder2.setId(2L);
        assertThat(onlineOrder1).isNotEqualTo(onlineOrder2);
        onlineOrder1.setId(null);
        assertThat(onlineOrder1).isNotEqualTo(onlineOrder2);
    }
}
