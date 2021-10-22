package com.ds.recetasapp.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	public Page<Recipe> getAllRecipes(Pageable pageable) {
		return recipeRepository.findAll(pageable);
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
	public Page<Recipe> getByAuthorId(UUID authorId, Pageable pageable) {
		return recipeRepository.findByAuthor_id(authorId, pageable);
	}

	@Override
	public Page<Recipe> getAllRecipesByCategory(String category,Pageable pageable) {
		return recipeRepository.findAllByCategory(category, pageable);
	}

	@Override
	public List<Recipe> getLatestRecipes() {
		return recipeRepository.findFirst5ByOrderByCreatedAtDesc();
	}
	
}
