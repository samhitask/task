package com.practice.task.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT u FROM User u WHERE u.email = ?2", nativeQuery=true)
    User findByEmail(String email);

    @Query(value="SELECT u FROM User u WHERE u.name = ?1", nativeQuery=true)
    User findByName(String name);


    
}
