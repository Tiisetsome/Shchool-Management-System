import React, {Fragment, useContext} from 'react'
import styled from 'styled-components'
import {HiOutlineRefresh} from 'react-icons/hi'
import StudentContext from '../../../context/students/studentContext'

import Spinner from '../../Spinner/Spinner'
import EventCalender from '../../EventCalender'

const MainContent = () => {

    // Use student context
    const studentContext = useContext(StudentContext);

    // Destructure items
    const {notices, loading} = studentContext;
    
    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
        cursor: "pointer"
    }

    console.log(loading)

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
            <HomeContentStyles>
                {loading? <Spinner/> :
                    <Fragment>
                        <div className='calender'>
                            <div className='header'>
                                <p>Event Calender</p>
                                <HiOutlineRefresh style={style} />
                            </div>
                            <EventCalender/>
                        </div>
                        <div className = 'notices'>
                            <div className='header'>
                                <p>Notice Board</p>
                                <HiOutlineRefresh style={style}/>
                            </div>
                            <div className="notices-wrapper">
                                {notices.length > 0 ?
                                    notices.map(notice => {
                                        return <div className="notice" key={notice.id}>
                                            <p>{formatDate(notice.created_at)}</p>
                                            <p>{notice.p_fname} {notice.p_lname}</p>
                                            <p>{notice.message}</p>
                                        </div>
                                    }) : null
                                }
                            </div>
                        </div>
                    </Fragment>
                }
            </HomeContentStyles>
    )
}

const HomeContentStyles = styled.section`
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 1rem;
    margin-bottom: 0rem;
    position: relative;

    p{
        margin-bottom: 0rem;
    }

    .calender{
        height: 30rem;
        background-color: #fff;
    }

    .header{
        padding: 1rem;
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

    .notices {
        background-color: #fff;
        height: 30rem;
        overflow-y: scroll;

        .notices-wrapper{
            padding: 1rem;

            .notice{
                margin-bottom: 1rem;

                p:first-child{
                    margin-bottom: .5rem;
                }

                p:nth-child(even){
                    color: rgb(241, 55, 157);
                    font-weight: 600;
                    margin-bottom: .5rem;

                    span{
                        margin-left: .5rem;
                        font-weight: 400 !important;
                        font-size: .7rem !important;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 500px){
        grid-template-columns: 1fr;
    }

`;

export default MainContent
