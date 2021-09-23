package com.ds.recetasapp.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ds.recetasapp.domain.User;

public interface UserRepository extends MongoRepository<User, UUID> {

	Optional<User> findByUsername(String username);
	
	Boolean existsByUsername(String username);
	
}
