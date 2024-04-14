import React, { useState } from 'react';
import './NavigationBar.css';
import { useLocation, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const NavigationBar: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const location = useLocation();

    const isActive = (pathname: string) => {
        return location.pathname === pathname;
    };

    return (
        <header>
            <Icon
                className='mobile-nav-toggle'
                onClick={() => setIsNavOpen(!isNavOpen)}
                icon={
                    isNavOpen
                        ? 'material-symbols-light:close'
                        : 'fluent:navigation-16-regular'
                }
            ></Icon>

            <nav>
                <ul
                    data-visible={isNavOpen}
                    className='flex primary-navigation'
                >
                    <li>
                        <Link
                            to='/'
                            className={`text-glow nav-link ${
                                isActive('/') ? 'active-nav-link' : ''
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/favorites'
                            className={`text-glow nav-link ${
                                isActive('/favorites') ? 'active-nav-link' : ''
                            }`}
                        >
                            Favorites
                        </Link>
                    </li>

                    <li className='nav-bar-icon'>
                        <Link
                            to='/'
                            className={`nav-link ${
                                isActive('/favorites') ? 'active-nav-link' : ''
                            }`}
                        >
                            <Icon
                                icon='arcticons:weather-forecast'
                                className='icon'
                            ></Icon>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavigationBar;
