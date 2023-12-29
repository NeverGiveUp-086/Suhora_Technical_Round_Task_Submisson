import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    try {
      const response = await API.get("/products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id: string) => {
    try {
      const response = await API.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const creatNewProduct = createAsyncThunk(
  "product/creatNewProduct",
  async (productData: Object) => {
    const response = await API.post("/product/new", productData);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({id, updated}: {id: string, updated: Object}) => {
    const response = await API.put(`/product/${id}`, updated);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string) => {
    const response = await API.delete(`/product/${id}`);
    return response.data;
  }
);