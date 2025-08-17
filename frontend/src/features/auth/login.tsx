import {type FormEvent, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../store";
import {loginAsync} from "./auth-slice.ts";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/tasks');
        }
    }, [loading, isAuthenticated, navigate]);

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { email, password } = event.currentTarget;

        dispatch(loginAsync({ email: email.value, password: password.value }))
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <div className="col-12">
                    <h2 className="text-center mb-4">Sign in</h2>
                </div>
                <form className="row g-3 col-md-4 border rounded p-4" onSubmit={handleLogin}>
                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input required name="email" type="email" className="form-control" id="email"/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input required type="password" name="password" className="form-control" id="password"/>
                    </div>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <button type="submit" disabled={loading} className="btn btn-primary">Sign in</button>
                        <p className="mb-0">
                            <a href="/register">Create account</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export {Login}
