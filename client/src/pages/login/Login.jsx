import { React, useRef, useContext } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({ email:email.current.value ,password:password.current.value }, dispatch)
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Tweeter</h3>
                    <span className="loginDesc">
                        It is happening now. Join Tweeter
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" type="email" required ref={email} className="loginInput" />
                        <input placeholder="Password" type="password" required ref={password} minLength="6" className="loginInput" />
                        <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="25px" /> : "Log In"}</button>
                        <Link to='/register'>
                            <button className="loginButton loginRegisterButton">Create a New Account</button>
                        </Link>
                        <span className="loginForgot">Forgot Password?</span>
                    </form>
                </div>
            </div>
        </div>
    )
}
