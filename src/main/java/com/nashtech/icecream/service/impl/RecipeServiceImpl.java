package com.nashtech.icecream.service.impl;

import com.nashtech.icecream.domain.Recipe;
import com.nashtech.icecream.repository.RecipeRepository;
import com.nashtech.icecream.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RecipeServiceImpl implements RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Page<Recipe> findAll(Pageable pageable) {
        return recipeRepository.findAll(pageable);
    }
}
