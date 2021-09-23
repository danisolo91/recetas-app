package com.ds.recetasapp.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.recetasapp.domain.Recipe;
import com.ds.recetasapp.domain.StringList;
import com.ds.recetasapp.repository.RecipeRepository;

@Service
public class RecipeServiceImpl implements RecipeService {

	@Autowired
	private RecipeRepository recipeRepository;

	@Override
	public List<Recipe> getAllRecipes() {
		return recipeRepository.findAll();
	}

	@Override
	public Optional<Recipe> getRecipeById(UUID recipeId) {
		return recipeRepository.findById(recipeId);
	}

	@Override
	public Recipe save(Recipe recipe) {
		return recipeRepository.save(recipe);
	}

	@Override
	public void delete(UUID recipeId) {
		recipeRepository.deleteById(recipeId);
	}

	@Override
	public StringList getAllFoods() {
		return recipeRepository.findDistinctIngredientFoods();
	}

	@Override
	public StringList getAllTags() {
		return recipeRepository.findDistinctTags();
	}
	
	
}
