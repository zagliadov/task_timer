import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
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

export const getCompletedTasksForDays = createAsyncThunk(
  'tasks/getCompletedTasksForDays',
  async (data) => {
    try {
      return await axios.post(`http://0.0.0.0:9001/api/tasks/get_completed_tasks`, data)
        .then(response => response.data)
        .then(data => data)

    } catch (error) {
      console.log(error.message)
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (data) => {
    try {
      return await axios.delete(`http://0.0.0.0:9001/api/tasks/remove_task`, {data})
        .then(response => response.data)
        .then(data => console.log(data))

    } catch (error) {
      console.log(error)
    }
  }
);

export const showMatches = createAsyncThunk(
  'tasks/showMatches',
  async (data) => {
    try {
      return await axios.post(`http://0.0.0.0:9001/api/tasks/show_matches`, {data})
        .then(response => response.data)
        .then(data => data)

    } catch (error) {
      console.log(error)
    }
  }
);






const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    allCompletedTasks: [],
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
    [getCompletedTasksForDays.pending]: (state, action) => { state.status = 'loading'; },
    [getCompletedTasksForDays.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      state.allCompletedTasks = payload;
    },
    [getCompletedTasksForDays.rejected]: (state, action) => { },
    /////
    [removeTask.pending]: (state, action) => { state.status = 'loading'; },
    [removeTask.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      //state.tasks = payload;
    },
    [removeTask.rejected]: (state, action) => { },
    /////
    [showMatches.pending]: (state, action) => { state.status = 'loading'; },
    [showMatches.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      state.allCompletedTasks = payload;
    },
    [showMatches.rejected]: (state, action) => { },
    /////
  },
});

// export const {  } = tasksSlice.actions;





export default tasksSlice.reducer;