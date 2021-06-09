import React, {useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {GiCancel} from 'react-icons/gi'

import {LoginStyles} from '../components/Styles/LoginStyles'

const Login = ({changeHandler, signupChangeHandler, submitHandler, signupSubmitHandler, signupVerification, credentials, signup, backdrop, signInErrorMessage, signInErrorStatus, loading, errorMsg, resetAll, setBackdrop}) => {

    const styles = {
        background: 'black'
    }
    const iconStyle = {
        position: 'absolute',
        top: '-2.5rem',
        right: window.innerWidth < 500 ? '0.5rem' : '-9.5rem',
        fontSize: '1.2rem',
        color: 'rgb(22, 122, 109)',
        cursor: 'pointer'
    }
    console.log(signInErrorStatus)
    return (
        <LoginStyles backdrop={backdrop}>
           <div className="container">
                <form>
                    {errorMsg !== null ? <div className="error">{errorMsg}</div> : signInErrorStatus ? <p className="error">{signInErrorMessage}</p> : null}
                    <div>
                        <label>Enter ID :</label>
                        <input type="text" name="person_id" value={credentials.person_id} onChange={(e) => changeHandler(e, 'person_id')}/>
                    </div>
                    <div>
                        <label>Password :</label>
                        <input type="password" name="pwd" value={credentials.pwd} onChange={(e) => changeHandler(e, 'pwd')}/>
                    </div>
                    <div>
                        <button onClick={(e) => submitHandler(e)}>{loading ? 'Loading...' : 'Sign In' }</button>
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
            {backdrop && signup.updated == false? 
            <div className="signup-form">
                <FormStyles>
                    <div>
                        {signup.errorStatus ? <p className="error">{signup.errorMessage}</p> : <p>*An OTP code will be sent to your email to confirm your identity in order to create a new account.</p>}
                    </div>
                    <div className='cancel'>
                        <GiCancel style={iconStyle} onClick={()=> resetAll(false)}/>
                    </div>
                    <div>
                        <label>Enter ID :</label>
                        <input type="text" name="person_id" value={signup.person_id} onChange={(e) => signupChangeHandler(e, 'person_id')}/>
                    </div>
                    <div>
                        <button onClick={(e) => {signupVerification(e)}}>Sign Up</button>
                    </div>
                </FormStyles>
            </div> : signup.updated ?
                <div className="signup-form">
                    <FormStyles>
                        {errorMsg !== null ? <div className="error">{errorMsg}</div> : signInErrorStatus ? <p className="error">{signInErrorMessage}</p> : null}
                        <div className='cancel'>
                            <GiCancel style={iconStyle} onClick={()=> resetAll(false)}/>
                        </div>
                        <div>
                            <label>OTP code :</label>
                            <input type="text" name="otp_code" value={signup.otp_code} onChange={(e) => signupChangeHandler(e, 'otp_code')}/>
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
                    </FormStyles>
                </div> 
                : null
            }
            <footer>
                <p>All Rights Reserved &copy; Copyright 2020 | Developed And Mantained By T-tech </p>
            </footer>
        </LoginStyles>
    )
}

const FormStyles = styled.form`
    position: relative;

    p{
        text-align: center;
        font-size: .85rem;
    }
    
    .error{
        padding: .5rem;
        margin-bottom: 1rem;
        font-size: 0.8rem;
        font-weight: 600;
        text-align: center;
        color: #fff;
        background-color: rgb(180, 4, 4);
    }

`;

export default Login
