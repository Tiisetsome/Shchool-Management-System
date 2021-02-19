import React, {useContext, Fragment} from 'react'
import {Switch, Route} from 'react-router-dom';
import styled from 'styled-components'
import AdminContext from './context/admin/adminContext'

import './App.css';
//import Content from './components/Content';
import Navigation from './components/Navigation';
import Protected from './components/Protected/Protected';
import SideNavigation from './components/SideNavigation'
import Main from './components/Main';

import TopSummary from './components/TopSummary'
import HomeContent from './components/HomeContent'
import Teachers from './components/Teachers/Teachers';
import Students from './components/Students/Students';
import Parents from './components/Parents/Parents';
import SingleTeacher from './components/SinglePerson/SingleTeacher'
import TeacherSummary from './components/SinglePerson/TeacherSummary'
import TopBar from './components/TopBar/TopBar'
import SingleStudent from './components/SinglePerson/SingleStudent';
import SingleParent from './components/SinglePerson/SingleParent';
//import AdminContext from '../context/admin/adminContext'
import StudentForm from './components/Forms/StudentForm';
import TeacherForm from './components/Forms/TeacherForm';
import ParentForm from './components/Forms/ParentForm';
//import Protected from './components/Protected/Protected'

const App = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teachers, students, parents} = adminContext;

    // Store all grades
    const teacherGrades = [];
    const studentGrades = [];
    const parentGrades = [];

    if(teachers.length > 0  || students.length > 0 || parents.length > 0){
        teachers.forEach(teacher => teacher.classes.forEach(grade => teacherGrades.push(grade)));
        parents.forEach(parent => parent.classes.forEach(grade => parentGrades.push(grade)));
        students.forEach(student => studentGrades.push(student.grade));
    }

  return (
      <>
         <Navigation/>
         <ContentStyles>
            <SideNavigation/>
            <Switch>
                  <Route exact path="/">
                    <div>
                        <p className="p-header">Home - <span>Admin</span></p>
                        <TopSummary/>
                        <HomeContent/>
                    </div>
                  </Route>
                  <Route exact path="/teachers">
                      <div>
                        <p className="p-header">Home - <span>Teachers</span></p>
                        <TopBar icons="teacher" grades= {teacherGrades} />
                        <Teachers/>
                      </div>

                  </Route>
                  <Route path="/teachers/:id">
                    <div>
                        <p className="p-header">Home - <span>Teachers</span></p>
                        <TeacherSummary/>
                        <SingleTeacher to="hello"/>
                    </div>
                  </Route>
                  <Route exact path="/students">
                      <div>
                        <p className="p-header">Home - <span>Students</span></p>
                        <TopBar icons="student" grades= {studentGrades}/>
                        <Students/>
                      </div>
                  </Route>
                  <Route path="/students/:id">
                      <div>
                        <p className="p-header">Home - <span>Students</span></p>
                        <TeacherSummary icons="student"/>
                        <SingleStudent />
                      </div>
                  </Route>
                  <Route exact path="/parents">
                      <div>
                        <p className="p-header">Home - <span>Parents</span></p>
                        <TopBar icons="parents" grades= {parentGrades}/>
                        <Parents/>
                      </div>
                  </Route>
                  <Route path="/parents/:id">
                      <div>
                        <p className="p-header">Home - <span>Parent</span></p>
                        <SingleParent/>
                      </div>
                  </Route>
                  <Route path="/form/student" component={StudentForm}/>
                  <Route path="/form/teacher" component={TeacherForm}/>
                  <Route path="/form/parent" component={ParentForm}/>
            </Switch>
        </ContentStyles>
      </>
  );
}

const ContentStyles = styled.main`
    width: 100%;
    display: grid;
    grid-template-columns: 20% 1fr;
    grid-gap: 2rem; 
    margin-right: 2rem;

    p{
      color: grey;
      font-size: .8rem;

      span{
          color: rgb(233, 140, 0);
      }
    }

    .p-header {
      padding-top: 3.5rem;
    }
`;

export default App;
