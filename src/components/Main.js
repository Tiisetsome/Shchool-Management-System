import React, {useContext} from 'react'
import styled from 'styled-components'
import {Switch, Route} from 'react-router-dom';

import TopSummary from './TopSummary'
import HomeContent from './HomeContent'
import Teachers from './Teachers/Teachers';
import Students from './Students/Students';
import Parents from './Parents/Parents';
import SingleTeacher from './SinglePerson/SingleTeacher'
import TeacherSummary from './SinglePerson/TeacherSummary'
import TopBar from './TopBar/TopBar'
import SingleStudent from './SinglePerson/SingleStudent';
import SingleParent from './SinglePerson/SingleParent';
import AdminContext from '../context/admin/adminContext'
import StudentForm from './Forms/StudentForm';
import TeacherForm from './Forms/TeacherForm';
import ParentForm from './Forms/ParentForm';

const Main = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teachers, students, parents} = adminContext;

    // Store all grades
    const teacherGrades = [];
    const studentGrades = [];
    const parentGrades = [];

    if(teachers.length > 0  && students.length > 0 && teachers.length > 0){
        teachers.forEach(teacher => teacher.classes.forEach(grade => teacherGrades.push(grade)));
        parents.forEach(parent => parent.classes.forEach(grade => parentGrades.push(grade)));
        students.forEach(student => studentGrades.push(student.grade));
    }

    console.log('Main rendered')

    return (
        <MainStyles>
            <p>Home - <span>Admin</span></p>
            <Switch>
                <Route exact path="/">
                    <TopSummary/>
                    <HomeContent/>
                </Route>
                <Route exact path="/teachers">
                    <TopBar icons="teacher" grades= {teacherGrades} />
                    <Teachers/>
                </Route>
                <Route path="/teachers/:id">
                    <TeacherSummary/>
                    <SingleTeacher to="hello"/>
                </Route>
                <Route exact path="/students">
                    <TopBar icons="student" grades= {studentGrades}/>
                    <Students/>
                </Route>
                <Route path="/students/:id">
                    <TeacherSummary icons="student"/>
                    <SingleStudent />
                </Route>
                <Route exact path="/parents">
                    <TopBar icons="parents" grades= {parentGrades}/>
                    <Parents/>
                </Route>
                <Route path="/parents/:id">
                    <SingleParent/>
                </Route>
                <Route path="/form/student" component={StudentForm}/>
                <Route path="/form/teacher" component={TeacherForm}/>
                <Route path="/form/parent" component={ParentForm}/>
            </Switch>
        </MainStyles>
    )
}

const MainStyles = styled.section`
    width: 100%;
    padding-top: 3.5rem;

    p{
        color: grey;
        font-size: .8rem;

        span{
            color: rgb(233, 140, 0);
        }
    }
`;

export default Main
