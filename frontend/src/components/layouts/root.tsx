import {Outlet} from "react-router-dom";
import {Navbar} from "./navbar.tsx";
import {ToastContainer} from "react-toastify";
import {useAppDispatch} from "../../store";
import {useEffect} from "react";
import {refreshAuth} from "../../features/auth/auth-slice.ts";

const RootLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(refreshAuth())

        return () => {
            dispatch(refreshAuth())
        }
    }, [dispatch]);

    return (
        <main className="container p-0 h-100">
            <Navbar />
            <ToastContainer />
            <div className="row mx-auto col-10 mx-0 h-100">
                <Outlet />
            </div>
        </main>
    )
}

export { RootLayout };
