import React from 'react'
import styled from 'styled-components'
import {HiOutlineRefresh} from 'react-icons/hi'
import DataChart from '../Charts/DataChart'

const SingleTeacher = () => {

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
    }

    return (
        <SingleStyles>
            <div className='teacher-profile'>
                <div className='header'>
                    <p>Teacher Profile</p>
                </div>
                <div className='teacher-details'>
                    <div className="img-icon"></div>
                    <div className="details">
                        <p><span>Full Name</span> :  Magret Nkuna</p>
                        <p><span>Gender</span> : Female</p>
                        <p><span>Date Of Birth</span> : 05/04/1989</p>
                        <p><span>Phone Number</span> : 067 853 9874</p>
                        <p><span>Employed Since</span> : 04/05/2005</p>
                        <p><span>Address</span> : Makotse, 56</p>
                        <p><span>Classes</span> : Grade8, Grade10</p>
                        <p><span>Teacher ID</span> : 302101</p>
                        <p><span>Role</span> : Class Teacher</p>
                    </div>
                </div>
            </div>
            <div className='student-overview'>
                <div className='calender'>
                    <div className='header'>
                        <p>Student Overview</p>
                    </div>
                    <DataChart 
                        margin="2rem 0rem"
                        labels={['Male', 'Female']}
                        data = {[30, 25, 0]}
                    />
                </div>
            </div>
            <div className='test-notices'>
                <div className='calender'>
                    <div className='header'>
                        <p>Upcoming Tests</p>
                        <HiOutlineRefresh style={style} />
                    </div>
                </div>
                <div className="notices">
                    <div>
                        <p>25 February 2021</p>
                        <p>Mathematics P2 Class Test 2</p>
                        <p>Grade 11</p>
                    </div>
                    <div>
                        <p>27 February 2021</p>
                        <p>Physics P1</p>
                        <p>Grade 10</p>
                    </div>
                    <div>
                        <p>05 March 2021</p>
                        <p>Mathematics </p>
                        <p>Grade 8</p>
                    </div>
                </div>
            </div>
        </SingleStyles>
    )
}

const SingleStyles = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        "profile data"
        "profile notice";
    gap: 1rem;

    p{
        margin-bottom: 0rem;
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

    .teacher-profile{
        grid-area: profile;
        background: #fff;

        .teacher-details{
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

    .student-overview{
        grid-area: data;
        background: #fff;
    }

    .test-notices{
        grid-area: notice;
        background: #fff;

        .notices{

            div{
                padding: 1rem 0rem;

                p{
                    margin: 0rem .5rem .7rem 1rem;;
                }

                p:first-child{
                    color: rgb(182, 0, 0);
                    font-weight: 500;
                }

                p:nth-child(2){
                    color: rgb(38, 218, 203);
                    font-weight: 500;
                }
            }

            div:nth-child(odd){
                background-color: rgb(245, 192, 201);
            }

            div:nth-child(even){
                background-color: rgb(248, 248, 171);
            }
        }
    }
`;

export default SingleTeacher
