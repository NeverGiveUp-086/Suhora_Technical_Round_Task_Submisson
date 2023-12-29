import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/types";
import { getAllProduct, creatNewProduct, updateProduct, deleteProduct } from "../api/productApi";
import WritableDraft from 'immer';

export interface ProductItem {
  id: string;
  name: string;
    description: string;
    price: number;
    stocks: number;
    category: string;
  // Add other fields as needed
}

interface ProductState {
  products: ProductItem[];
  message: string;
}

const initialState: ProductState = {
  products: [],
  message: '',
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    [getAllProduct.pending.type]: (state) => {
      state.products = [];
    },
    [getAllProduct.fulfilled.type]: (state, action: any) => {
      const data = action.payload;
      state.products = data.productList;
    },
    [getAllProduct.rejected.type]: (state) => {
      state.products = [];
    },
    [creatNewProduct.pending.type]: (state) => {
      state.message = "";
    },
    [creatNewProduct.fulfilled.type]: (state, action: any) => {
      state.message = action.payload;
    },
    [creatNewProduct.rejected.type]: (state) => {
      state.message = "";
    },
    [updateProduct.pending.type]: (state) => {
      state.message = "";
    },
    [updateProduct.fulfilled.type]: (state, action: any) => {
      state.message = action.payload;
    },
    [updateProduct.rejected.type]: (state) => {
      state.message = "";
    },
    [deleteProduct.pending.type]: (state) => {
      state.message = "";
    },
    [deleteProduct.fulfilled.type]: (state, action: any) => {
      state.message = action.payload;
    },
    [deleteProduct.rejected.type]: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.pending, (state) => {
      state.products = [];
    });
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      const data = action.payload;
      state.products = data.productList;
    });
    builder.addCase(getAllProduct.rejected, (state) => {
      state.products = [];
    });
    builder.addCase(creatNewProduct.pending, (state) => {
      state.message = "";
    });
    builder.addCase(creatNewProduct.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(creatNewProduct.rejected, (state) => {
      state.message = "";
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.message = "";
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.message = "";
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.message = "";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.message = "";
    });
  }
});

export default productReducer.reducer;