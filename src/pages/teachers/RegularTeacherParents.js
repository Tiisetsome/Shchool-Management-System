import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import GroupAddSharp from '@material-ui/icons/GroupAddSharp';


import AdminContext from '../../context/admin/adminContext'
import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs'
import {ContentStyles} from '../../components/Styles/ContentStyles'
import {TopSummaryStyles} from '../../components/Styles/TopSummaryStyles'
import Table from '../../components/Table/Table'

const RegularTeacherParents = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teacher, parents, searchTeacher} = adminContext;

    useEffect(() => {

        // Get teacher data
        searchTeacher('30210124');

    }, [])

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "rgb(38, 218, 203)",
        marginBottom: '1rem'

    }

    // Count students per each grade
    const gradesCounter = (grade) => {
        let i = 0;
        parents.map(parent => {
            if(parent.classes == grade){
                i++;
            }
        })
        return i;
    }

    return (
        <ContentStyles>
            <TeacherSideNavs/>
            <div>
                <p className="p-header">Home - <span>Teachers</span></p>
                <TopSummaryStyles classes = {typeof teacher.classes !== "undefined"? teacher.classes.length : null}>
                {typeof teacher.classes !== "undefined"?
                    teacher.classes.map((grade, index) => {
                        return <div key={index} className="cartegory-wrapper">
                                    <div className="cartegory">
                                        <GroupAddSharp style={style}/>
                                        <p>{grade}</p>
                                    </div>
                                    <div className="line"></div>
                                    <p className="count">{gradesCounter(grade)}</p>
                                </div>
                    }): null
                }
                </TopSummaryStyles>
                <Table 
                    title="Parent Id"
                    heading="All parents"
                    linkTo = "teacher_dashboard/parents"
                    query = "parents"
                    persons = {parents}
                    role = "teacher" // The role needs to be dynamic

                />
            </div>
        </ContentStyles>
    )
}

export default withRouter(RegularTeacherParents);
