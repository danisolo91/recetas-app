package com.ds.recetasapp.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.recetasapp.domain.Category;
import com.ds.recetasapp.domain.Recipe;
import com.ds.recetasapp.domain.StringList;
import com.ds.recetasapp.repository.RecipeRepository;

@Service
public class RecipeServiceImpl implements RecipeService {

	@Autowired
	private RecipeRepository recipeRepository;

	@Override
	public List<Recipe> getAllRecipes() {
		return recipeRepository.findAllByOrderByCreatedAtDesc();
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
	
	@Override
	public StringList getAllCategories() {
		return new StringList(Arrays.stream(Category.values())
				.map(c -> c.getName())
				.collect(Collectors.toList()));
	}

	@Override
	public List<Recipe> getByAuthorId(UUID authorId) {
		return recipeRepository.findAllByAuthorIdOrderByCreatedAtAsc(authorId);
	}

	@Override
	public List<Recipe> getAllRecipesByCategory(String category) {
		return recipeRepository.findAllByCategory(category);
	}

	@Override
	public List<Recipe> getLatestRecipes() {
		return recipeRepository.findFirst5ByOrderByCreatedAtDesc();
	}
	
}
