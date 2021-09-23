package com.ds.recetasapp.domain;

import javax.validation.constraints.NotNull;

public class Ingredient {

	@NotNull
	private String food;
	
	@NotNull
	private double quantity;
	
	@NotNull
	private Measure measure;
	
	public Ingredient() {
		
	}
	
	public Ingredient(String food, double quantity, Measure measure) {
		this.food = food;
		this.quantity = quantity;
		this.measure = measure;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public Measure getMeasure() {
		return measure;
	}

	public void setMeasure(Measure measure) {
		this.measure = measure;
	}

	@Override
	public String toString() {
		return "Ingredient [food=" + food + ", quantity=" + quantity + ", measure=" + measure + "]";
	}
	
}
