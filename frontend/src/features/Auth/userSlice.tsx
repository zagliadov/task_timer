
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transformTime } from '../utils/utils';
import axios from 'axios';
import { createHmac } from 'crypto';
import {IRegistration, ILogin} from '../interfaces/interface';


interface IUserState {
  user: [],
  status: string,
  token: string,
  message: boolean,
}
const initialState: IUserState = {
  user: [],
  status: '',
  token: '',
  message: false,
}


export const registration = createAsyncThunk(
  'user/registration',
  async (data: IRegistration) => {
    let newDate = new Date();
    data.date = `${transformTime(newDate.getFullYear().toString())}-${transformTime(newDate.getMonth().toString())}-${transformTime(newDate.getDate().toString())}`
    data.password = await createHmac('sha256', data.password).update('pass').digest('hex');
    data.role = 'user';
    console.log(data);
    try {
      return await axios.post(`http://0.0.0.0:9001/api/auth/registration`, data)
    } catch (error) {
      console.log(error)
    }
  }
);
//
export const login = createAsyncThunk(
  'user/login',
  async (data: ILogin) => {
    data.password = await createHmac('sha256', data.password).update('pass').digest('hex');
    try {
      return await axios.post(`http://0.0.0.0:9001/api/auth/login`, data)
        .then(response => response.data)
        .then(data => {
          if (!data) return
          return data
        });
    } catch (error) {
      console.log(error)
    }
  }
);

export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (data: string | null) => {
    try {
      return await axios.post(`http://0.0.0.0:9001/api/auth/verifytoken`, data, {
        headers: {
          'Authorization': `Bearer ${data}`
        }
      })
        .then(response => response.data)
        .then(data => data)



    } catch (error) {
      console.log(error)
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRemove(state, action) {
      state.user = [];
    },
    tokenRemove(state, action) {
      state.token = '';
    }
  },

  extraReducers: (builder) => {
    // builder
    //   .addCase(registration.pending, (state, action) => { state.status = 'loading'; })
    //   .addCase(registration.fulfilled, (state, action) => {
    //     state.status = 'resolved';
    //     //state.data = payload;
    //   })
    //   .addCase(registration.rejected, (state, action) => { });
    ///////
    builder
      .addCase(login.pending, (state, action) => { state.status = 'loading'; })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        if (payload === undefined) state.message = true 
        if (payload !== undefined) state.message = false
        state.token = payload;
        if (payload !== undefined) localStorage.setItem('token', payload)
      })
      .addCase(login.rejected, (state, action) => { });
    /////
    builder
      .addCase(verifyToken.pending, (state, action) => { state.status = 'loading'; })
      .addCase(verifyToken.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.user = payload;
      })
      .addCase(verifyToken.rejected, (state, action) => { });
  },
});

export const { userRemove, tokenRemove } = userSlice.actions;





export default userSlice.reducer;
