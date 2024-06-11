package com.practice.task.constraints;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StatusValidator implements ConstraintValidator<StatusConstraint, String> {

    @Override
    public void initialize(StatusConstraint status) {
    }

    @Override
    public boolean isValid(String status, ConstraintValidatorContext cxt) {
        return status.equals("TO DO") || status.equals("IN PROGRESS") 
            || status.equals("DONE");
    }
}
