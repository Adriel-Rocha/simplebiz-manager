import api from "./api";

export const getClients = (page = 0, size = 10, sort = "id,asc") =>
  api.get(
    `/clients?page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`
  );

export const getClientById = (id) =>
  api.get(`/clients/${id}`);

export const createClient = (data) =>
  api.post("/clients", data);

export const updateClient = (id, data) =>
  api.put(`/clients/${id}`, data);

export const deleteClient = (id) =>
  api.delete(`/clients/${id}`);
