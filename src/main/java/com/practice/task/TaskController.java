package com.practice.task;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/* 
 * Operations:
 * "POST /tasks": Create a new task.
 * "GET /tasks/{id}": Retrieve a task by its ID.
 * "GET /tasks": Retrieve all tasks.
 *  "PUT /tasks/{id}": Update an existing task by its ID.
 *  "DELETE /tasks/{id}": Delete a task by its ID.
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
class TaskController {

    @Autowired
    private TaskServices serv;
 
    @PostMapping("/users/{userId}/tasks")
    public Task postTask(@RequestBody Task task, @PathVariable long userId)  {
        return serv.createTask(task, userId);
    }
    
    @GetMapping("/tasks/{id}")
    public Task getTask(@PathVariable long id) {
        return serv.getTaskById(id);
    }
    
    @GetMapping("/users/{userId}/tasks")
    public List<Task> getTasks(@PathVariable long userId) {
        return serv.getAllTasks(userId);
    }
    @PutMapping("/tasks/{id}")
    public Task putTask(@PathVariable long id, @RequestBody Task task) {
        return serv.updateTask(id, task);
    }
    
   @DeleteMapping("/tasks/{id}")
   public void removeTask(@PathVariable long id) {
        serv.deleteTask(id);
   }
   
}
