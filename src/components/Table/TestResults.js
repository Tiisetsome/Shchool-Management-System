import React from 'react'
import styled from 'styled-components'

const TestResults = ({student_marks}) => {
    return (
        <TestResultsStyles>
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
                        <td>June Exam</td>
                        <td>{student_mark.subject}</td>
                        <td>{student_mark.score}</td>
                        <td>06/03/2021</td>
                    </tr>
                })}
            </tbody>
        </TestResultsStyles>
    )
}

const TestResultsStyles = styled.table`
    border-collapse: collapse;
    font-size: .7rem;
    width: 100%;
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

            div{
                width: 2rem;
                height: 2rem;
                background: pink;
                border-radius: 100%;
            }

        }

        td:last-child{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 6rem;
        }
    }

    tbody tr:nth-child(odd){
        background-color:  rgb(238, 201, 120);
    }
    tbody tr:nth-child(even){
        background-color: rgb(99, 243, 207);
    }
`

export default TestResults
