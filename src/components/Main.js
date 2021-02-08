import React from 'react'
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

const Main = () => {
    return (
        <MainStyles>
            <p>Home - <span>Admin</span></p>
            <Switch>
                <Route exact path="/">
                    <TopSummary/>
                    <HomeContent/>
                </Route>
                <Route exact path="/teachers">
                    <TopBar icons="teacher" />
                    <Teachers/>
                </Route>
                <Route path="/teachers/:id">
                    <TeacherSummary/>
                    <SingleTeacher/>
                </Route>
                <Route exact path="/students">
                    <TopBar icons="student"/>
                    <Students/>
                </Route>
                <Route path="/students/:id">
                    <TeacherSummary icons="student"/>
                    <SingleStudent/>
                </Route>
                <Route path="/parents">
                    <TopBar icons="parents"/>
                    <Parents/>
                </Route>
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
