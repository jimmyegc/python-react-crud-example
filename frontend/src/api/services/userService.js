import { api } from "../client";

export const userService = {
  getUsers: async () => {
    const { data } = await api.get("/users");
    return data;
  },
  getUserById: async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },
  createUser: async (user) => {
    const { data } = await api.post("/users", user);
    return data;
  },
  updateUser: async (id, user) => {
    const { data } = await api.put(`/users/${id}`, user);
    return data;
  },
  deleteUser: async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  },
};
