package com.practice.task.users;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    public User findByEmail (String email) {
        Optional<User> user = repo.findUserByEmail(email);
        return user.get();
    }

    public User findByUsername(String username) {
        return repo.findUserByUsername(username).orElse(null);
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