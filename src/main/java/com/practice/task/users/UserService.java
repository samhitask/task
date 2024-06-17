package com.practice.task.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepository repo;

     @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findUserByUsername(username).get();
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), null);
            
    }

    public User findByEmail (String email) {
        return repo.findUserByEmail(email).get();
    }

    public User findByUsername(String name) {
        return repo.findUserByUsername(name).get();
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
