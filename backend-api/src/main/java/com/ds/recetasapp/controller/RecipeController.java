package com.ds.recetasapp.controller;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.recetasapp.domain.Recipe;
import com.ds.recetasapp.payload.response.MessageResponse;
import com.ds.recetasapp.service.RecipeService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

	@Autowired
	private RecipeService recipeService;
	
	@GetMapping
	public ResponseEntity<?> getAllRecipes() {
		return ResponseEntity.ok(recipeService.getAllRecipes());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getRecipeById(@PathVariable UUID id) {
		Optional<Recipe> recipe = recipeService.getRecipeById(id);
		
		if(recipe.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(recipe.get());
	}
	
	@PostMapping
	public ResponseEntity<?> addRecipe(@Valid @RequestBody Recipe recipe) {
		Recipe recipeDb = recipeService.save(recipe);
		return ResponseEntity.created(URI.create("/api/recipes/" + recipeDb.getId())).build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateRecipe(@PathVariable UUID id, @Valid @RequestBody Recipe recipe) {
		Optional<Recipe> recipeDb = recipeService.getRecipeById(id);
		
		if(recipeDb.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		// Check if logged user is author of the recipe
		if(!recipeDb.get().getAuthor().getUsername().equals(userDetails.getUsername())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		// Set the URL id to the received recipe
		recipe.setId(id);
		
		// Save changes
		recipeService.save(recipe);
		
		return ResponseEntity.ok(new MessageResponse("Receta actualizada!"));	
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteRecipe(@PathVariable UUID id) {
		Optional<Recipe> recipeDb = recipeService.getRecipeById(id);
		
		if(recipeDb.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		recipeService.delete(id);
		
		return ResponseEntity.ok(new MessageResponse("Receta eliminada!"));	
	}
	
	@GetMapping("/foods")
	public ResponseEntity<?> getAllFoods() {
		return ResponseEntity.ok(recipeService.getAllFoods());
	}
	
	@GetMapping("/tags")
	public ResponseEntity<?> getAllTags() {
		return ResponseEntity.ok(recipeService.getAllTags());
	}
}
