import React, {useState, useContext} from 'react'
import {UserContext} from '../../UserContext'
import {Redirect} from 'react-router-dom'

const Login = () => {

    const {user, setUser} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const submitHandler = async e => {
        e.preventDefault();
        setEmailError('')
        setPasswordError('')
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data)
            
            if(data.errors){
                const {errors} = data
                setEmailError(errors.email)
                setPasswordError(errors.password)
            }
            if(data.user){
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(user){
        return <Redirect to="/"/>
    }

    return (
        <div className="row">
        <h2>Login</h2>
        <form className="col s12" onSubmit={submitHandler}>
            <div className="row">
                <div className="input-field col s12">
                    <input id="email" type="email" className="validate" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <div className="email error red-text">{emailError}</div>
                    <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="password" type="password" className="validate" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <div className="password error red-text">{passwordError}</div>
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <button className="btn">LOGIN</button>
        </form>
        </div>

    )
}

export default Login