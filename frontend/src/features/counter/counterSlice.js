import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
  status: 'idle',
};


export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async () => {
  
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  
  reducers: {
    
  },
  
  extraReducers: () => {
    
  },
});

// export const {  } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;



export default counterSlice.reducer;
