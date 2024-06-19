import http from "./http-common";

class TaskDataServices {
  getAll(userId) {
    return http.get(`users/${userId}/tasks`);
  }

  get(id) {
    return http.get(`/tasks/${id}`);
  }

  create(data, userId) {
    return http.post(`/users/${userId}/tasks`, data);
  }

  update(id, data) {
    return http.put(`/tasks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }

  deleteAll(userId) {
    return http.delete(`/users/${userId}/tasks`)
  }
}

export default new TaskDataServices();