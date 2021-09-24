package com.ds.recetasapp.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.ds.recetasapp.domain.Recipe;
import com.ds.recetasapp.domain.StringList;

public interface RecipeService {

	List<Recipe> getAllRecipes();

	Optional<Recipe> getRecipeById(UUID recipeId);
	
	List<Recipe> getByAuthorId(UUID authorId);

	Recipe save(Recipe recipe);

	void delete(UUID recipeId);
	
	StringList getAllFoods();

	StringList getAllTags();
}
