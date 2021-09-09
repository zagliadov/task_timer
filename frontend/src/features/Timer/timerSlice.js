
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { transformTime } from '../utils/utils';

export const saveTaskPackage = createAsyncThunk(
  'user/saveTaskPackage',
  async (data) => {
    let newDate = new Date();
    let time = `${transformTime(newDate.getHours())}:${transformTime(newDate.getMinutes())}:${transformTime(newDate.getSeconds())}`;
    data.date = `${transformTime(newDate.getFullYear().toString())}-${transformTime((newDate.getMonth()+1).toString())}-${transformTime(newDate.getDate().toString())} ${time}`
    try {
      return await axios.post(`http://0.0.0.0:9001/api/timer/add_task`, data)
        .then(response => response.data)
        .then(data => console.log(data))

    } catch (error) {
      console.log(error.message)
    }
  }
);



const timerSlice = createSlice({
  name: 'package',
  initialState: {
    package: [],
  },

  reducers: {
    getDataPackage(state, { payload }) {
      state.package.push(payload);
    },
  },

  extraReducers: {
    [saveTaskPackage.pending]: (state, action) => { state.status = 'loading'; },
    [saveTaskPackage.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      //state.package = payload;
    },
    [saveTaskPackage.rejected]: (state, action) => { },
    /////

  },
});

export const { getDataPackage } = timerSlice.actions;





export default timerSlice.reducer;
