package com.ds.recetasapp.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipes")
public class Recipe {

	@Id
	private UUID id;
	
	@NotBlank
	@Size(max = 45)
	private String title;
	private String image;
	private String description;
	private String category;
	
	@NotNull
	private List<Ingredient> ingredients = new ArrayList<>();
	private List<String> tags = new ArrayList<>();
	private Date createdAt;
	
	@NotNull
	private User author;

	public Recipe() {
		this.id = UUID.randomUUID();
		this.createdAt = new Date();
	}

	public Recipe(String title, String category, List<Ingredient> ingredients, User author) {
		this.id = UUID.randomUUID();
		this.title = title;
		this.category = category;
		this.ingredients = ingredients;
		this.author = author;
		this.createdAt = new Date();
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Recipe [id=" + id + ", title=" + title + ", image=" + image + ", description=" + description
				+ ", ingredients=" + ingredients + ", tags=" + tags + ", createdAt=" + createdAt + ", author=" + author
				+ "]";
	}

}
