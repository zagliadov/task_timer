import React, {useEffect} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Wrapper from '../Wrapper/Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../features/Auth/userSlice';

const App = () => {


  
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
  
 
  useEffect(() => {
    if(!localStorage.getItem('token')) return;
    dispatch(verifyToken(localStorage.getItem('token')));
    if(user.length === 0) {
      dispatch(verifyToken(localStorage.getItem('token')));
    }
  }, [dispatch, user.length]);


  return (
    <Wrapper>
      <Header />
      <Main />
     
    </Wrapper>
  );
};

export default App;