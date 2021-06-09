import React, {useState, useEffect, useContext, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {BiMenuAltRight} from 'react-icons/bi'
import {IoMdClose} from 'react-icons/io'
import AdminContext from '../context/admin/adminContext'

import Spinner from '../components/Spinner/Spinner'
import TopSummary from '../components/TopSummary'
import HomeContent from '../components/HomeContent'
import { ContentStyles } from '../components/Styles/ContentStyles'
import SideNavigation from '../components/SideNavigation'

const Home = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {loading, searchStudentMarks, searchTeachers, searchParents, searchStudents, searchNotices, searchCases, searchTestsNotices, searchEvents, stopSpinner} = adminContext;

    // Toggle state
    const [menuToggle, setMenuToggle] = useState(false);

    const toggleHandler = () => {
        setMenuToggle(!menuToggle)
    }

    
    const menuStyle = {
        fontSize: '1.3rem',
        color: "rgb(233, 140, 0)",
    }

    console.log('yey')

    useEffect(() => {
        
        // Get teachers
        searchTeachers('teachers');
        searchParents('parents');
        searchNotices();
        searchCases();
        searchStudents('student');
        searchTestsNotices();
        searchEvents();
        searchStudentMarks();
        stopSpinner()
    }, [])

    return (
      <ContentStyles>
            {
                loading ? <Spinner person = {'admin'}/>:
                <Fragment>
                    <SideNavigation menuShow = {menuToggle}/>
                    <div className = "menu" onClick = {() => toggleHandler()}>
                        {menuToggle ?<IoMdClose style={menuStyle}/> : <BiMenuAltRight style={menuStyle}/>}
                    </div>
                    <div>
                        <p className="p-header">Home - <span>Admin</span></p>
                        <TopSummary/>
                        <HomeContent/>
                    </div>
                </Fragment> 
            }
    </ContentStyles>
    )
}

export default withRouter(Home);
