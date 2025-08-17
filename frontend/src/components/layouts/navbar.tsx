import {useState} from "react";

import './navbar.scss';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {logout} from "../../features/auth/auth-slice.ts";

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const handleAuthClick = () => {
        if (auth.isAuthenticated) {
            dispatch(logout());
        }

        navigate('/login')
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold text-black" href="/">
                    Task Management System
                </a>

                <div className="d-flex">
                    <button
                        onClick={handleAuthClick}
                        className="btn auth-btn"
                        type="button"
                    >
                        {auth.isAuthenticated ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export { Navbar }
