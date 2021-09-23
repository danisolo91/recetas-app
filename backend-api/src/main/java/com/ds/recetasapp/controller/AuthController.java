package com.ds.recetasapp.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.recetasapp.domain.Role;
import com.ds.recetasapp.domain.User;
import com.ds.recetasapp.payload.request.LoginRequest;
import com.ds.recetasapp.payload.request.SignupRequest;
import com.ds.recetasapp.payload.response.JwtResponse;
import com.ds.recetasapp.payload.response.MessageResponse;
import com.ds.recetasapp.security.jwt.JwtUtils;
import com.ds.recetasapp.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> signin(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		
		Optional<User> user = userService.getByUsername(userDetails.getUsername());

		return ResponseEntity.ok(new JwtResponse(jwt, user.get()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userService.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: el email ya está registrado!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getFullname(), signUpRequest.getUsername(),
				encoder.encode(signUpRequest.getPassword()));

		List<Role> strRoles = signUpRequest.getRoles();

		if (strRoles.size() == 0) {
			user.setRoles(Arrays.asList(Role.ROLE_USER));
		} else {
			user.setRoles(strRoles);
		}

		userService.save(user);

		return ResponseEntity.ok(new MessageResponse("Usuario registrado!"));
	}

}
