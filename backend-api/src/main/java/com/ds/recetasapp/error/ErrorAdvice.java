package com.ds.recetasapp.error;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ds.recetasapp.exception.ArgumentNotValidException;

@RestControllerAdvice
public class ErrorAdvice {
  
  @ExceptionHandler(MethodArgumentNotValidException.class)
  //@ResponseStatus(HttpStatus.BAD_REQUEST)
  public ResponseEntity<?> handleMethodArgNotValid(MethodArgumentNotValidException exception, HttpServletRequest request){
    ValidationError error = new ValidationError(400, exception.getMessage(), request.getServletPath());
    BindingResult bindingResult = exception.getBindingResult();
    Map<String, String> validationErrors = new HashMap<>();
    
    for(FieldError fieldError: bindingResult.getFieldErrors()){
      validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
    }
    
    error.setValidationErrors(validationErrors);
    
    return ResponseEntity.badRequest().body(error);
  }
  
  @ExceptionHandler(ArgumentNotValidException.class)
  public ResponseEntity<?> handleArgumentNotValidException(ArgumentNotValidException exception, HttpServletRequest request) {
	  ApiError error = new ApiError(600, exception.getMessage(), request.getServletPath());
	  return ResponseEntity.badRequest().body(error);
  }

}