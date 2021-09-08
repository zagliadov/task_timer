
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// export const getDataPackage = createAsyncThunk(
//   'user/getDataPackage',
//   async (data) => {
   
//     console.log(data)
//     try {
     

//     } catch (error) {
//       console.log(error.message)
//     }
//   }
// );



const timerSlice = createSlice({
  name: 'package',
  initialState: {
    package: [],
  },

  reducers: {
    getDataPackage(state, {payload}) {
        state.package.push(payload);
      },
  },

  extraReducers: {
    // [getDataPackage.pending]: (state, action) => { state.status = 'loading'; },
    // [getDataPackage.fulfilled]: (state, { payload }) => {
    //   state.status = 'resolved';
    //   state.package = payload;
    // },
    // [getDataPackage.rejected]: (state, action) => { },
    ///////
    
  },
});

 export const { getDataPackage  } = timerSlice.actions;





export default timerSlice.reducer;
