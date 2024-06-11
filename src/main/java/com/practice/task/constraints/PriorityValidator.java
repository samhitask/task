package com.practice.task.constraints;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PriorityValidator implements ConstraintValidator<PriorityConstraint, String> {

    @Override
    public void initialize(PriorityConstraint constraintAnnotation) {
    }

    @Override
    public boolean isValid(String priority, ConstraintValidatorContext cxt) {
        return priority.equals("LOW") || priority.equals("MEDIUM") 
            || priority.equals("HIGH");
    }
}
