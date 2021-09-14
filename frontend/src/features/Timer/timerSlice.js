
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { transformTime } from '../utils/utils';

export const saveTaskPackage = createAsyncThunk(
  'user/saveTaskPackage',
  async (data) => {
    let newDate = new Date();
    data.date = `${transformTime(newDate.getFullYear().toString())}-${transformTime((newDate.getMonth() + 1).toString())}-${transformTime(newDate.getDate().toString())}`
    try {
      return await axios.post(`http://0.0.0.0:9001/api/timer/add_task`, data)
        .then(response => response.data)


    } catch (error) {
      console.log(error.message)
    }
  }
);



export const updateTime = createAsyncThunk(
  'user/updateTime',
  async (data) => {
    try {
      let newDate = new Date();
      data.date = `${transformTime(newDate.getFullYear().toString())}-${transformTime((newDate.getMonth() + 1).toString())}-${transformTime(newDate.getDate().toString())}`
      return await axios.put(`http://0.0.0.0:9001/api/timer/update_time`, data)
        .then(response => response.data)
        .then(data => data)

    } catch (error) {
      console.log(error.message)
    }
  }
);


const timerSlice = createSlice({
  name: 'package',
  initialState: {
    package: [],
    task: [],
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
    [updateTime.pending]: (state, action) => { state.status = 'loading'; },
    [updateTime.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      //state.package = payload;
    },
    [updateTime.rejected]: (state, action) => { },
    ///
    // [getMemo.pending]: (state, action) => { state.status = 'loading'; },
    // [getMemo.fulfilled]: (state, { payload }) => {
    //   state.status = 'resolved';
    //   state.task = payload;
    // },
    // [getMemo.rejected]: (state, action) => { },
    ///
  },
});

// export const {  } = timerSlice.actions;





export default timerSlice.reducer;
