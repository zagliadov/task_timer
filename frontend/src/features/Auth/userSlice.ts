import dotenv from 'dotenv';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { transformTime } from '../utils/utils';
import axios, { AxiosResponse, AxiosTransformer } from 'axios';
import { createHmac } from 'crypto';
import { IRegistration } from '../interfaces/interface';

dotenv.config();

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
  color: boolean,
  message: boolean,
}

const initialState: IUserState = {
  user: {},
  status: '',
  token: '',
  color: JSON.parse(localStorage.getItem('color') as string),
  message: false,
}

export const payment = createAsyncThunk(
  'user/payment',
  async (data: any) => {
    console.log(data);
    try {
      // return await axios.post<any>(`${process.env.SHOST || ''}/api/payment/create-payment-intent`, data)
      //   .then((response: AxiosResponse) => response.data)
      //   .then((data: { message: string }) => data.message)
    } catch (error) {
      console.log(error)
    }
  }
)

export const registration = createAsyncThunk(
  'user/registration',
  async (data: IRegistration) => {
    let newDate = new Date();
    data.date = `${transformTime(newDate.getFullYear().toString())}-${transformTime(newDate.getMonth().toString())}-${transformTime(newDate.getDate().toString())}`
    data.password = await createHmac('sha256', data.password).update('pass').digest('hex');
    data.role = 'user';
    try {
      return await axios.post<string>(`http://0.0.0.0:9001/api/auth/registration`, data)
        .then((response: AxiosResponse) => response.data)
        .then((data: { message: string }) => data.message)
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
      return await axios.post<string>(`http://0.0.0.0:9001/api/auth/login`, data)
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
      return await axios.post<IUser>(`http://0.0.0.0:9001/api/auth/verifytoken`, data, {
        headers: {
          'Authorization': `Bearer ${data}`
        }
      })
        .then((response: AxiosResponse) => response.data)
        .then((data: IDataVerfigyToken) => {
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
    },
    setColor(state, action) {
      state.color = action.payload;
      localStorage.setItem('color', String(action.payload));
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => { state.status = 'loading'; })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.status = String(payload);
      })
      .addCase(registration.rejected, () => { });
    ///////
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {

        state.status = 'resolved';
        if (action.payload === undefined) state.message = true;
        if (action.payload !== undefined) state.message = false;
        if (typeof action.payload === 'object') {
          state.status = action.payload.message
        }
        if (typeof action.payload === 'string') {
          state.token = String(action.payload);
        }


        if (typeof action.payload === 'string') localStorage.setItem('token', String(action.payload));
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
    ////
    builder
      .addCase(payment.pending, (state) => { state.status = 'loading'; })
      .addCase(payment.fulfilled, () => {
        // state.status = 'resolved';
        // state.user = payload as IUser;
      })
      .addCase(payment.rejected, () => { });
  },
}); 

export const { userRemove, tokenRemove, setColor } = userSlice.actions;





export default userSlice.reducer;
