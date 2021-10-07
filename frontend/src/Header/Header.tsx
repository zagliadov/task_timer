import { FC } from 'react';
import classes from './header.module.sass';
import Logo from './components/Logo/Logo'
import Nav from './components/Nav/Nav';
import { IClasses } from '../features/interfaces/interface';
import { RootState, useAppDispatch, useAppSelector } from '../features/store';
import { setColor } from '../features/Auth/userSlice';

const Header: FC = () => {
    const { header, bgcb, bgca }: IClasses = classes;
    const dispatch = useAppDispatch();
    const color = useAppSelector((state: RootState) => state.user.color);
    const handlerClick = (): void => {
        dispatch(setColor(!color))

    }

    return (
        <header className={header}>
            <Logo />
            <Nav />
            <button className={color ? bgcb : bgca}
                onClick={() => {
                    handlerClick()
                }}
            ></button>
        </header>
    );
};
export default Header;