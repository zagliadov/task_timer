import {useEffect, FC} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Wrapper from '../Wrapper/Wrapper';
import { useAppDispatch, useAppSelector } from '../features/store'
import { verifyToken } from '../features/Auth/userSlice';
import { RootState } from '../features/store';

const App: FC = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user) 

  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    dispatch(verifyToken(localStorage.getItem('token')));
    if((user !== 'undefined') || (user !== null) || Object.keys(user).length === 0) {
      dispatch(verifyToken(localStorage.getItem('token')));
    }
    if (!localStorage.getItem('hour')) return
    localStorage.removeItem('hour');
    return () => {
      console.log('Unmount app');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  );
};

export default App;