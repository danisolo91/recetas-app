package com.ds.recetasapp.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ds.recetasapp.domain.Role;
import com.ds.recetasapp.domain.User;
import com.ds.recetasapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		
		user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.name())));
		
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
	}
	
	@Override
	public Boolean existsByUsername(String username) {
		return userRepository.existsByUsername(username);
	}
	
	@Override
	public Optional<User> getByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public Optional<User> getUserById(UUID userId) {
		return userRepository.findById(userId);
	}

	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public void delete(UUID userId) {
		userRepository.deleteById(userId);
	}

	@Override
	public List<Map<String, String>> getAllRoles() {
		List<Map<String, String>> roles = new ArrayList<>();
		
		Arrays.asList(Role.values()).forEach(r -> {
			Map<String, String> role = new HashMap<>();
			role.put("role", r.name());
			role.put("name", r.getName());
			roles.add(role);
		});
		
		return roles;
	}

}
