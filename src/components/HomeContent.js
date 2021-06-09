import React, {useContext} from 'react'
import styled from 'styled-components'
import {HiOutlineRefresh} from 'react-icons/hi'
import {FaTrash} from 'react-icons/fa'
import AdminContext from '../context/admin/adminContext'
import AuthContext from '../context/authentication/authContext'

import EventCalender from './EventCalender'

const HomeContent = () => {

    // Use admin and auth context
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    // Destructure items
    const {notices, searchNotices, deleteGeneralNotice} = adminContext;
    const {role} = authContext;

    // Refresh notices
    const refreshNoticesHandler = () => {
         // Get notices
         searchNotices();
    }

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
        cursor: "pointer"
    }

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

    console.log('Notices rendered')

    return (
        <HomeContentStyles>
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
                        <HiOutlineRefresh style={style} onClick={()=> refreshNoticesHandler()} />
                    </div>
                    <div className="notices-wrapper">
                        {notices.length > 0 ?
                            notices.map(notice => {
                                return <div className="notice" key={notice.id}>
                                    <div>
                                        <p>{formatDate(notice.created_at)}</p>
                                        {role === "admin" ? <FaTrash style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".7rem"}} onClick = {() => deleteGeneralNotice(notice.id)}/> : null}
                                    </div>
                                    <p>{notice.p_fname} {notice.p_lname}</p>
                                    <p>{notice.message}</p>
                                </div>
                            }) : null
                        }
                    </div>
                </div>
        </HomeContentStyles>
    )
}

const HomeContentStyles = styled.section`
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 1rem;
    margin-bottom: 3rem;
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

                div:first-child{
                    display: flex;
                    justify-content: space-between;
                }

                p:first-child{
                    margin-bottom: .5rem;
                }

                p:nth-child(even){
                    color: rgb(231, 175, 55);
                    font-weight: 550;
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
        width: 100%;
        margin: auto;

        .notices {
            margin-bottom: 2rem;
        }
    }
`;

export default HomeContent
