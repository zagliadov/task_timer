import { FC } from 'react';
import classes from './header.module.sass';
import Logo from './components/Logo/Logo'
import Nav from './components/Nav/Nav';
import { IClasses } from '../features/interfaces/interface';


const Header: FC = () => {
    const { header }: IClasses = classes;

    return (
        <header className={header}>
            <Logo />
            <Nav />
        </header>
    );
};
export default Header;