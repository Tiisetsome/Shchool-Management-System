import React from 'react'
import styled from 'styled-components'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import GroupAddSharpIcon from '@material-ui/icons/GroupAddSharp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import {GiTeacher} from 'react-icons/gi'

const TopSummary = () => {

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "rgb(38, 218, 203)",
        marginBottom: '.5rem'

    }

    return (
        <TopSummaryStyles>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {/* <img src="/imgs/students.svg" alt=""/> */}
                    <PeopleSharpIcon style={style}/>
                    <p>Students</p>
                </div>
                <div className="line"></div>
                <p className="count">520</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {/* <img src="/imgs/parents.svg" alt=""/> */}
                    <GroupAddSharpIcon style={{...style,  color: "rgb(233, 140, 0)"}}/>
                    <p>Parents</p>
                </div>
                <div className="line"></div>
                <p className="count">420</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {/* <img src="/imgs/teacher.svg" alt=""/> */}
                    <GiTeacher style={{...style, fontSize: '1.5rem'}}/>
                    <p>Teachers</p>
                </div>
                <div className="line"></div>
                <p className="count">18</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {/* <img src="/imgs/event.svg" alt=""/> */}
                    <EventAvailableIcon style={{fontSize: '1.5rem', marginBottom: '.5rem', color: "rgb(241, 55, 157)"}}/>
                    <p>Events</p>
                </div>
                <div className="line"></div>
                <p className="count">5</p>
            </div>
        </TopSummaryStyles>
    )
}

const TopSummaryStyles = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin-bottom: 1rem;

    .cartegory-wrapper{
        height: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        background-color: #fff;

        p{
            margin-bottom: 0rem;
            font-size: 1.1rem;
            font-weight: 600;
            font-family: Montserrat-Medium;
            color: black;
        }

        .line{
            width: 1px;
            height: 2rem;
            background-color: grey;
        }

        .cartegory{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p{
                font-size: .8rem;
                font-weight: 500;
            }

            img{
                margin-bottom: .6rem;
                max-width: 1.5rem;
            }
        }
    }
`;

export default TopSummary
