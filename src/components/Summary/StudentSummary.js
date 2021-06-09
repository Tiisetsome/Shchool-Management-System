import React, {useContext} from 'react'
import {IoDocumentTextSharp} from 'react-icons/io5'
import {GoLaw} from 'react-icons/go'
import {MdEventAvailable} from 'react-icons/md'
import {AiFillNotification} from 'react-icons/ai'
import styled from 'styled-components'
import StudentContext from '../../context/students/studentContext'
import AdminContext from '../../context/admin/adminContext'

import {TopSummaryStyles} from '../Styles/TopSummaryStyles';

const StudentSummary = () => {

    // Use student and auth context
    const studentContext =  useContext(StudentContext);
    const adminContext =  useContext(AdminContext);

    // Destructure items
    const {test_notices, student, notices} = studentContext;
    const {events} = adminContext;

    const countTestNotices = (currentStudent, upcomingTests) => {
        const studentTestNotices = upcomingTests.filter(testNotice => testNotice.grade === currentStudent.grade && testNotice.subject === getSub(testNotice.subject, currentStudent.subjects))

        function getSub(noticeSubject, currentStudentSubjects){
            for(let i = 0; i < currentStudentSubjects.length; i++){
                if(noticeSubject === currentStudentSubjects[i]){
                    return noticeSubject;
                }
            }
        }

        return studentTestNotices.length;
    }

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "#fff",
        marginBottom: '.5rem'
    }

    console.log(notices)

    // Inline styles
    const tests = {backgroundImage:"linear-gradient(rgb(13, 233, 148), rgb(0, 129, 80))", color: "#fff !important"}
    const students = {backgroundImage:"linear-gradient(rgb(245, 71, 115), rgb(153, 8, 44))", color: "#fff !important"}
    const messages = {backgroundImage:"linear-gradient(rgb(231, 175, 55), rgb(141, 99, 7))", color: "#fff !important"}
    const cases = {backgroundImage:"linear-gradient(rgb(45, 60, 88), rgb(15, 26, 46))", color: "#fff !important"}
    console.log(test_notices)
    return (
        <TeacherStyles>
            <div style={tests} className="cartegory-wrapper">
                <div className="cartegory">
                    <IoDocumentTextSharp style={style}/>
                    <p>Upcoming Tests</p>
                </div>
                <div className="line"></div>
                <p className="count">{test_notices.length > 0 ? countTestNotices(student, test_notices) : 0}</p>
            </div>
            <div style={students} className="cartegory-wrapper">
                <div className="cartegory">
                    <AiFillNotification style={style}/>
                    <p>Notices</p>
                </div>
                <div className="line"></div>
                <p className="count">{notices.length}</p>
            </div>
            <div style={messages} className="cartegory-wrapper">
                <div className="cartegory">
                    <MdEventAvailable style={style}/>
                    <p>Events</p>
                </div>
                <div className="line"></div>
                <p className="count">{events.length}</p>
            </div>
            <div style={cases} className="cartegory-wrapper">
                <div className="cartegory">
                    <GoLaw style={{...style, fontSize: '2rem', marginBottom: '.5rem'}}/>
                    <p>Cases</p>
                </div>
                <div className="line"></div>
                <p className="count">0</p>
            </div>
        </TeacherStyles>
    )
}

const TeacherStyles = styled(TopSummaryStyles)`
    .cartegory-wrapper{
        p{
            color: #fff;
        }
    }
`;

export default StudentSummary
