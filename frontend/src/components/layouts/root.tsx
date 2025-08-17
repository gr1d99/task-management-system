import {Outlet, useNavigate} from "react-router-dom";
import {Navbar} from "./navbar.tsx";
import {toast, ToastContainer} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {refreshAuth} from "../../features/auth/auth-slice.ts";
import {hideNotfication} from "../../features/alerts/notification-slice.ts";

const RootLayout = () => {
    const navigate = useNavigate();
    const {content} = useAppSelector(state => state.notification)
    const dispatch = useAppDispatch();
    const {isAuthenticated} = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(refreshAuth())
        dispatch(hideNotfication())

        return () => {
            dispatch(refreshAuth())
        }
    }, [dispatch]);

    useEffect(() => {
        if (content !== null) {
            toast(content);
        }
    }, [content]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks')
        } else {
            navigate('/login')
        }
        }, [isAuthenticated]);


    return (
        <main className="container p-0">
            <Navbar/>
            <ToastContainer/>
            <div className="row mx-auto col-10 mx-0">
                <Outlet/>
            </div>
        </main>
    )
}

export {RootLayout};
