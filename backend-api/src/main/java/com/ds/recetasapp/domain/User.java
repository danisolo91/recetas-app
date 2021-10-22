package com.ds.recetasapp.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Document(collection = "users")
public class User {

	@Id
	private UUID id;

	@NotBlank
	@Size(max = 50)
	@Email
	private String username;

	@NotBlank
	@Size(min = 4, max = 120)
	@JsonIgnore
	private String password;

	@NotBlank
	@Size(min = 3, max = 45)
	private String fullname;
	private Date createdAt;
	private List<Role> roles = new ArrayList<>();

	public User() {
		this.id = UUID.randomUUID();
	}

	public User(String fullname, String username, String password) {
		this.id = UUID.randomUUID();
		this.fullname = fullname;
		this.username = username;
		this.password = password;
		this.createdAt = new Date();
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", fullname=" + fullname
				+ ", createdAt=" + createdAt + ", roles=" + roles + "]";
	}

}
