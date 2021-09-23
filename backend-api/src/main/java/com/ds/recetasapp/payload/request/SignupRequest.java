package com.ds.recetasapp.payload.request;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.ds.recetasapp.domain.Role;

public class SignupRequest {
	@NotBlank
	@Size(max = 50)
	@Email
    private String username;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
 
    @NotBlank
	@Size(max = 45)
	private String fullname;
    
    private List<Role> roles = new ArrayList<>();

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
    
}
