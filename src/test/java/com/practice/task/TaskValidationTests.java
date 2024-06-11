package com.practice.task;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class TaskValidationTests {

    @Autowired
    private Validator validator;

    @Test
    public void testValidPriority() {
        Task task = new Task("Sample Task", "Sample Description", "TO DO", null, "MEDIUM");
        Set<ConstraintViolation<Task>> violations = validator.validate(task);
        assertTrue(violations.isEmpty());
    }

    @Test
    public void testInvalidPriority() {
        Task task = new Task("Sample Task", "Sample Description", "TO DO", null, "INVALID");
        Set<ConstraintViolation<Task>> violations = validator.validate(task);
        assertFalse(violations.isEmpty());
        assertEquals("Invalid priority", violations.iterator().next().getMessage());
    }

    @Test
    public void testValidStatus() {
        Task task = new Task("Sample Task", "Sample Description", "TO DO", null, "MEDIUM");
        Set<ConstraintViolation<Task>> violations = validator.validate(task);
        assertTrue(violations.isEmpty());
    }

    @Test
    public void testInvalidStatus() {
        Task task = new Task("Sample Task", "Sample Description", "INVALID", null, "MEDIUM");
        Set<ConstraintViolation<Task>> violations = validator.validate(task);
        assertFalse(violations.isEmpty());
        assertEquals("Invalid status", violations.iterator().next().getMessage());
    }
}