package com.nashtech.icecream.service;

import com.nashtech.icecream.domain.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecipeService {
    Page<Recipe> findAll(Pageable pageable);
}
