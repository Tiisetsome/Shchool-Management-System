import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import AdminContext from '../../context/admin/adminContext'
import AuthContext from '../../context/authentication/authContext'

import {FormStyles} from '../Styles/FormStyles'
import SideNavigation from '../SideNavigation';
import TeacherSideNavs from "../SideNavigations/TeacherSideNavs"
import { ContentStyles } from '../Styles/ContentStyles';

const NoticeForm = () => {

    // Use admin contxt
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    // Destrcuture items
    const {addStatus, addNotice}  = adminContext;
    const {person_id, role} = authContext;

    // Form state
    const [fields, setFields] = useState({
        teacher_id: person_id,
        message: ''
    })

    // Error message state
    const [errorMsg, setErrorMsg] = useState(null)

    // Handle change
    const changeHandler = (e, input) => {
        setFields({
            ...fields,
            [input]: e.target.value
        })
    }

     // Form validation
     const isEmpty = (fieldInputs) => {
        let errorMessage ;
        for(let i = 0; i < fieldInputs.length; i++){
            if(fieldInputs[i].length == 0){
                errorMessage = 'Notice cannot be empty.';
                setErrorMsg(errorMessage);
                return true;
            }
        }
        return false;
    }

    // Handle form submit
    const submitHandler = (e) => {
        e.preventDefault();
        const inputs = Object.values(fields);

        // Check empty fields
        if(isEmpty(inputs)) return;

        setErrorMsg(null);
        addNotice(fields);

        // Empty form fields
        setFields({
            ...fields,
            message: ''
        })
    }

    return (
        <ContentStyles>
            <SideNavigation/>
            <NoticeFormStyles>
                <p style={{background: '#F0F0F0'}} className="p-header">Home - <span>Notices</span></p>
                <div className='header'>
                    <p>Add Notice</p>
                </div>
                {errorMsg !== null ? <div className="error">{errorMsg}</div> : null}
                <form>
                    <div>
                        <label>Message :</label>
                        <textarea type="text" name = "message" onChange={(e)=>changeHandler(e,'message')} value={fields.message}></textarea>
                    </div>
                    <button onClick = {(e)=>submitHandler(e)}>Submit</button>
                </form>
                {addStatus.status? <div className = "notice">{addStatus.message}</div> : null}
            </NoticeFormStyles>
        </ContentStyles>
    )
}

const NoticeFormStyles = styled(FormStyles)`
    margin-bottom: 2rem;

    .header{
        padding: 1rem 2rem;
    }

    .error{
        font-weight: 500;
    }

    form {
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: 500px){

        .header{
            padding: 1rem;
        }
        
        form{
            margin: 3rem 1rem 1rem 1rem;

            div{
                label{
                    font-size: .75rem;
                }
    
                input, select, textarea{
                    padding: .6rem;
                    font-size: .7rem;
                }
            }

            button{
                width: 100%;
                padding: .75rem;
                font-size: .8rem !important;
                font-family: Montserrat-Regular;
            }
        }
    }
`

export default NoticeForm
