package com.practice.task.users; 

import java.util.Map;
import jakarta.servlet.http.HttpSession; 
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.stereotype.Controller; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; 

@Controller 
public class UserController {         
   @Autowired private UserService serv; 
   @Autowired
   private PasswordEncoder passwordEncoder; 
   

   @GetMapping("/login") 
   public String login(HttpServletRequest request, HttpSession session) { 
      session.setAttribute(
         "error", "Invalid username and/or password"
      ); 
      return "login"; 
   } 

   @PostMapping(
      value = "/register", 
      consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = { 
      MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE }
   )
   public void addUser(@RequestBody User user) {
      serv.createUser(user); 
   }
}