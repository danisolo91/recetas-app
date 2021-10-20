package com.ds.recetasapp.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ds.recetasapp.domain.Recipe;
import com.ds.recetasapp.domain.StringList;

public interface RecipeService {

	Page<Recipe> getAllRecipes(Pageable pageable);
	
	List<Recipe> getLatestRecipes();
	
	Page<Recipe> getAllRecipesByCategory(String category, Pageable pageable);

	Optional<Recipe> getRecipeById(UUID recipeId);
	
	Page<Recipe> getByAuthorId(UUID authorId, Pageable pageable);

	Recipe save(Recipe recipe);

	void delete(UUID recipeId);
	
	StringList getAllFoods();

	StringList getAllTags();
	
	StringList getAllCategories();
}
