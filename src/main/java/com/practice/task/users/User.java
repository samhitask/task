package com.practice.task.users;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.practice.task.Task;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Table;

@Table(name="USERS")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User  { 
  
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter private Long id; 

    @Column(nullable = false, unique = true)
    @Getter @Setter private String username; 

    @Column
    @Getter @Setter private String email;

    @Column
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 
    @Getter @Setter private String password;

}