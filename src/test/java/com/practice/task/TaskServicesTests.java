package com.practice.task;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import org.springframework.transaction.annotation.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class TaskServicesTests {

    @Autowired
    private TaskServices serv;

    @MockBean
    private TaskRepository repo;

	LocalDate dueDate = LocalDate.of(2023, 9, 23);

	@Test
	public void testCreateTask() {
        Task task = new Task();
        task.setTitle("Task 1");
        task.setDescription("Description of Task 1");
        task.setStatus("TO DO");
        task.setDueDate(dueDate);
        task.setPriority("LOW");

        Mockito.when(repo.save(task)).thenReturn(task);
        Task savedTask = serv.createTask(task);

        assertNotNull(savedTask);
        assertNotNull(savedTask.getId());
        assertEquals("Task 1", savedTask.getTitle());
    }

    // need to add tests to make sure status and priority validation is taking place

    @Test
    public void testUpdateTask() {
        Task existingTask = new Task("Old Title", "Old Description", "TO DO", LocalDate.now(), "LOW");
        Task updatedTask = new Task("New Title", "New Description", "IN PROGRESS", LocalDate.now().plusDays(1), "HIGH");
        
        when(repo.findById((long) 1)).thenReturn(Optional.of(existingTask));
        when(repo.save(existingTask)).thenReturn(existingTask);

        Task result = serv.updateTask((long) 1, updatedTask);

        verify(repo).findById((long) 1);
        verify(repo).save(existingTask);
        assertEquals(existingTask, result);

    }

    @Test 
    public void testGetTask() {
        Task task = new Task();
        task.setTitle("Task 1");
        task.setDescription("Description of Task 1");
        task.setStatus("TO DO");
        task.setDueDate(dueDate);
        task.setPriority("LOW");

        when(repo.findById((long) 1)).thenReturn(Optional.of(task));

        Task result = serv.getTaskById(1);
        assertEquals(task, result);

    }
    @Test
    public void testGetAllTasks() {
		
        List<Task> tasks = Arrays.asList(new Task("Task 1", "description of Task 1", "TO DO", dueDate, "LOW"), 
											new Task("Task 2", "description of Task 2", "DONE", dueDate, "HIGH"));
        Mockito.when(repo.findAll()).thenReturn(tasks);

        List<Task> result = serv.getAllTasks();

        assertEquals(2, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        assertEquals("Task 2", result.get(1).getTitle());
    }
		
    @Test
    public void testDeleteTask() {

        Task task = new Task();
        task.setTitle("Task 1");
        task.setDescription("Description of Task 1");
        task.setStatus("TO DO");
        task.setDueDate(dueDate);
        task.setPriority("LOW");

        long id = 1;
        Mockito.when(repo.findById(id)).thenReturn(Optional.of(task));
        serv.deleteTask((long) 1);
        verify(repo).deleteById(id);
    }
		

		
		
		

	
}
