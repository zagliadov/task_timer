import dotenv from 'dotenv';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse, AxiosInstance } from 'axios';
dotenv.config();


interface ITodayTasks {
  firstname?: string,
  memo?: string,
  userId?: number,
  id?: number,
  hours?: string,
  minutes?: string,
  seconds?: string,
}
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
  async (id: number | undefined) => {
    if (typeof id === 'undefined') return
    try {
      return await axios.get<ITodayTasks>(`${process.env.SHOST || ''}/api/tasks/get_tasks/${id}`)
        .then((response: AxiosResponse) => response.data)
        .then((data: ITodayTasks) => data)

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
      return await axios.post<IGetCompletedTasksForDays>(`${process.env.SHOST || ''}/api/tasks/get_completed_tasks`, data)
        .then((response: AxiosResponse) => response.data)
        .then((data: IGetCompletedTasksForDays[]) => {
          return data
        })

    } catch (error) {
      console.log(error)
    }
  }
);
interface IDataRemove {
  id: number
}
export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (data: IDataRemove | undefined) => {
    try {
      if(typeof data === 'undefined') return

      return await axios.delete<any>(`${process.env.SHOST || ''}/api/tasks/remove_task`, { data })
        .then((response: AxiosResponse) => response.data)
        .then((data: {message: string}) => data.message)

    } catch (error) {
      console.log(error)
    }
  }
);
interface IDataShowMessageFromClient {
  data?: string,
  convertedStartDate?: string,
  convertedEndDate?: string,
  id?: number | undefined,
}
interface IDataShowMessageFromDB {
  createdAt: string,
  hours: string,
  id: number,
  memo: string,
  minutes: string,
  picture: [],
  seconds: string,
  userId: number,
}
export const showMatches = createAsyncThunk(
  'tasks/showMatches',
  async (data: IDataShowMessageFromClient) => {
    try {
      return await axios.post<AxiosInstance>(`${process.env.SHOST || ''}/api/tasks/show_matches`, { data })
        .then((response: AxiosResponse) => response.data)
        .then((data: IDataShowMessageFromDB[]) => data)

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
        if(typeof payload === "undefined") return
        state.status = 'resolved';
        state.tasks = payload as [];

      })
      .addCase(getTasks.rejected, () => { });
    ///
    builder
      .addCase(getCompletedTasksForDays.pending, (state) => { state.status = 'loading'; })
      .addCase(getCompletedTasksForDays.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.allCompletedTasks = payload as [];
      })
      .addCase(getCompletedTasksForDays.rejected, () => { });
    /////
    builder
      .addCase(removeTask.pending, (state) => { state.status = 'loading'; })
      .addCase(removeTask.fulfilled, (state, { payload }) => {
        state.status = payload as string ;
      })
      .addCase(removeTask.rejected, () => { })
    ///
    builder
      .addCase(showMatches.pending, (state) => { state.status = 'loading'; })
      .addCase(showMatches.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.allCompletedTasks = payload as [];
      })
      .addCase(showMatches.rejected, () => { });
    /////
  },
});

export const { removeTasksFromState } = tasksSlice.actions;





export default tasksSlice.reducer;

