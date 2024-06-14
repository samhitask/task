package com.practice.task;

// constraints
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import com.practice.task.constraints.PriorityConstraint;
import com.practice.task.constraints.StatusConstraint;
import com.practice.task.users.User;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TASKS")
public class Task {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) // Auto-generated random ID by JPA
    @Getter @Setter private long id;

    @Column(nullable = false)
    @NotNull(message = "Title is required") 
    @NotEmpty(message = "Title is required")
    @Getter @Setter private String title;

    @Column
    @Getter @Setter private String description;
    @Column
    @Getter @Setter private LocalDate dueDate;

    @Column
    @StatusConstraint
    @Getter @Setter private String status;

    @Column
    @PriorityConstraint
    @Getter @Setter private String priority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Getter @Setter private User user;


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

}