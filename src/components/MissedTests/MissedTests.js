import React from 'react'
import styled from 'styled-components'

const MissedTests = ({missedTests}) => {

    // Date format
    const formatDate = (noticeDate) => {

        // Get time
        const time = noticeDate.split(" ").splice(1, 2)[0];
        
        // Create months array
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        // Create new date and format it
        let fullDate = new Date(noticeDate);
            fullDate = `${fullDate.getDate()} ${months[fullDate.getMonth()]} ${fullDate.getFullYear()} ${time}`;
        
        return fullDate;
    }

    return (
        <MissedTestsStyles>
            <div className='header'>
                <p>Missed Tests</p>
            </div>
            <div className="tests">
                {missedTests.map(missedTest => {
                    return <div key={missedTest.id}>
                                <p>{formatDate(missedTest.created_at)}</p>
                                <p>{missedTest.subject}</p>
                                <p>{missedTest.reason}</p>
                                <p>reason</p>
                           </div>
                })}
            </div>
        </MissedTestsStyles>
    )
}

const MissedTestsStyles = styled.div`
    grid-area: missed-test;
    background: #fff;

    .tests{
        div{
            margin: 2rem 1rem 1rem 1rem;

            p{
                margin-bottom: .8rem;
            }

            p:first-child{
                color: rgb(182, 0, 0);
                font-weight: 600;
            }

            p:nth-child(2){
                font-weight: 600;
                color: rgb(38, 218, 203);
            }

            p:last-child{
                color: rgb(214, 214, 214);;
            }
        }
    }

    @media screen and (max-width: 500px){
        .tests{
            div{
                p:first-child,
                p:nth-child(2){
                    font-weight: 500;
                }
            }
        }
    }
`

export default MissedTests
