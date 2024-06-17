package com.practice.task.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

    @Autowired
    private UserService serv; 

    public UserController(UserService serv) { 
       this.serv = serv; 
    } 

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return  serv.createUser(user);
    }

    @GetMapping("users/{id}")
    public User getUserById(@PathVariable Long id) {
       return serv.findById(id);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return serv.findAllUsers();
    }

    @DeleteMapping("user/{id}")
    public void deleteUser(@PathVariable Long id) {
        serv.deleteUser(id);
        return;
    }
}