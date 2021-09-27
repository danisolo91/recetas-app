package com.ds.recetasapp.domain;

public enum Category {
	HEALTHY("Saludable"), ORGANIC("Orgánica"), VEGETARIAN("Vegetariana");
	
	private String name;

	private Category(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
