import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import AdminContext from '../../context/admin/adminContext'
import AuthContext from '../../context/authentication/authContext'

import {FormStyles} from '../Styles/FormStyles'
import SideNavigation from '../SideNavigation';
import TeacherSideNavs from "../SideNavigations/TeacherSideNavs"
import { ContentStyles } from '../Styles/ContentStyles';

const EventForm = () => {

    // Use admin contxt
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    // Destrcuture items
    const {addStatus, addEvent}  = adminContext;
    const {person_id, role} = authContext;

    // Form state
    const [fields, setFields] = useState({
        teacher_id: person_id,
        title: '',
        startTime: '',
        endTime: '',
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
                errorMessage = 'Please fill in all fields.';
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
        addEvent(fields);

        // Empty form fields
        setFields({
            ...fields,
            title: '',
            startTime: '',
            endTime: '',
            message: ''
        })
    }

    return (
        <ContentStyles>
            <SideNavigation/>
            <EventFormStyles>
                <p style={{background: '#F0F0F0'}} className="p-header">Home - <span>Notices</span></p>
                <div className='header'>
                    <p>Add Event</p>
                </div>
                {errorMsg !== null ? <div className="error">{errorMsg}</div> : null}
                <form>
                    <div>
                        <label>Title :</label>
                        <input type="text" name = "title" onChange={(e)=>changeHandler(e,'title')} value={fields.title}/>
                    </div>
                    <div>
                        <label>Start (Date and Time) :</label>
                        <input type="datetime-local" name = "startTime" onChange={(e)=>changeHandler(e,'startTime')} value={fields.startTime}/>
                    </div>
                    <div>
                        <label>End (Date and Time) :</label>
                        <input type="datetime-local" name = "endTime" onChange={(e)=>changeHandler(e,'endTime')} value={fields.endTime}/>
                    </div>
                    <div>
                        <label>Message :</label>
                        <textarea type="text" name = "message" onChange={(e)=>changeHandler(e,'message')} value={fields.message}></textarea>
                    </div>
                    <button onClick = {(e)=>submitHandler(e)}>Submit</button>
                </form>
                {addStatus.status? <div className = "notice">{addStatus.message}</div> : null}
            </EventFormStyles>
        </ContentStyles>
    )
}

const EventFormStyles = styled(FormStyles)`
    margin-bottom: 2rem;

    .header{
        padding: 1rem 2rem;
    }

    .error{
        font-weight: 550;
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

export default EventForm
