import React, {useContext} from 'react'
import {ContentStyles} from '../../components/Styles/ContentStyles'
import StudentSideNavs from '../../components/SideNavigations/StudentSideNavs'
import StudentContext from '../../context/students/studentContext'
import {HiOutlineRefresh} from 'react-icons/hi'
import styled from 'styled-components'

const SchoolEvents = () => {

    // Use student context
    const studentContext = useContext(StudentContext);

    // Destructure items
    const {notices} = studentContext;

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

    return (
        <EventsStyles>
           <StudentSideNavs/>
           <div className="notices"> 
                <p className="p-header">Home - <span>Events</span></p> 
                <div className='header'>
                    <p>Notice Board</p>
                    <HiOutlineRefresh style={style}/>
                </div> 
                <div className="notices-wrapper">
                    {notices.map(notice => {
                        return <div className="notice" key={notice.id}>
                            <p>{formatDate(notice.created_at)}</p>
                            <p>{notice.p_fname} {notice.p_lname}</p>
                            <p>{notice.message}</p>
                        </div>
                    })}
                </div>  
            </div>
        </EventsStyles>
    )
}

const EventsStyles = styled(ContentStyles)`
    P{
        margin-bottom: 0rem;
    }

    .p-header{
        background: #F0F0F0 !important;
        padding-bottom: 2rem;
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
        margin-bottom: 2rem;
        height: 40rem;
        background-color: #fff;
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

                p:last-child{
                    width: 70%;
                }
            }
        }
    }
`

export default SchoolEvents;
