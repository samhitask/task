package com.practice.task;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServices {

    @Autowired
    private TaskRepository repo;

    public TaskServices(final TaskRepository repo) {
        this.repo = repo;
    }

    public Task createTask(Task task) {
        return repo.save(task);
    }

    public Task getTaskById(long id){
        Optional<Task> newTask = repo.findById(id);
        return newTask.get();
    }

    public List<Task> getAllTasks(long userId){
        return repo.find();
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
