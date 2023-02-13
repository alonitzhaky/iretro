import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Product from '../../models/Product';
import { getAllProducts, getAllProductsInCategory, getOneProduct } from './productAPI';

interface ProductState {
    status: 'idle' | 'loading' | 'failed';
    products: Product[];
    product: Product;
    count: number
}
const initialState: ProductState = {
    status: 'idle',
    products: [], 
    product: Object.create(null), 
    count: 0
};

export const getAllProductsAsync = createAsyncThunk(
    'product/getAllProducts',
    async () => {
        const response = await getAllProducts();
        return response.data;
    }
);

export const getAllProductsInCategoryAsync = createAsyncThunk(
    'product/getAllProductsInCategory',
    async (data:{id: number, page: number}) => {
        const response = await getAllProductsInCategory(data.id, data.page);
        console.log(response.data)
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

// export const addProductAsync = createAsyncThunk(
//     'product/addProduct', 
//     async (newProduct: Product) => {
//         const response = await addProduct(newProduct);
//         return response.data
//     }
// );


// export const deleteProductAsync = createAsyncThunk(
//     'product/deleteProduct', 
//     async (id: number) => {
//         const response = await deleteProduct(id);
//         return response.data; 
//     }
// ); 

// export const updateProductAsync = createAsyncThunk(
//     'product/updateProduct', 
//     async (product: Product) => {
//         const response = await updateProduct(product);
//         return response.data; 
//     }
// ); 

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(addProductAsync.fulfilled, (state, action) => {
            //     state.products.push(action.payload)
            // })
            // }).addCase(deleteProductAsync.fulfilled, (state, action) => {
            //     state.products = state.products.filter(product => product.id !== action.payload)
            // }).addCase(updateProductAsync.fulfilled, (state, action) => {
            //     const temporary = state.products.filter(product => product.id === action.payload.id)[0]
            //     temporary.name = action.payload.name
            //     temporary.category = action.payload.category
            //     temporary.price = action.payload.price
            //     temporary.description = action.payload.description
            //     temporary.image = action.payload.image
            //     temporary.quantity = action.payload.quantity

            .addCase(getAllProductsAsync.fulfilled, (state, action) => {
                state.products = action.payload
            }).addCase(getAllProductsInCategoryAsync.fulfilled, (state, action) => {
                state.products = action.payload.results
                state.count = action.payload.count
            }).addCase(getOneProductAsync.fulfilled, (state, action) => {
                state.product = action.payload
            })
    },
});

export const { } = productSlice.actions;
export const selectProducts = (state: RootState) => state.product.products;
export const selectCount = (state: RootState) => state.product.count;
export default productSlice.reducer;