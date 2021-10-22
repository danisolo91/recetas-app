package com.ds.recetasapp.validator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistingAuthorValidator.class)
public @interface ExistingAuthor {
	
	String message() default "El autor no existe";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
	
}
