import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useGetData } from '../../Hook/useGetData'

export const getProducts = createAsyncThunk("products/getProducts", async (_, thunkAPI) => {
    try {
        const res = await useGetData(`/api/v1/products?limit=8`)
        return res
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }
})
export const getProductsPagination = createAsyncThunk("products/getProductspagination", async (page, thunkAPI) => {
    try {
        const res = await useGetData(`/api/v1/products?limit=8&page=${page}`)
        return res
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }
})

const initialState = { products: [], isLoading: false, error: null }

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: {
        ///////////////////////get books/////////////////////////////
        [getProducts.pending]: (state,) => {
            state.isLoading = true
            state.error = null
        },
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload
            state.isLoading = false
        },
        [getProducts.rejected]: (state, action) => {
            state.error = action?.payload
            // state.error = action?.error.message // when need to print result of message
            state.isLoading = false
        },
        //////////////////////////////////////////////
        [getProductsPagination.pending]: (state, ) => {
            state.isLoading = true
            state.error = null
        },
        [getProductsPagination.fulfilled]: (state, action) => {
            state.products = action.payload
            state.isLoading = false
        },
        [getProductsPagination.rejected]: (state, action) => {
            state.error = action?.payload
            // state.error = action?.error.message // when need to print result of message
            state.isLoading = false
        },
    }

    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getProducts.pending, (state) => {
    //             state.isLoading = true
    //         })
    //         .addCase(getProducts.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.products = action.payload
    //         })
    //         .addCase(getProducts.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.error = action?.payload
    //         })
    // },

})

export default productSlice.reducer
