import type {FormEvent} from "react";

import { registerAsync } from "./auth-slice.ts";
import { useAppDispatch } from "../../store";

const Register = () => {
    const dispatch = useAppDispatch();
    const handleRegister = (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();

        const { userName, email, password, confirmPassword } = event.currentTarget;

        dispatch(registerAsync({
            userName: userName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }));
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <div className="col-12">
                <h2 className="text-center mb-4">Register</h2>
            </div>
            <form className="row g-3 col-md-6 border rounded p-4" onSubmit={handleRegister}>
                <div className="col-md-12">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input required id="userName" type="text" className="form-control" name="userName"/>
                </div>
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input required name="email" type="email" className="form-control" id="email"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input required name="password" type="password" className="form-control" id="password"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input name="confirmPassword" type="password" className="form-control" id="confirmPassword"/>
                </div>
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary">Register</button>
                    <p className="mb-0">
                        <a href="/login">Sign in</a></p>
                </div>
            </form>
        </div>
    )
}

export {Register}
