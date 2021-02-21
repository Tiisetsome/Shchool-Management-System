import React from 'react'
import styled from 'styled-components'
import DataChart from '../Charts/DataChart'

const StudentAttandace = () => {
    return (
        <AttandaceStyles>
            <div>
                <p>Class Attandance Record</p>
                <p>Year 2020</p>
            </div>
            <div className="chart">
                <DataChart
                    margin="0rem"
                    labels={['Present', 'Absent']}
                    data = {[30, 2, 0]}
                />
            </div>
        </AttandaceStyles>
    )
}

const AttandaceStyles = styled.div`
    margin: 1rem 0rem;
    padding: 4rem 0rem;
    background-image: linear-gradient(rgb(245, 71, 115), rgb(153, 8, 44));
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    div:first-child{
        p{
            padding-left: 1rem;
            font-weight: 500;
            font-family: Montserrat-Medium;
            color: #fff;
        }

        p:first-child{
            font-size: 1.3rem;
            margin-bottom: 1rem;
        }

        p:last-child{
            font-size: 3rem;
            font-weight: 600;
            margin-bottom: 0rem;
            letter-spacing: .5rem;
        }
    }
`;

export default StudentAttandace
