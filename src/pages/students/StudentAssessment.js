import React, {useContext, useState, useEffect} from 'react'
import {HiOutlineRefresh} from 'react-icons/hi'
import styled from 'styled-components'
import StudentContext from '../../context/students/studentContext'
import AdminContext from '../../context/admin/adminContext'
import {useHistory} from 'react-router-dom'

import StudentSideNavs from '../../components/SideNavigations/StudentSideNavs'
import {ContentStyles} from '../../components/Styles/ContentStyles'

const StudentAssessment = () => {

    // Use student context
    const studentContext = useContext(StudentContext);
    const adminContext = useContext(AdminContext);

    // History method
    const history = useHistory()

    // Destructure items
    const {student, student_assessments, sendMarks, assessment_marks, stopPrivileges, searchAssessments, resetMarksStatus} = studentContext;
    const {addMarks} = adminContext;

    const [assessmentTimer, setAssessmentTimer] = useState({
        assSeconds: null,
        assMinutes: null,
        assNumber: null,
        timerVariable: null,
        status: false
    })

    const [answerInput, setAnswerInput] = useState({
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        myAnswers: []
    })

    const [assTest, setAssTest] = useState(student_assessments)

    // Filter student assessments based on the learner grade and subject
    const filterAss = (std, assessments) => {
        let studentAssessments = assessments.filter(assessment => assessment.grade === std.grade && assessment.subject === subs(assessment.subject, std.subjects) && std.student_id === assessment.student_id && assessment.assessment_status === false)

        // Find subject match
        function subs(assessmentSubj, studentSubjs){
            let getSubject;
            studentSubjs.forEach(subject => {
                if(subject === assessmentSubj){
                    getSubject = subject;
                }
            })
            return getSubject
        }

        return studentAssessments;
    }

    // Set countdown clock
    const timer = (assIdentifier, priviIdentifier, assDuration) => {
        if(!assessmentTimer.status){

            // Prevent student from taking the assessment multiple times
            stopPrivileges(student.student_id, priviIdentifier)

            let numSeconds = 59;
            let numMinutes = assDuration - 1;
            let newTimer = setInterval(() => {
                if(numSeconds !== 0){
                    numSeconds--;
                }else if(numMinutes !== 0){
                    numMinutes--;
                    numSeconds = 59;    
                }else{
                    clearInterval(newTimer)
                }
                
                setAssessmentTimer({
                    ...assessmentTimer,
                    assSeconds: numSeconds,
                    assMinutes: numMinutes,
                    assNumber: assIdentifier,
                    timerVariable: newTimer,
                    status: numSeconds == 0 && numMinutes == 0 ? false : true
                })
            }, 1000);
        }

    }

    // Handle user inout
    const inputHandler = (choosenAns, e) => {
        setAnswerInput({
            ...answerInput,
            [choosenAns] : e.target.value
        })
    }

    // Handle submit state
    const submitHandler = () => {
        setAnswerInput({
            ...answerInput,
            myAnswers: [answerInput.answer_1, answerInput.answer_2, answerInput.answer_3, answerInput.answer_4,]
        })
        
        // Clear timer
        clearInterval(assessmentTimer.timerVariable);
        setTimeout(() => {
            history.push('/student_dashboard');
            setAssessmentTimer({
                assSeconds: null,
                assMinutes: null,
                assNumber: null,
                timerVariable: null,
                status: false
            })
        
            setAnswerInput({
                answer_1: '',
                answer_2: '',
                answer_3: '',
                answer_4: '',
                myAnswers: []
            })
        }, 8000);
    }

    // Submit answers when the condition is met
    useEffect(() => {
        if(answerInput.myAnswers.length > 0){
            sendMarks({
                id: assessmentTimer.assNumber,
                myAnswers: answerInput.myAnswers
            })

            setTimeout(() => {
                searchAssessments()
            }, 5000)
        }
    }, [answerInput])

    // Submit answers if the time is up
    useEffect(() => {
        if(assessmentTimer.assMinutes == 0 && assessmentTimer.assSeconds == 0){
            submitHandler();
        }
    }, [assessmentTimer]);

    // Add marks to into database
    useEffect(() => {
      if(assessment_marks.marked){
          console.log('Sending Marks')
          addMarks({
            type: 'Online',
            score: assessment_marks.student_score,
            subject: 'Online Assessment',
            student_id: student.student_id
          })

          // Set [assessment_marks] to default settings
          resetMarksStatus();
      }
    }, [assessment_marks]);

    console.log(assessment_marks.marked)

    

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
        cursor: "pointer"
    }

    console.log(assTest)

    return (
        <AssessmentStyles>
            <StudentSideNavs/>
            <div className="assessment_container">
                <p className="p-header">Home - <span>Assessment</span></p> 
                {filterAss(student, assTest).length > 0 ?
                    <>
                        {filterAss(student, assTest).map((assessment) => {
                            return  !assessment.assessment_status ? <>
                            <div className = "header">
                                <p>Online assessment ( {assessment.subject} )</p>
                                <HiOutlineRefresh style={style}/>
                            </div>
                            <div className="instructions">
                                <h4>Insturctions</h4>
                                <p><span>i.</span>Please ensure you answer every question on this assessment, it is part of your year mark</p>
                                <p><span>ii.</span>Once you start the session, do not close the browser/window. You only have one chance to complete the assessment</p>
                                <div className="start">
                                    <div className="start_btn" onClick = {() => timer(assessment.id, assessment.privilege_id, assessment.duration)}>Start Now</div>
                                    <p>Timer : <span>{assessmentTimer.assSeconds !== null && assessmentTimer.assMinutes !== null && assessment.id == assessmentTimer.assNumber? `${assessmentTimer.assMinutes} : ${assessmentTimer.assSeconds}` : `${assessment.duration} : 00`}</span></p>
                                </div>
                                {assessment.assessment.map((assessmentWork, indexA) => {
                                return <form style={assessment.id == assessmentTimer.assNumber?{display: "block"} : {display: "none"}}>
                                            <div className="question" key = {indexA}>
                                                <h5>Question {indexA + 1}</h5>
                                                <p>{assessmentWork.question}</p>
                                                {assessmentWork.finalAnswers.map((answer, index) => {
                                                    return <div key ={index}>
                                                                <input type="radio" name={`answer-${indexA}`} value={answer} onClick={(e) =>{inputHandler(`answer_${indexA + 1}`, e)}}/>
                                                                <label>{answer}</label>
                                                        </div>
                                                    })}
                                            </div>
                                        </form>
                                })}
                                <div className="submission" style={assessment.id == assessmentTimer.assNumber? {display: 'flex'} : {display: 'none'}}>
                                    <div className="submit" onClick={assessment.id == assessmentTimer.assNumber? () => submitHandler() : null}>Submit</div>
                                    <div className="reset">Reset</div>
                                </div>
                            </div>
                        </>: null
                        })}
                    </>:
                    <React.Fragment>
                        <div className='header assessment-header'>
                            <p>Teacher Profile</p>
                        </div>
                        <div className="assessment-notice">
                            <p>You don't have any assessment.</p>
                        </div>
                    </React.Fragment>
                }
            </div>
        </AssessmentStyles>
    )
}

const AssessmentStyles = styled(ContentStyles)`

    P{
        margin-bottom: 0rem;
    }

    .p-header{
        background: #F0F0F0 !important;
        padding-bottom: 2rem;
    }

    .header{
        background: #fff;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(220, 220, 220);
        color: black;
        
        p{
            font-size: 1rem;
            font-weight: 600;
            color: black !important;
        }
    }

    .assessment_container{
        margin-bottom: 2rem;
        font-family: Montserrat-Medium;


        .instructions{
            background: #fff;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            h4{
                margin: 0rem 1rem 2rem 1rem;
                padding-top: 2rem;
                text-transform: uppercase;
                color: grey;
            }
    
            p{
                margin: 0rem 2rem .5rem 2rem;
                span{
                    margin-right: 1rem;
                }
            }
        }

        .start{
            width: 18rem;
            margin: 2.5rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            p{
                margin: 0;
                font-weight: 600;
                font-size: .9rem;
                width: 8rem;
                display: inline-block;
                   
            }

            .start_btn{
                padding: .5rem 2rem;
                border-radius: 5px;
                font-size: .8rem;
                font-weight: 600;
                text-transform: uppercase;
                color: #fff;
                background-color: rgb(15, 228, 217);
                cursor: pointer;

                &:hover{
                    background-color: rgb(20, 109, 104);
                }
            }
        }

        form{
            padding-bottom: 2rem;
            
            .question{
                margin-bottom: 2rem;

                h5{
                    margin: 0rem 1rem 1rem 1rem;
                    text-transform: uppercase;
                    color: rgb(15, 228, 217);
                }

                p{
                    margin-left: 1rem;
                    margin-bottom: 1rem;
                    width: 80%;
                    line-height: 1.2rem;
                }

                div{
                    margin-left: 2rem;
                    
                    input[type="radio"]{
                        margin-right: .5rem;
                        margin-bottom: .5rem;
                        border: none;
                        outline: none;
                        background-color: red;
                    }

                    label{
                        font-size: .8rem;
                        color: grey;
                    }
                }
            }
        }

        .submission{
            width: 15rem;
            margin-left: 1rem;
            padding-bottom: 2rem;
            display: flex;
            justify-content: space-between;

            .submit,
            .reset{
                padding: .5rem 2rem;
                border-radius: 5px;
                font-size: .8rem;
                font-weight: 600;
                text-transform: uppercase;
                color: #fff;
                background-color: rgb(15, 228, 217);
                cursor: pointer;
            }

            .reset{
                background-color: rgb(192, 19, 19);

                &:hover{
                    background-color: red;
                }
            }

            .submit:hover{
                background-color: rgb(20, 109, 104);
            }
        }
    }

    .assessment-header{
        p{
            font-weight: 600;
            font-size: .8rem;
        }
    }

    .assessment-notice{
        height: 24rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fff;

        p{
            font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 500px){

        .header p {
            font-size: .8rem;
        }

        .assessment_container{
            margin-bottom: 2rem;
           
            .instructions{
              
                h4{
                    margin: 0rem 1rem 1rem 1rem;
                }
        
                p{
                    margin: 0rem 1.5rem .7rem 2rem;
                    font-size: .7rem;
                    line-height: 1.3rem;

                    span{
                        margin-right: .5rem;
                    }
                }
            }
    
            .start{
                width: 20rem;
    
                p{
                    font-weight: 550;
                    font-size: .75rem;
                }
    
                .start_btn{
                    font-size: .7rem;
                    font-weight: 550;
                }
            }
    
            form{
                padding-bottom: 0rem;
                
                .question{
    
                    p{
                        font-size: .7rem;
                    }
    
                    div{
                        label{
                            font-size: .7rem;
                        }
                    }
                }
            }
    
            .submission{
                .submit,
                .reset{
                    font-size: .7rem;
                    font-weight: 550;
                }
    
                .reset{
                    background-color: rgb(192, 19, 19);
    
                    &:hover{
                        background-color: red;
                    }
                }
    
                .submit:hover{
                    background-color: rgb(20, 109, 104);
                }
            }
        }
    }

`

export default StudentAssessment
