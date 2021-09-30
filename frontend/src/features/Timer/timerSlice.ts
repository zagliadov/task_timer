import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { transformTime } from '../utils/utils';

interface ITimerSlice {
  package: [],
  task: [],
  timeLimit: number,
  status: '' | 'loading' | 'resolved',
}

const initialState: ITimerSlice = {
  package: [],
  task: [],
  timeLimit: 0,
  status: '',
}
interface ISaveTaskPackage {
  date?: string,
  id: number | undefined,
  timeStamp: {
    hours: number,
    minutes: number,
    seconds: number,
    memo: string,
  }
}
type IUpdateTime = {
  date?: string,
  hours: string,
  memo: string,
  minutes: string,
  seconds: string,
  taskId: number,
  usid: number | undefined ,
}
export const saveTaskPackage = createAsyncThunk(
  'user/saveTaskPackage',
  async (data: ISaveTaskPackage) => {
    let newDate: Date = new Date();
    data.date = `${transformTime(newDate.getFullYear().toString())}-${transformTime((newDate.getMonth() + 1).toString())}-${transformTime(newDate.getDate().toString())}`
    try {
      return await axios.post(`http://0.0.0.0:9001/api/timer/add_task`, data)
        .then((response: AxiosResponse) => response.data)
    } catch (error) {
      console.log(error)
    }
  }
);

export const updateTime = createAsyncThunk(
  'user/updateTime',
  async (data: IUpdateTime) => {
    try {
      let newDate: Date = new Date();
      data.date = `${transformTime(newDate.getFullYear().toString())}-${transformTime((newDate.getMonth() + 1).toString())}-${transformTime(newDate.getDate().toString())}`
      return await axios.put(`http://0.0.0.0:9001/api/timer/update_time`, data)
        .then((response: AxiosResponse) => response.data)
    } catch (error) {
      console.log(error)
    }
  }
);

const timerSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    setTimeLimit(state, { payload }) {
      state.timeLimit = payload;
    },
    removeTimeLimit(state, action) {
      state.timeLimit = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveTaskPackage.pending, (state) => { state.status = 'loading'; })
      .addCase(saveTaskPackage.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.package = action.payload;
      })
      .addCase(saveTaskPackage.rejected, () => { });
    /////
    builder
      .addCase(updateTime.pending, (state) => { state.status = 'loading'; })
      .addCase(updateTime.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.package = action.payload;
      })
      .addCase(updateTime.rejected, () => { });
  },
});

export const { setTimeLimit, removeTimeLimit } = timerSlice.actions;

export default timerSlice.reducer;
