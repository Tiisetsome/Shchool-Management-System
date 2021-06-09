import React, {useContext, useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {HiOutlineRefresh} from 'react-icons/hi'

import AdminContext from '../../context/admin/adminContext'
import {ContentStyles} from '../../components/Styles/ContentStyles';
import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs'

const RegularTeacherAssessment = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teachers, teacher, addAssessment} = adminContext;

    // Input fields state
    const [fields, setFields] = useState({
        grade: teacher.classes[0],
        subject: teacher.subjects[0],
        sub_date: '',
        duration: '',
        question: '',
        answers: '',
        correctAns: '',
        correctAnsArr: [],
        finalAnswers: [],
    })

    const [assessment, setAssessment] = useState({
        grade: '',
        subject: '',
        duration: '',
        sub_date: '',
        finalCorrectAns: [],
        assessmentData : []
    })

    // Error message state
    const [errorMsg, setErrorMsg] = useState(null)

    // Error message state
    const [answerOpt, setAnswerOpt] = useState(null)

    // Form validation
    const isEmpty = (fieldInputs, answerField) => {
        let errorMessage ;
        let errorMessageAns;
        for(let i = 0; i < fieldInputs.length; i++){
            if(fieldInputs[i].length == 0 && answerField !== 'answers'){
                errorMessage = 'Please fill in all fields.';
                setErrorMsg(errorMessage);
                return true;
            } else if(fieldInputs[i].length == 0 && answerField === 'answers'){
                errorMessageAns = 'Enter valid answer option.';
                setAnswerOpt(errorMessageAns);
                return true;
            }
        }
        return false;
    }

    const isNumbers = (fieldInput) => {
        const regex = !/^[0-9]+$/.test(fieldInput);
        let errorMessage ;
        if(regex){
            errorMessage = "Time must be a number.";
            setErrorMsg(errorMessage);
            return false;
        }
        return true;
    }

    const ansOptionsExceed = (fieldInput) => {
        console.log(fieldInput)
        let errorMessageAns;
        if(fieldInput.length >= 4){
            errorMessageAns = 'Answer options must be 4 in total.';
            setAnswerOpt(errorMessageAns);
            return true;  
        } 
        return false
    }

    const ansOptionsLow = (fieldInput) => {
        let errorMessageAns;
        if(fieldInput.length !== 4){
            errorMessageAns = 'Answer options must be 4 in total.';
            setAnswerOpt(errorMessageAns);
            return true;  
        } 
        return false
    }

    const isAssessmentEmpty = (fieldInputs) => {
        let errorMessage ;
        let errorMessageAns;
        for(let i = 0; i < fieldInputs.length; i++){
            if(fieldInputs[i].length == 0){
                errorMessage = 'Please save assessment before submiting.';
                setErrorMsg(errorMessage);
                return true;
            }
        }
        return false;
    }

    // On change handler
    const onChangeHandler = (e, input) => {
        setFields({
            ...fields,
            [input] : e.target.value,
        })
    }

    // Handle added answer
    const addAnswersHandler = () => {
        const answer = fields.answers

        // Check empty fields
        if(isEmpty([answer], 'answers')) return;

        // Check answer options [must be exactly for in total]
        if(ansOptionsExceed(fields.finalAnswers)) return;

        setAnswerOpt(null);

        setFields({
            ...fields,
            finalAnswers: [...fields.finalAnswers, answer],
            answers: ''
        })
    }

    // Handle save and continue
    const saveHandler = () => {
        // Get keys
        const fieldKeys = Object.keys(fields).filter(field => field !== 'answers' && field !== 'correctAnsArr');
        
        // Save Key values
        let fieldValues = [];
        fieldKeys.forEach(field => fieldValues.push(fields[field]))

        // Check empty fields
        if(isEmpty(fieldValues)) return;

        // Check person ID input
        if(!isNumbers(fields.duration)) return;

        // Check answer options length
        if(ansOptionsLow(fields.finalAnswers)) return;

        setErrorMsg(null);
        setAnswerOpt(null);

        setAssessment({
            grade: fields.grade,
            subject: fields.subject,
            duration: fields.duration,
            sub_date: fields.sub_date,
            finalCorrectAns: [...assessment.finalCorrectAns, fields.correctAns],
            assessmentData: [...assessment.assessmentData,{
                sub_date: fields.sub_date,
                question: fields.question,
                finalAnswers: fields.finalAnswers,
            }]
        })

        // Reset inputs
        setFields({
            ...fields,
            grade: teacher.classes[0],
            question: '',
            answers: '',
            correctAns: '',
            finalAnswers: [],
        })
    }

    const submitHandler = () => {
        const assessmentValues = Object.values(assessment);

        // Check empty fields
        if(isAssessmentEmpty(assessmentValues)) return;
        
        addAssessment({
            ...assessment,
            finalCorrectAns: JSON.stringify(assessment.finalCorrectAns),
            assessmentData: JSON.stringify(assessment.assessmentData)
        })
        console.log(assessment);

        // Reset assessment
        setAssessment({
            ...assessment,
            grade: '',
            subject: '',
            duration: '',
            finalCorrectAns: [],
            assessmentData : []
        })
        
    }

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
        cursor: "pointer"
    }

    return (
        <AssessmentStyles>
            <TeacherSideNavs/>
            <section>
                <p className="p-header">Home - <span>Assessments</span></p> 
                <div className='header'>
                    <p>Create Assessment</p>
                    <HiOutlineRefresh style={style}/>
                </div> 
                {errorMsg !== null ? <div className="error" style = {{fontWeight: "500"}}>{errorMsg}</div> : null}
                <form>
                    <div>
                        <label>Choose Class :</label>
                        <select name="grade" value = {fields.grade} onChange={(e) => onChangeHandler(e, 'grade')}>
                            {teacher.classes.map((grade, index) => {
                                return <option key={index} value={grade}>{grade}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Choose Subject :</label>
                        <select name="subject" defaultValue="Physical Sciences" onChange={(e) => onChangeHandler(e, 'subject')}>
                            <option value="physics">Physical Sciences</option>
                            <option value="Mathematics">Mathematics</option>
                        </select>
                    </div>
                    <div>
                        <label>Submission Date</label>
                        <input type="date" value={fields.sub_date} name="sub_date" onChange={(e) => onChangeHandler(e, 'sub_date')}/>
                    </div>
                    <div>
                        <label>Set time</label>
                        <input type="text" name="duaration" value={fields.duration} onChange={(e) => {onChangeHandler(e, 'duration')}}/>
                    </div>
                    <div>
                        <label>Question 1</label>
                        <textarea name="question" value={fields.question} onChange={(e) => onChangeHandler(e, 'question')}></textarea>
                    </div>
                    <div className="answers">
                        <div>
                            <label>Answer options</label>
                            {answerOpt !== null ? <p className='ansError'>{answerOpt}</p> : null}
                            <input type="text" value={fields.answers} name="answers" onChange={(e) => onChangeHandler(e, 'answers')}/>
                            {fields.finalAnswers.length > 0 ?
                                <div className="preview">
                                    <p className="note">Answers Preview :</p>
                                    <div>
                                        {fields.finalAnswers.map((answer, index) => {
                                            return <p key={index}>{answer}</p>
                                        })}
                                    </div>
                                </div>: null
                            }
                        </div>
                        <div className="add-btn" onClick={() => addAnswersHandler()}><span>+</span></div>
                    </div>
                    <div>
                        <label>Correct Answer</label>
                        <input type="text" name="correctAns" value={fields.correctAns} onChange={(e) => {onChangeHandler(e, 'correctAns')}}/>
                    </div>
                    <div className="buttons">
                            <div className="save-btn" onClick={() => saveHandler()}>Save & Continue</div>
                            <div className="submit-btn" onClick={() => submitHandler()}>Submit</div>
                    </div>
                </form>
            </section>
        </AssessmentStyles>
    )
}

const AssessmentStyles = styled(ContentStyles)`

    P{
        margin-bottom: 0rem;
        line-height: 1.2rem;
    }

    .p-header{
        background: #F0F0F0 !important;
        padding-bottom: 2rem;
    }

    .header{
        padding: 1rem 2rem 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(220, 220, 220);
        color: black;

        p{
            font-weight: 600;
            color: black !important;
        }
    }

    section{
        background-color: #fff;
        margin-bottom: 2rem;

        .error{
            padding: .5rem;
            margin: 2rem 2rem 0rem 2rem;
            font-size: 0.8rem;
            font-weight: 600;
            text-align: center;
            color: #fff;
            background-color: rgb(180, 4, 4);
        }

        form{
            padding: 2rem;

            div{
                color: grey;
                width: 70%;

                label{
                    display: block;
                    margin-bottom: 1rem;
                    font-size: .9rem;
                }

                input,
                select,
                textarea{
                    width: 100%;
                    margin-bottom: 1rem;
                    padding: .5rem;
                    border: 1px rgb(233, 140, 0) solid;
                    border-radius: 5px;
                    background: transparent;
                    color: grey;
                }

                textarea{
                    height: 5rem;
                }
            }

            .answers{
                display: flex;
                align-items: center;

                .ansError{
                    margin-bottom: .5rem;
                    color: rgb(180, 4, 4);
                }

                .preview{
                    display: flex;

                    .note{
                        width: 10rem;
                        margin-bottom: 1rem;
                    }
                }

                .add-btn{
                    width: 1.8rem;
                    height: 1.8rem;
                    margin-top: 1rem;
                    margin-left: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 100%;
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #fff;
                    background-color: rgb(9, 95, 95);
                    cursor: pointer;

                    span{
                        margin-top: -.25rem;
                    }
                }
            }

            .buttons{
                width: 22rem;
                margin-top: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .save-btn,
                .submit-btn{
                    width: 10rem;
                    padding: .8rem 0rem;
                    border-radius: 5px;
                    font-size: .8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    color: #fff;
                    text-align: center;
                    background-color: rgb(233, 140, 0);
                    cursor: pointer;
    
                    &:hover{
                        background-color: rgb(161, 97, 0);
                    }
                }

                .submit-btn{
                    background-color: rgb(9, 95, 95);

                    &:hover{
                        background-color: rgb(15, 228, 217);
                    }
                }
            }
        }
    }

    @media screen and (max-width: 500px){

        p{
            font-size: .75rem !important;
        }
        
        .header{
            padding-left: 1rem;
        }

        section{
            form{
                padding: 2rem 1rem;

                div{
                    width: 100%;

                    label{
                        font-size: .75rem;
                    }
        
                    input, select, textarea{
                        padding: .6rem;
                        font-size: .7rem;
                    }
                }

                .answers .preview .note{
                    width: 15rem;
                    font-size: .75rem;
                }

                .buttons{
                    width: 100%;
                    flex-direction: column;

                    .save-btn,
                    .submit-btn{
                        width: 100%;
                    }

                    .save-btn{
                        margin-bottom: 1.5rem;
                    }
                }
            }
        }
    }

`;

export default withRouter(RegularTeacherAssessment);
