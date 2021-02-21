import React, {useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import {LoginStyles} from '../components/Styles/LoginStyles'

const Login = ({changeHandler, signupChangeHandler, submitHandler, signupSubmitHandler, credentials, signup, backdrop, setBackdrop}) => {

    const styles = {
        background: 'black'
    }

    return (
        <LoginStyles backdrop={backdrop}>
           <div className="container">
                <form>
                    <div>
                        <label>Enter ID :</label>
                        <input type="text" name="person_id" value={credentials.person_id} onChange={(e) => changeHandler(e, 'person_id')}/>
                    </div>
                    <div>
                        <label>Password :</label>
                        <input type="password" name="pwd" value={credentials.pwd} onChange={(e) => changeHandler(e, 'pwd')}/>
                    </div>
                    <div>
                        <button onClick={(e) => submitHandler(e)}>Sign In</button>
                    </div>
                    <div>
                        <Link>
                            <li>Forgot Password?</li>
                        </Link>
                        <Link>
                            <li onClick={()=> setBackdrop(true)}>Create Account</li>
                        </Link>
                    </div>
                </form>
                <div className="visuals">
                    <img src="/imgs/data.svg" alt=""/>
                    <p>Welcome To Mosepedi</p>
                    <h3>School Management System</h3>
                </div>
            </div>
            {backdrop? <div className="signup-form">
                <form>
                    <div>
                        <label>Enter ID :</label>
                        <input type="text" name="person_id" value={signup.person_id} onChange={(e) => signupChangeHandler(e, 'person_id')}/>
                    </div>
                    <div>
                        <label>Password :</label>
                        <input type="password" name="pwd" value={signup.pwd} onChange={(e) => signupChangeHandler(e, 'pwd')}/>
                    </div>
                    <div>
                        <label>Confirm Password :</label>
                        <input type="password" name="pwd_confirm" value={signup.pwd_confirm} onChange={(e) => signupChangeHandler(e, 'pwd_confirm')}/>
                    </div>
                    <div>
                        <button onClick={(e) => {signupSubmitHandler(e)}}>Sign Up</button>
                    </div>
                </form>
            </div> : null}
            <footer>
                <p>All Rights Reserved &copy; Copyright 2020 | Developed And Mantained By T-tech </p>
            </footer>
        </LoginStyles>
    )
}

export default Login
