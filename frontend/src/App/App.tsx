import { useEffect, FC } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Wrapper from '../Wrapper/Wrapper';
import { useAppDispatch, useAppSelector, RootState } from '../features/store'
import { verifyToken } from '../features/Auth/userSlice';
import classes from './app.module.sass';
import { IClasses } from '../features/interfaces/interface';


const App: FC = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user),
    color = useAppSelector((state: RootState) => state.user.color);

  const { black__theme, white__theme }: IClasses = classes;

  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    dispatch(verifyToken(localStorage.getItem('token')));
    if ((user !== 'undefined') || (user !== null) || Object.keys(user).length === 0) {
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
    <div className={color ? black__theme : white__theme}>
      <Wrapper>
        <Header />
        <Main />
      </Wrapper>
    </div>
  );
};

export default App;