package com.ds.recetasapp.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ProfileRequest {

	@NotBlank
	@Size(min = 3, max = 45)
	private String fullname;
	
	@Size(min = 1, max = 140)
	private String description;

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
