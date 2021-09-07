import React, {useEffect} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Wrapper from '../Wrapper/Wrapper';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { verifyToken } from '../features/Auth/userSlice';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    if(!localStorage.getItem('token')) return;
    dispatch(verifyToken(localStorage.getItem('token')));
  }, [dispatch]);


  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer />
    </Wrapper>
  );
};

export default App;