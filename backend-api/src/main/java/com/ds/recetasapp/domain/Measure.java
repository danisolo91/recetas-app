package com.ds.recetasapp.domain;

public enum Measure {
	UNITS("Unidades"), 
	GRAMS("Gramos"), 
	KILOGRAMS("Kilogramos"), 
	LITERS("Litros"), 
	TO_TASTE("Al gusto"),
	TABLESPOON("Cuchara"),
	A_PINCH("Una pizca");
	
	private String label;

	private Measure(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
	
}
