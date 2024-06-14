package com.practice.task;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practice.task.users.UserRepository;
import com.practice.task.users.User;

@Service
public class TaskServices {

    @Autowired
    private TaskRepository repo;

    @Autowired
    private UserRepository urepo;

    public Task saveTask(Task task, long userId) {
        User user = urepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        return repo.save(task);
    }

    public List<Task> findTasksByUserId(long userId) {
        return repo.findByUserId(userId);
    }

    public TaskServices(final TaskRepository repo, UserRepository urepo) {
        this.repo = repo;
        this.urepo = urepo;
    }

    public Task createTask(Task task) {
        return repo.save(task);
    }

    public Task getTaskById(long id){
        Optional<Task> newTask = repo.findById(id);
        return newTask.get();
    }

    public List<Task> getAllTasks(){
        return repo.findAll();
    }

    public Task updateTask(long id, Task task) {
        Optional<Task> oldTask = repo.findById(id);
        Task updated = oldTask.get();
        updated.setTitle(task.getTitle());
        updated.setDescription(task.getDescription());
        updated.setStatus(task.getStatus());
        updated.setDueDate(task.getDueDate());
        updated.setPriority(task.getPriority());
        return repo.save(updated);
    }

    public void deleteTask(long id){
        repo.deleteById(id);
        return;
    }

}
