package com.ds.recetasapp.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.ds.recetasapp.domain.User;
import com.ds.recetasapp.repository.UserRepository;

public class ExistingAuthorValidator implements ConstraintValidator<ExistingAuthor, User> {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public boolean isValid(User value, ConstraintValidatorContext context) {
		return userRepository.existsById(value.getId());
	}

}
