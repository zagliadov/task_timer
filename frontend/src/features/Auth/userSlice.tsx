import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transformTime } from '../utils/utils';
import axios, { AxiosResponse, AxiosTransformer, AxiosInstance } from 'axios';
import { createHmac } from 'crypto';
import { IRegistration } from '../interfaces/interface';


interface IUser {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
}

interface IUserState {
  user: IUser,
  status: string,
  token: string,
  message: boolean,
}

const initialState: IUserState = {
  user: {},
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
    try {
      return await axios.post(`http://0.0.0.0:9001/api/auth/registration`, data)
        .then((response: AxiosResponse) => response.data)
        .then((data: { message: string }) => console.log(data))
    } catch (error) {
      console.log(error)
    }
  }
);

interface IDataLogin extends AxiosTransformer {
  data: string,
}

interface ILogin {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'user/login',
  async (data: ILogin) => {
    data.password = await createHmac('sha256', data.password).update('pass').digest('hex');
    try {
      return await axios.post<AxiosInstance>(`http://0.0.0.0:9001/api/auth/login`, data)
        .then((response: AxiosResponse) => response.data)
        .then((data: IDataLogin) => {
          if (!data) return
          return data
        });
    } catch (error) {
      console.log(error)
    }
  }
);


interface IDataVerfigyToken extends AxiosTransformer {
  data: IUser,
}
export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (data: string | null) => {
    try {
      return await axios.post(`http://0.0.0.0:9001/api/auth/verifytoken`, data, {
        headers: {
          'Authorization': `Bearer ${data}`
        }
      })
        .then((response: AxiosResponse) => response.data)
        .then((data: IDataVerfigyToken) => {
          console.log(data)
          return data
        })
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
      state.user = action.payload;
    },
    tokenRemove(state, action) {
      state.token = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => { state.status = 'loading'; })
      .addCase(registration.fulfilled, (state) => {
        state.status = 'resolved';
        //state.data = payload;
      })
      .addCase(registration.rejected, () => { });
    ///////
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; })
      .addCase(login.fulfilled, (state, { payload }) => {

        state.status = 'resolved';
        if (payload === undefined) state.message = true
        if (payload !== undefined) state.message = false
        state.token = String(payload);
        if (payload !== undefined) localStorage.setItem('token', String(payload))
      })
      .addCase(login.rejected, () => { });
    /////
    builder
      .addCase(verifyToken.pending, (state) => { state.status = 'loading'; })
      .addCase(verifyToken.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.user = payload as IUser;
      })
      .addCase(verifyToken.rejected, () => { });
  },
});

export const { userRemove, tokenRemove } = userSlice.actions;





export default userSlice.reducer;
