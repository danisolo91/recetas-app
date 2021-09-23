package com.ds.recetasapp.domain;

public enum Role {
	ROLE_USER("Usuario"), ROLE_MODERATOR("Moderador"), ROLE_ADMIN("Administrador");

	private String name;

	private Role(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
