package com.practice.task;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class TaskControllerTests { 

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // Used to convert objects to JSON and vice versa

    @MockBean
    TaskRepository repo;

    @Test
    public void testPostTask() throws Exception {
        Task task = new Task("Sample Task", "Sample Description", "TO DO", LocalDate.now(), "MEDIUM");
        when(repo.save(any(Task.class))).thenReturn(task);
        String jsonTask = objectMapper.writeValueAsString(task);

        mockMvc.perform(MockMvcRequestBuilders.post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonTask))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Sample Task"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Sample Description"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("TO DO"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dueDate").value(LocalDate.now().format(DateTimeFormatter.ISO_DATE)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.priority").value("MEDIUM"));
    }
    @Test
    public void testGetTask() throws Exception {

        Task task = new Task("Sample Task", "Sample Description", "TO DO", LocalDate.now(), "MEDIUM");
        task.setId(1L);
        when(repo.findById(1L)).thenReturn(Optional.of(task)); 
        mockMvc.perform(MockMvcRequestBuilders.get("/tasks/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Sample Task"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Sample Description"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("TO DO"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dueDate").value(LocalDate.now().format(DateTimeFormatter.ISO_DATE)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.priority").value("MEDIUM"));
    
    }

    @Test
    public void testGetAllTasks() throws Exception {
        Task task1 = new Task("Task 1", "Description 1", "TO DO", LocalDate.now(), "LOW");
        task1.setId(1L);
        Task task2 = new Task("Task 2", "Description 2", "IN PROGRESS", LocalDate.now().plusDays(1), "MEDIUM");
        task2.setId(2L);

        List<Task> tasks = Arrays.asList(task1, task2);
        when(repo.findAll()).thenReturn(tasks);

        mockMvc.perform(MockMvcRequestBuilders.get("/tasks")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(result -> System.out.println(result.getResponse().getContentAsString())) // Print response for debugging
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("Task 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value("Description 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].status").value("TO DO"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].dueDate").value(LocalDate.now().toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].priority").value("LOW"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].title").value("Task 2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].description").value("Description 2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].status").value("IN PROGRESS"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].dueDate").value(LocalDate.now().plusDays(1).toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].priority").value("MEDIUM"));
    }

    @Test
    public void testDeleteTask() throws Exception {
        Task existingTask = new Task("Existing Task", "Existing Description", "TO DO", LocalDate.now(), "LOW");
        existingTask.setId(1L);

        Mockito.when(repo.findById(1L)).thenReturn(Optional.of(existingTask));

        mockMvc.perform(MockMvcRequestBuilders.delete("/tasks/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        Mockito.verify(repo, Mockito.times(1)).deleteById(1L);
    }

    @Test
    public void testPutTask() throws Exception {
        Task existingTask = new Task("Existing Task", "Existing Description", "TO DO", LocalDate.now(), "LOW");
        existingTask.setId(1L);

        Task updatedTask = new Task("Updated Task", "Updated Description", "IN PROGRESS", LocalDate.now().plusDays(1), "HIGH");
        updatedTask.setId(1L); 

        when(repo.findById(1L)).thenReturn(Optional.of(existingTask));
        when(repo.save(Mockito.any(Task.class))).thenReturn(updatedTask);
        String jsonUpdatedTask = objectMapper.writeValueAsString(updatedTask);

        mockMvc.perform(MockMvcRequestBuilders.put("/tasks/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUpdatedTask))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Updated Task"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Updated Description"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("IN PROGRESS"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dueDate").value(LocalDate.now().plusDays(1).toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.priority").value("HIGH"));
    }










}

