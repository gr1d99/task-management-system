import {Outlet} from "react-router-dom";
import {Navbar} from "./navbar.tsx";
import {toast, ToastContainer} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import { redirect } from "react-router-dom";
import {refreshAuth} from "../../features/auth/auth-slice.ts";
import {hideNotfication} from "../../features/alerts/notification-slice.ts";

const RootLayout = () => {
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
            redirect('/tasks')
        }

        console.log({ isAuthenticated })
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
