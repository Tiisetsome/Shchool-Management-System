import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import AdminContext from '../../context/admin/adminContext'

import {FormStyles} from '../Styles/FormStyles'
import SideNavigation from '../SideNavigation';
import TeacherSideNavs from "../SideNavigations/TeacherSideNavs"
import { ContentStyles } from '../Styles/ContentStyles';

const EventForm = () => {

    // Use admin contxt
    const adminContext = useContext(AdminContext);

    // Destrcuture items
    const {addStatus, addCase}  = adminContext;

    // Form state
    const [fields, setFields] = useState({
        student_id: '',
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

    const isNumbers = (fieldInput) => {
        const regex = !/^[0-9]+$/.test(fieldInput)
        let errorMessage ;
        if(regex){
            errorMessage = "Please enter a valid student ID.";
            setErrorMsg(errorMessage);
            return false;
        }
        return true;
    }

    // Handle form submit
    const submitHandler = (e) => {
        e.preventDefault();
        const inputs = Object.values(fields);

        // Check empty fields
        if(isEmpty(inputs)) return;

        // Check person ID input
        if(!isNumbers(fields.phone)) return;

        setErrorMsg(null);
        addCase(fields);

        // Empty form fields
        setFields({
            ...fields,
            student_id: '',
            message: ''
        })
    }

    return (
        <ContentStyles>
            <SideNavigation/>
            <EventFormStyles>
                <p style={{background: '#F0F0F0'}} className="p-header">Home - <span>Cases</span></p>
                <div className='header'>
                    <p>Add Case</p>
                </div>
                {errorMsg !== null ? <div className="error">{errorMsg}</div> : null}
                <form>
                    <div>
                        <label>Student ID :</label>
                        <input type="text" name = "student_id" onChange={(e)=>changeHandler(e,'student_id')} value={fields.student_id}/>
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

export default EventForm
