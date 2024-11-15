import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiInstance";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

// Export the async thunk
export const addData = createAsyncThunk('data/addData', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/.json', data);
        return { id: res.data.name, ...data };
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchData = createAsyncThunk('data/fetchData', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/.json')
        return Object.keys(res.data).map(id => {
            return { id: id, ...res.data[id] }
        })
    } catch (error) {
        return rejectWithValue(error.data.message);
    }
})

export const deleteData = createAsyncThunk('data/deleteData', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.delete(`/${id}.json`);
        return id;
    } catch (error) {
        return rejectWithValue(error.data.message)
    }
})

export const editData = createAsyncThunk('data/editData', async ({id, updateData}, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.patch(`/${id}.json`, updateData)
        // console.log(res.data);
        return {id, ...updateData};
    } catch (error) {
        return rejectWithValue(error.data.message);
    }
})

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addData.pending, (state) => {
                state.loading = true;
            })
            .addCase(addData.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteData.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter(item => item.id !== action.payload);
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editData.pending, (state) => {
                state.loading = true;
            })
            .addCase(editData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.id === action.payload.id);
                if(index !== -1) {
                    state.data[index] = {...state.data[index],...action.payload.updateData};
                }
            })
            .addCase(editData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

// Export the reducer
export default formSlice.reducer;
