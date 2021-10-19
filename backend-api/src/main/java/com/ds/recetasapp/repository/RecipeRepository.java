package com.ds.recetasapp.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ds.recetasapp.domain.Recipe;
import com.ds.recetasapp.domain.StringList;

public interface RecipeRepository extends MongoRepository<Recipe, UUID>{

	@Aggregation(pipeline = {
			"{ $group: { _id: '$ingredients.food' } }",
			"{ $project: {_id: 0, values: '$_id' } }"
	})
	StringList findDistinctIngredientFoods();
	
	@Aggregation(pipeline = {
			"{ $group: { _id: '$tags' } }",
			"{ $project: { _id: 0, values: '$_id' } }"
	})
	StringList findDistinctTags();
		
	@Aggregation(pipeline = {
			"{ $match: { 'author.id' : ?0 } }",
			"{ $sort : { 'createdAt' : -1 } }"
	})
	List<Recipe> findAllByAuthorIdOrderByCreatedAtAsc(UUID authorId);	
	
	List<Recipe> findAllByOrderByCreatedAtDesc();
	
	List<Recipe> findAllByCategory(String category);
	
	List<Recipe> findFirst5ByOrderByCreatedAtDesc();
	
}
