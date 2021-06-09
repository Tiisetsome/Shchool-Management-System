import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import AdminContext from '../../context/admin/adminContext'

import {FormStyles} from '../Styles/FormStyles'
import TeacherSideNavs from "../SideNavigations/TeacherSideNavs"
import { ContentStyles } from '../Styles/ContentStyles';

const NoticeForm = () => {

    // Use admin contxt
    const adminContext = useContext(AdminContext);

    // Destrcuture items
    const {addStatus, addTestNotice}  = adminContext;

    // Form state
    const [fields, setFields] = useState({
        test_date: '',
        grade: 'Grade 8',
        section: '',
        type: 'Class Test',
        subject: 'Physical Sciences'
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

    // Input form validation
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

    // Handle form submit
    const submitHandler = (e) => {
        e.preventDefault();
        const inputs = Object.values(fields);
      
        // Check empty fields
        if(isEmpty(inputs)) return;  

        setErrorMsg(null);
        addTestNotice(fields);

        // Empty form fields
        setFields({
            ...fields,
            test_date: '',
            grade: 'Grade 8',
            section: '',
            type: '',
            subject: 'Physical Sciences'
        })
    }

    return (
        <ContentStyles>
            <TeacherSideNavs/>
            <NoticeFormStyles>
                <p style={{background: '#F0F0F0'}} className="p-header">Home - <span>Notices</span></p>
                <div className='header'>
                    <p>Add Test Notice</p>
                </div>
                {errorMsg !== null ? <div className="error" style = {{fontWeight: "500"}}>{errorMsg}</div> : null}
                <form>
                    <div>
                        <label>Test date :</label>
                        <input type="date" name = "test_date" onChange={(e)=>changeHandler(e,'test_date')} value={fields.test_date}/>
                    </div>
                    <div>
                        <label>Grade :</label>
                        <select name = "grade" onChange={(e)=>changeHandler(e,'grade')} defaultValue={"Grade 8"} value={fields.grade}>
                            <option value="Grade 8">Grade 8</option>
                            <option value="Grade 9">Grade 9</option>
                            <option value="Grade 10">Grade 10</option>
                            <option value="Grade 11">Grade 11</option>
                            <option value="Grade 12">Grade 12</option>
                        </select>
                    </div>
                    <div>
                        <label>Section :</label>
                        <input type="text" name = "section" onChange={(e)=>changeHandler(e,'section')} value={fields.section}/>
                    </div>
                    <div>
                        <label>Type :</label>
                        <select name = "type" onChange={(e)=>changeHandler(e,'type')} defaultValue={"Class Test"} value={fields.type}>
                            <option value="Class Test">Class Test</option>
                            <option value="Formal Test">Formal Test</option>
                            <option value="June Exam">June Exam</option>
                            <option value="Preparatory Exam">Preparatory Exam</option>
                            <option value="Final Exam">Final Exam</option>
                        </select>
                    </div>
                    <div>
                        <label>Subject :</label>
                        <select name = "subject" onChange={(e)=>changeHandler(e,'subject')} defaultValue={"Physical Sciences"} value={fields.subject}>
                            <option value="Physical Sciences">Physical Sciences</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Life Sciences">Life Sciences</option>
                            <option value="Agricultural Sciences">Agricultural Sciences</option>
                            <option value="Geography">Geography</option>
                            <option value="Accounting">Accounting</option>
                            <option value="Economics">Economics</option>
                            <option value="Mathematical Literacy">Mathematical Literacy</option>
                            <option value="Life Orientation">Life Orientation</option>
                            <option value="Sepedi">Sepedi</option>
                            <option value="English">English</option>
                        </select>
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

    form {
        grid-template-columns: 1fr;
    }
`

export default NoticeForm
