package com.practice.task;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
class TaskController {

    @Autowired
    private TaskServices serv;
 
    @PostMapping("/tasks")
    public Task postTask(@RequestBody Task task)  {
        return serv.createTask(task);
    }
    
    @GetMapping("/tasks/{id}")
    public Task getTask(@PathVariable long id) {
        return serv.getTaskById(id);
    }
    
    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return serv.getAllTasks();
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
