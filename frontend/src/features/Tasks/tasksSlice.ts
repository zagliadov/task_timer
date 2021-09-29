import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';


interface ITaskSlice {
  tasks: [],
  allCompletedTasks: [],
  status: string,
}

const initialState: ITaskSlice = {
  tasks: [],
  allCompletedTasks: [],
  status: 'loading',
}

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (id: number) => {
    if (typeof (id) === 'undefined') return
    try {
      return await axios.get(`http://0.0.0.0:9001/api/tasks/get_tasks/${id}`)
        .then((response: AxiosResponse) => response.data)
        .then((data: any) => {
          console.log(data, 'getTasks')
          return data
        })

    } catch (error) {
      console.log(error)
    }
  }
);

interface IGetCompletedTasksForDays {
  convertedStartDate: string,
  convertedEndDate: string,
  id: number | undefined,
}
export const getCompletedTasksForDays = createAsyncThunk(
  'tasks/getCompletedTasksForDays',
  async (data: IGetCompletedTasksForDays) => {
    try {
      return await axios.post(`http://0.0.0.0:9001/api/tasks/get_completed_tasks`, data)
        .then((response: AxiosResponse) => response.data)
        .then((data: any) => {
          return data
        })

    } catch (error) {
      console.log(error)
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (data: any) => {
    try {
      return await axios.delete(`http://0.0.0.0:9001/api/tasks/remove_task`, { data })
        .then((response: AxiosResponse) => response.data)
        .then((data: any) => data)

    } catch (error) {
      console.log(error)
    }
  }
);

export const showMatches = createAsyncThunk(
  'tasks/showMatches',
  async (data: any) => {

    try {
      return await axios.post(`http://0.0.0.0:9001/api/tasks/show_matches`, { data })
        .then((response: AxiosResponse) => response.data)
        .then((data: any) => data)

    } catch (error) {
      console.log(error)
    }
  }
);






const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTasksFromState(state, action) {
      state.tasks = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => { state.status = 'loading'; })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.tasks = payload;

      })
      .addCase(getTasks.rejected, () => { });
    /////
    builder
      .addCase(getCompletedTasksForDays.pending, (state) => { state.status = 'loading'; })
      .addCase(getCompletedTasksForDays.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.allCompletedTasks = payload;
      })
      .addCase(getCompletedTasksForDays.rejected, () => { });
    /////
    builder
      .addCase(removeTask.pending, (state) => { state.status = 'loading'; })
      .addCase(removeTask.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.tasks = payload;
      })
      .addCase(removeTask.rejected, () => { })
    /////
    builder
      .addCase(showMatches.pending, (state) => { state.status = 'loading'; })
      .addCase(showMatches.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.allCompletedTasks = payload;
      })
      .addCase(showMatches.rejected, () => { });
    /////
  },
});

export const { removeTasksFromState } = tasksSlice.actions;





export default tasksSlice.reducer;

