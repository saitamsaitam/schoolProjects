import React, {useState} from 'react'
import axios from "axios";

import "../style/loginStyles.css"

const LoginForm = ({isShowLogin, setIsShowLogin}) => {

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const checkCredentials = (event) => {
        event.preventDefault()
        const inputCredentials = {
            username: loginUsername,
            password: loginPassword
        }
        axios
            .post('http://localhost:8080/api/user/login', inputCredentials)
            .then(response => {
                console.log(response)
                if (response.status === 202) {
                    let tokenKey = 'myToken'
                    localStorage.setItem(tokenKey,
                        JSON.stringify(response.data))
                    localStorage.setItem('username', loginUsername)
                    setIsShowLogin((isShowLogin) => !isShowLogin);
                    window.alert('Login successful')
                    //document.getElementById('loginUName').value = ''
                    //document.getElementById('loginPass').value = ''
                } else {
                    window.alert('Something went wrong')
                    console.log('check server console')
                }
            })
    }

    const handleLoginUsernameChange = (event) => {
        setLoginUsername(event.target.value)
    }

    const handleLoginPasswordChange = (event) => {
        setLoginPassword(event.target.value)
    }
    if (isShowLogin) {

        return (
            <div className={`${!isShowLogin ? "active" : ""} show`}>
                <div className="login-form">
                    <div className="form-box solid">
                        <form onSubmit={checkCredentials}>
                            <h1 className="login-text">Sign in</h1>
                            <label>Username</label>
                            <br></br>
                            <input onChange={handleLoginUsernameChange} id="loginUName" type="text" name="username"
                                   className="login-box"/>
                            <br></br>
                            <label>Password</label>
                            <br></br>
                            <input onChange={handleLoginPasswordChange} id="loginPass" type="password" name="password"
                                   className="login-box"/>
                            <br></br>
                            <br></br>
                            <input type="submit" value="LOGIN" className="login-btn"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm;