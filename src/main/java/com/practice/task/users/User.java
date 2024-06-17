package com.practice.task.users;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
public class User implements UserDetails { 
  
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

    @OneToMany(mappedBy = "user")
    @Getter @Setter private List<Task> tasks;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(() -> "write");
    }
}