package com.ds.recetasapp.controller;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ds.recetasapp.domain.User;
import com.ds.recetasapp.payload.request.ProfileRequest;
import com.ds.recetasapp.payload.response.MessageResponse;
import com.ds.recetasapp.service.FileStorageService;
import com.ds.recetasapp.service.RecipeService;
import com.ds.recetasapp.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private RecipeService recipeService;
	
	@Autowired
	private FileStorageService fileStorageService;

	@GetMapping
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsers());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getUser(@PathVariable UUID id) {
		Optional<User> user = userService.getUserById(id);

		if (user.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(user.get());
	}

	@GetMapping("/{id}/recipes")
	public ResponseEntity<?> getUserRecipes(@PathVariable UUID id,
			@PageableDefault(page = 0, size = 2) Pageable pageable) {
		Optional<User> user = userService.getUserById(id);

		if (user.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(recipeService.getByAuthorId(user.get().getId(), pageable));
	}

	@PutMapping("/{id}/profile-image")
	public ResponseEntity<?> updateProfileImage(@PathVariable UUID id,
			@RequestParam("profileImage") MultipartFile profileImage, Principal principal) {

		Optional<User> user = userService.getUserById(id);

		// Check if user exists
		if (user.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		// Check if profile belongs to the authenticated user
		if(!user.get().getUsername().equals(principal.getName())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		// Check if profileImage file is an image
		if(!profileImage.getContentType().startsWith("image/")) {
			return ResponseEntity.badRequest().body(new MessageResponse("El fichero subido no es una imagen"));
		}
		
		// Store the image
		String fileName = fileStorageService.storeFile(profileImage);
		
		// TODO: Delete current profile image if exists...
		
		// Update the user
		user.get().setProfileImage(fileName);
		userService.save(user.get());
		
		return ResponseEntity.ok(user.get());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateProfile(@PathVariable UUID id, @Valid @RequestBody ProfileRequest profile, Principal principal) {
		Optional<User> user = userService.getUserById(id);

		// Check if user exists
		if (user.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		// Check if profile belongs to the authenticated user
		if(!user.get().getUsername().equals(principal.getName())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		// Update user's profile
		user.get().setFullname(profile.getFullname());
		user.get().setDescription(profile.getDescription());
		User updatedUser = userService.save(user.get());
		
		return ResponseEntity.ok(updatedUser);
	}
}
