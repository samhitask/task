package com.practice.task.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = ?2")
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.name = ?3")
    User findByName(String name);


    
}
