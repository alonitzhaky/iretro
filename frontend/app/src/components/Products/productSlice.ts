import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Product from '../../models/Product';
import { getAllProductsInCategory, getOneProduct } from './productAPI';

interface ProductState {
    status: 'idle' | 'loading' | 'failed';
    products: Product[];
    product: Product;
    count: number;
    isLoading: Boolean
    currentPage: number
}
const initialState: ProductState = {
    status: 'idle',
    products: [],
    product: Object.create(null),
    count: 0,
    isLoading: true,
    currentPage: 1
}

export const getAllProductsInCategoryAsync = createAsyncThunk(
    'product/getAllProductsInCategory',
    async (data: { id: number, page: number }) => {
        const response = await getAllProductsInCategory(data.id, data.page);
        return response.data;
    }
)

export const getOneProductAsync = createAsyncThunk(
    'product/getOneProduct',
    async (id: number) => {
        const response = await getOneProduct(id);
        return response.data
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductsInCategoryAsync.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getAllProductsInCategoryAsync.fulfilled, (state, action) => {
                state.products = action.payload.results
                state.count = action.payload.count
                state.isLoading = false
            })
            .addCase(getOneProductAsync.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getOneProductAsync.fulfilled, (state, action) => {
                state.product = action.payload
                state.isLoading = false
            })
    },
});

export const { updateCurrentPage } = productSlice.actions;
export const selectProducts = (state: RootState) => state.product.products;
export const selectCount = (state: RootState) => state.product.count;
export const selectIsLoadingProduct = (state: RootState) => state.product.isLoading
export const selectCurrentPage = (state: RootState) => state.product.currentPage
export default productSlice.reducer;