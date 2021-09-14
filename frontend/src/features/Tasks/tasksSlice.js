
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { transformTime } from '../utils/utils';

export const getTasks = createAsyncThunk(
  'user/getTasks',
  async (id) => {
    try {
      return await axios.get(`http://0.0.0.0:9001/api/tasks/get_tasks/${id}`)
        .then(response => response.data)
        .then(data => data)

    } catch (error) {
      console.log(error.message)
    }
  }
);



const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },

  reducers: {
    
  },

  extraReducers: {
    [getTasks.pending]: (state, action) => { state.status = 'loading'; },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      state.tasks = payload;
    },
    [getTasks.rejected]: (state, action) => { },
    /////
  
  },
});

// export const {  } = tasksSlice.actions;





export default tasksSlice.reducer;