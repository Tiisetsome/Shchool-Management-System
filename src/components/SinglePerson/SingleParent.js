import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import AdminContext from '../../context/admin/adminContext'
import {useParams} from 'react-router-dom'

const SingleParent = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {parent, searchParent} = adminContext;

    // Get id from the url
    const {id} = useParams();

    useEffect(() => {

        // Search Paren
        searchParent(id);
    }, [])

    return (
        <ParentStyles>
            <div className="parent-profile">
                    <div className='header'>
                        <p>Parent Profile</p>
                    </div>
                    <div className='student-details'>
                        <div className="img-icon"></div>
                        <div className="details">
                            <p><span>Full Name</span> : {parent.fname} {parent.lname}</p>
                            <p><span>Gender</span> : Female</p>
                            <p><span>Date Of Birth</span> : 28/15/2002</p>
                            <p><span>Phone Number</span> : 067 853 9874</p>
                            <p><span>E-mail Address</span> : {parent.email}</p>
                            <p><span>Admission Date</span> : {parent.created_at}</p>
                            <p><span>Address</span> : {parent.address}</p>
                            <p><span>Classes</span> : {typeof parent.classes !== 'undefined' ? parent.classes.join(', ') : null}</p>
                            <p><span>Section</span> : A</p>
                            <p><span>Student ID</span> : 302101</p>
                        </div>
                    </div>
                </div>
        </ParentStyles>
    )
}

const ParentStyles = styled.section`
    .parent-profile{
        grid-area: profile;
        background: #fff;

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
                margin-bottom: 0rem;
            }
        }

        .student-details{
            margin: 2rem 1rem 1rem 1rem;
            display: grid;
            grid-template-columns: 6rem 1fr;
            gap: 3rem;

            .img-icon{
                width: 100%;
                height: 6rem;
                background: grey;
            }

            div:nth-child(2){
                
                p{
                    margin-bottom: 2rem;
                    color: black;
                    font-size: .7rem;
                    font-family: Montserrat-Regular;

                    span{
                        width: 8rem;
                        display: inline-block;
                        color: grey;
                    }
                }
            }
        }

    }
`;

export default SingleParent
