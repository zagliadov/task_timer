
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transformTime } from '../utils/utils';
import axios from 'axios';
import { createHmac } from 'crypto';


export const registration = createAsyncThunk(
  'user/registration',
  async (data) => {
    let newDate = new Date();
    data.date = `${transformTime(newDate.getFullYear().toString())}-${transformTime(newDate.getMonth().toString())}-${transformTime(newDate.getDate().toString())}`
    data.password = await createHmac('sha256', data.password).update('pass').digest('hex');
    data.role = 'user';
    console.log(data)
    try {
      return await axios.post(`http://0.0.0.0:9001/api/auth/registration`, data)


    } catch (error) {
      console.log(error.message)
    }
  }
);
//
export const login = createAsyncThunk(
  'user/login',
  async (data) => {
    data.password = await createHmac('sha256', data.password).update('pass').digest('hex');
    try {
      return await axios.post(`http://0.0.0.0:9001/api/auth/login`, data)
        .then(response => response.data)
        .then(data => {
          if (!data) return
          return data
        })



    } catch (error) {
      console.log(error.message)
    }
  }
);

export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (data) => {
    try {
      return await axios.post(`http://0.0.0.0:9001/api/auth/verifytoken`, data, {
        headers: {
          'Authorization': `Bearer ${data}`
        }
      })
        .then(response => response.data)
        .then(data => data)



    } catch (error) {
      console.log(error.message)
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    token: '',
    message: false,
  },

  reducers: {
    userRemove(state, action) {
      state.user = [];
    },
    tokenRemove(state, action) {
      state.token = '';
    }
  },

  extraReducers: {
    [registration.pending]: (state, action) => { state.status = 'loading'; },
    [registration.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      //state.data = payload;
    },
    [registration.rejected]: (state, action) => { },
    ///////
    [login.pending]: (state, action) => { state.status = 'loading'; },
    [login.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      if (payload === undefined) state.message = true // Если
      if (payload !== undefined) state.message = false
      state.token = payload;
      if (payload !== undefined) localStorage.setItem('token', payload)
    },
    [login.rejected]: (state, action) => { },
    /////
    [verifyToken.pending]: (state, action) => { state.status = 'loading'; },
    [verifyToken.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      state.user = payload;

    },
    [verifyToken.rejected]: (state, action) => { },
  },
});

export const { userRemove, tokenRemove } = userSlice.actions;





export default userSlice.reducer;
