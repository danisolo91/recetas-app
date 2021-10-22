package com.ds.recetasapp.domain;

import javax.validation.constraints.NotBlank;

public class Ingredient {

	@NotBlank
	private String food;
	
	@NotBlank
	private String quantity;
	
	public Ingredient() {
		
	}
	
	public Ingredient(String food, String quantity) {
		this.food = food;
		this.quantity = quantity;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "Ingredient [food=" + food + ", quantity=" + quantity + "]";
	}
	
}
