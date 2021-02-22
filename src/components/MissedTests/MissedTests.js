import React from 'react'
import styled from 'styled-components'

const MissedTests = () => {
    return (
        <MissedTestsStyles>
            <div className='header'>
                <p>Missed Tests</p>
            </div>
            <div className="tests">
                <div>
                    <p>12 March 2021</p>
                    <p>Life Orientation</p>
                    <p>The student was sick and notified the teacher before hand</p>
                    <p>Reason</p>
                </div>
                <div>
                    <p>25 June 2021</p>
                    <p>Mathematics</p>
                    <p>No valid reason</p>
                    <p>Reason</p>
                </div>
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
`

export default MissedTests
