package com.practice.task.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    public User findByEmail (String email) {
        User user = repo.findByEmail(email);
        return user;
    }

    public User findByName(String name) {
        return repo.findByName(name);
    }

    public User findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public User createUser(User user) {
        return repo.save(user);
    }

    public void deleteUser (Long id) {
        repo.deleteById(id);
        return;
    }

    public List<User> findAllUsers() {
        return repo.findAll();
    }
    
}
