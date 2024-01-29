import React, {useState} from 'react'
import axios from 'axios'

import "../style/registerStyles.css"

const RegisterForm = ({isShowRegister, setIsShowRegister}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const addCredentials = (event) => {
        event.preventDefault()

        const credentialObject = {
            username: username,
            password: password
        }
        axios
            .post('http://localhost:8080/api/user/register', credentialObject)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    setIsShowRegister((isShowRegister) => !isShowRegister);
                    window.alert('New account registered')
                    document.getElementById('uname').value = ''
                    document.getElementById('pass').value = ''
                }
            })
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    if (isShowRegister) {
        return (
            <div className={`${!isShowRegister ? "active" : ""} show`}>
                <div className="register-form">
                    <div className="form-box solid">
                        <form onSubmit={addCredentials}>
                            <h1 className="register-text">Register</h1>
                            <label>Username</label>
                            <br></br>
                            <input onChange={handleUsernameChange} id="uname" type="text" name="username"
                                   className="register-box"/>
                            <br></br>
                            <label>Password</label>
                            <br></br>
                            <input onChange={handlePasswordChange} id="pass" type="password" name="password"
                                   className="register-box"/>
                            <br></br>
                            <br></br>
                            <input type="submit" value="REGISTER" className="register-btn"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterForm;