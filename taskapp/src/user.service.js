import http from "./http-common";

class UserDataServices {
  getAll() {
    return http.get(`/users`);
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post(`/users}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new UserDataServices();