package com.ds.recetasapp.domain;

import java.util.ArrayList;
import java.util.List;

public class StringList {

	private List<String> values = new ArrayList<>();

	public StringList() {
	}

	public StringList(List<String> values) {
		this.values = values;
	}

	public List<String> getValues() {
		return values;
	}

	public void setValues(List<String> values) {
		this.values = values;
	}}
