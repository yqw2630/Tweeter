import { React, useRef } from 'react'
import './register.css'
import { Link, useNavigate  } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        }
        try {
            await axios.post("/auth/register/", user)
            navigate('/login')
        }  catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Tweeter</h3>
                    <span className="registerDesc">
                        It is happening now. Join Tweeter
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input placeholder="Username" required ref={username} className="registerInput" />
                        <input placeholder="Email" type="email" required ref={email} className="registerInput" />
                        <input minLength="6" placeholder="Password" type="password" required ref={password} className="registerInput" />
                        <button className="registerButton" type="submit">Sign Up</button>
                        <Link to='/login'>
                            <button className="registerButton registerRegisterButton">Log Into Account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
