import React from 'react'
import styled from 'styled-components'

const SingleParent = () => {
    return (
        <ParentStyles>
            <div className="parent-profile">
                    <div className='header'>
                        <p>Student Profile</p>
                    </div>
                    <div className='student-details'>
                        <div className="img-icon"></div>
                        <div className="details">
                            <p><span>Full Name</span> : Karabo Mojapelo</p>
                            <p><span>Parent Name</span> : Magret Mojapelo</p>
                            <p><span>Gender</span> : Female</p>
                            <p><span>Date Of Birth</span> : 28/15/2002</p>
                            <p><span>Phone Number</span> : 067 853 9874</p>
                            <p><span>E-mail Address</span> : karabo@gmail.com</p>
                            <p><span>Admission Date</span> : 07/01/2010</p>
                            <p><span>Address</span> : Makotse, 56</p>
                            <p><span>Classes</span> : Grade 8</p>
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
