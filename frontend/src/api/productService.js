import api from "./api";

export const getProducts = (page = 0, size = 10) =>
  api.get(`/products?page=${page}&size=${size}`);

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const createProduct = (data) =>
  api.post("/products", data);

export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);
