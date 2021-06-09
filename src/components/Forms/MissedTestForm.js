import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import AdminContext from '../../context/admin/adminContext'

import {FormStyles} from '../Styles/FormStyles'
import SideNavigation from '../SideNavigation';
import TeacherSideNavs from "../SideNavigations/TeacherSideNavs"
import { ContentStyles } from '../Styles/ContentStyles';

const MissedTestForm = () => {

    // Use admin contxt
    const adminContext = useContext(AdminContext);

    // Destrcuture items
    const {teacher, addStatus, addMissedTest}  = adminContext;

    // Form state
    const [fields, setFields] = useState({
        student_id: '',
        grade: 'Grade 8',
        reason: '',
        subject: teacher.subjects[0]
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
      if(fieldInputs[i] == ""){
        errorMessage = 'Please fill in all fields.';
        setErrorMsg(errorMessage);
        return true;
      }
    }
    return false;
  }

  const isNumbers = (fieldInput) => {
    const regex = !/^[0-9]+$/.test(fieldInput);
    let errorMessage ;
    if(regex){
      errorMessage = "Please enter a valid ID";
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
        if(!isNumbers(fields.student_id)) return;

        setErrorMsg(null);
        addMissedTest(fields);
        
        // Empty form fields
        setFields({
            student_id: '',
            grade: 'Grade 8',
            reason: '',
            subject: teacher.subjects[0]
        })
    }
    
    console.log(fields)

    return (
        <ContentStyles>
            <TeacherSideNavs/>
            <EventFormStyles>
                <p style={{background: '#F0F0F0'}} className="p-header">Home - <span>Students</span></p>
                <div className='header'>
                    <p>Add Case</p>
                </div>
                {errorMsg !== null ? <div className="error" style = {{fontWeight: "500"}}>{errorMsg}</div> : null}
                <form>
                    <div>
                        <label>Student ID :</label>
                        <input type="text" name = "student_id" onChange={(e)=>changeHandler(e,'student_id')} value={fields.student_id}/>
                    </div>
                    <div>
                        <label>Grade :</label>
                        <select name = "grade" onChange={(e)=>changeHandler(e,'grade')} defaultValue={teacher.classes[0]} value={fields.grade}>
                            {teacher.classes.map((grade, index) => {
                                return <option key={index} value = {grade}>{grade}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Subject :</label>
                        <select name = "subject" onChange={(e)=>changeHandler(e,'subject')} defaultValue={teacher.subjects[0]} value={fields.subject}>
                            {teacher.subjects.map((subject, index) => {
                                return <option key={index} value = {subject}>{subject}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Message :</label>
                        <textarea type="text" name = "reason" onChange={(e)=>changeHandler(e,'reason')} value={fields.reason}></textarea>
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

export default MissedTestForm
