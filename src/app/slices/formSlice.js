import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiInstance";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

// Async Thunks
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
        });
    } catch (error) {
        return rejectWithValue(error.data.message);
    }
});

export const deleteData = createAsyncThunk('data/deleteData', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.delete(`/${id}.json`);
        return id;
    } catch (error) {
        return rejectWithValue(error.data.message);
    }
});

export const editData = createAsyncThunk('data/editData', async ({ id, updateData }, { dispatch, rejectWithValue }) => {
    try {
        await axiosInstance.patch(`/${id}.json`, updateData); // Edit the data in the backend
        dispatch(fetchData()); // Re-fetch the updated data after the edit
        return { id, ...updateData }; // Return the updated data
    } catch (error) {
        return rejectWithValue(error.data.message);
    }
});

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
                // State is updated via fetchData to ensure fresh data is reloaded
            })
            .addCase(editData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default formSlice.reducer;
