import { FC } from 'react';
import classes from './header.module.sass';
import Logo from './components/Logo/Logo'
import Nav from './components/Nav/Nav';

const Header: FC = () => {
    return (
        <header className={classes.header}>
            <Logo />
            <Nav />
        </header>
    );
};
export default Header;