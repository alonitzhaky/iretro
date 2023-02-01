import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Product from '../../models/Product';
import { addProduct, getAllProducts, deleteProduct, updateProduct } from './productAPI';
interface ProductState {
    status: 'idle' | 'loading' | 'failed';
    products: Product[]
}
const initialState: ProductState = {
    status: 'idle', 
    products: []
}; 

export const addProductAsync = createAsyncThunk(
    'product/addProduct', 
    async (newProduct: Product) => {
        const response = await addProduct(newProduct);
        return response.data
    }
);

export const getAllProductsAsync = createAsyncThunk(
    'product/getAllProducts', 
    async () => {
        const response = await getAllProducts(); 
        return response.data; 
    }
); 

export const deleteProductAsync = createAsyncThunk(
    'product/deleteProduct', 
    async (id: number) => {
        const response = await deleteProduct(id);
        return response.data; 
    }
); 

export const updateProductAsync = createAsyncThunk(
    'product/updateProduct', 
    async (product: Product) => {
        const response = await updateProduct(product);
        return response.data; 
    }
); 

export const productSlice = createSlice({
    name: 'product', 
    initialState, 
    reducers: {
        increment: (state) => {
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            state.products.push(action.payload)
        }).addCase(getAllProductsAsync.fulfilled, (state, action) => {
            console.log(action.payload)
            state.products = action.payload
        }).addCase(deleteProductAsync.fulfilled, (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        }).addCase(updateProductAsync.fulfilled, (state, action) => {
            const temporary = state.products.filter(product => product.id === action.payload.id)[0]
            temporary.name = action.payload.name
            temporary.category = action.payload.category
            temporary.price = action.payload.price
            temporary.description = action.payload.description
            temporary.image = action.payload.image
            temporary.quantity = action.payload.quantity
        });
    },
});

export const { } = productSlice.actions;
export const selectProducts = (state: RootState) => state.product.products;
export default productSlice.reducer;