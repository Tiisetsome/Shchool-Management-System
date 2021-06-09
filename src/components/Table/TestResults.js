import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'
import {FaTrash} from 'react-icons/fa'
import AuthContext from '../../context/authentication/authContext'
import AdminContext from '../../context/admin/adminContext'
import {useHistory} from 'react-router-dom'

const TestResults = ({student_marks}) => {

    // Use admin and auth context
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    // Destructure items
    const {deleteMarks} = adminContext;
    const {role} = authContext;

    // Toggle class
    const [activeClass, setActiveClass] = useState(false);
    const [studentMarkDetails, setStudentMarkDetails] = useState({
        id: '',
        student_id: '',
    })
    
    const history = useHistory()

    const  studentMarkDeleteHandler = (id, student_id) => {
        deleteMarks(id);

        // Redirect to students page
        history.push('/teacher_dashboard/students');

        // Redirect to student profile after two seconds to get new data
        setTimeout(() => {
            history.push(`/teacher_dashboard/students/${student_id}`);
        }, 2000)
    }

    const activeHandler = (id, student_id) => {
        setStudentMarkDetails({
            id: id,
            student_id: student_id
        })

        setActiveClass(!activeClass)
    }
    return (
        <TestResultsStyles>
            {activeClass? <div className="backdrop"></div> : null}
            <table>
                <thead>
                    <tr>
                        <th>Test Type</th>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {student_marks.map(student_mark => {
                        return <tr key={student_mark.id}>
                            <td>{student_mark.type}</td>
                            <td>{student_mark.subject}</td>
                            <td>{student_mark.score}</td>
                            <td className="date-wrapper">
                                <span>{student_mark.created_at.split(" ")[0]}</span> 
                                {role == "teacher" || role == "class teacher"? 
                                    <React.Fragment>
                                        <Link to = {`/teacher_dashboard/forms/update_marks/${student_mark.id}`}>
                                            <span><FiEdit style={{color: "purple", cursor: "pointer", fontSize: ".8rem"}}/></span>
                                        </Link> 
                                        <span><FaTrash onClick={() => activeHandler(student_mark.id, student_mark.student_id)} style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".8rem"}}/></span>
                                    </React.Fragment>
                                    
                                    : null
                                }
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            {activeClass? <div className="confirm">
                <p>This operation will permanently delete student mark form the database.</p>
                <p>Do you want to continue?</p>
                <div className="buttons">
                    <div onClick ={() => studentMarkDeleteHandler(studentMarkDetails.id, studentMarkDetails.student_id)}>Yes</div>
                    <div onClick={() => setActiveClass(!activeClass)}>No</div>
                </div>
            </div>: null}
        </TestResultsStyles>
    )
}

const TestResultsStyles = styled.div`

    background: #fff;
    position: relative;

    table{
        border-collapse: collapse;
        font-size: .7rem;
        width: 100%;
        height: 100%;
        font-family: Montserrat-Regular;
        margin-bottom: 0rem;
        
        thead tr{
            text-align: left;
            border-bottom: 1px solid rgb(220, 220, 220);
            
            th{
                padding: 1rem 1rem;
                font-weight: 600;
                margin-right: 2rem;
            }
        }

        tbody tr{


            td{
                padding: 1rem 1rem;
                margin-right: 2rem;
            }

            td:last-child{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 9.5rem;
            }

        }

        tbody tr:nth-child(odd){
            background-color:  rgb(238, 201, 120);
        }
        tbody tr:nth-child(even){
            background-color: rgb(99, 243, 207);
        }
    }

    .confirm{
        width: 50%;
        padding: 2rem 0rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 200;
    
        p{
            margin-bottom: .5rem;
            text-align: center;
        }
    
        .buttons{
            display: flex;
            gap: .5rem;
    
            div{
                padding: .4rem;
                margin-top: .5rem;
                border-radius: 5px;
                font-size: .7rem;
                font-weight: 600;
                color: #fff;
                background-color: rgb(177, 2, 2);
                cursor: pointer;
            }
    
            div:hover{
                background-color: rgb(220, 2, 2);
            }
    
            div:first-child{
                background-color: rgb(9, 95, 95);
            }
    
            div:first-child:hover{
                background-color: rgb(38, 218, 203);
            }
        }
    }

    .backdrop{
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: black;
        opacity: 0.8;
        position: absolute;
        z-index: 100;
    }

    @media screen and (max-width: 500px){

        table {
            thead tr{
                text-align: left;
                border-bottom: 1px solid rgb(220, 220, 220);
                
                th{
                    padding: 1rem 1rem;
                    font-weight: 600;
                    margin-right: 2rem;
                }

                th:last-child{
                    display: none;
                }
            }

            tbody tr{
                td:last-child{
                    display: none;
                }
            }
        }
    }

    @media screen and (max-width: 500px){
        table{
            border-radius: 0px 0px 10px 10px;
        }
    }
`

export default TestResults
