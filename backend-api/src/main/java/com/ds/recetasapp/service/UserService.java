package com.ds.recetasapp.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import com.ds.recetasapp.domain.User;

public interface UserService {

	Boolean existsByUsername(String username);
	
	Optional<User> getByUsername(String username);
	
	List<User> getAllUsers();
	
	Optional<User> getUserById(UUID userId);

	User save(User user);

	void delete(UUID userId);
	
	List<Map<String, String>> getAllRoles();

}
