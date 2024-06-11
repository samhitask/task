package com.practice.task;

// constraints
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import com.practice.task.constraints.PriorityConstraint;
import com.practice.task.constraints.StatusConstraint;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="TASKS")
public class Task {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) // Auto-generated random ID by JPA
    private long id;
    @NotNull(message = "Title is required") 
    @NotEmpty(message = "Title is required")
    private String title;

    private String description;
    private LocalDate dueDate;

    @StatusConstraint
    private String status;
    @PriorityConstraint
    private String priority;


    protected Task() {} // JPA requires this constructor, but it won't be used

    public Task(String title) {
        this.title = title;
        this.status = "TO DO"; // Default status is "TO DO" if not given a value
        this.priority = "LOW"; // Default priority = "LOW" if not given a value
    }

    public Task(String title, String description, String status, LocalDate dueDate, String priority) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.priority = priority;
    }

   
    @Override
    public String toString() {
        return "Task [id=" + id + ", title=" + title + ", description=" + description + ", status=" + status
                + ", dueDate=" + dueDate + ", priority=" + priority + "]";
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
    
}