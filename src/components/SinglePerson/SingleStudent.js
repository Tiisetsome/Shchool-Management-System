import React from 'react'
import styled from 'styled-components'
import Search from '../Forms/Search'

const SingleStudent = () => {
    return (
        <StudentStyles>
            <div className="student-profile-summary">
                <div className="student-profile">
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
                <div className='missed-test-summary'>
                    <div className='header'>
                        <p>Missed Tests</p>
                    </div>
                    <div className="tests">
                        <div>
                            <p>12 March 2021</p>
                            <p>Life Orientation</p>
                            <p>The student was sick and notified the teacher before hand</p>
                            <p>Reason</p>
                        </div>
                        <div>
                            <p>25 June 2021</p>
                            <p>Mathematics</p>
                            <p>No valid reason</p>
                            <p>Reason</p>
                        </div>
                    </div>
                </div>
                <div className="results-summary">
                    <div className='header'>
                        <p>All Tests</p>
                        <Search 
                            width
                            text = "Enter type"
                        />
                    </div>
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Test Type</th>
                                <th>Subject</th>
                                <th>Marks</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Class Test</td>
                                <td>Sepedi</td>
                                <td>65.00</td>
                                <td>06/03/2021</td>
                            </tr>
                            <tr>
                                <td>June Exam</td>
                                <td>Mathematics</td>
                                <td>70.00</td>
                                <td>22/06/2021</td>
                            </tr>
                            <tr>
                                <td>Class Test</td>
                                <td>Life Orientaiton</td>
                                <td>95.00</td>
                                <td>09/08/2021</td>
                            </tr>
                            <tr>
                                <td>Trial Exam</td>
                                <td>English 1st</td>
                                <td>80.00</td>
                                <td>20/08/2021</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="attandance">
                <div>
                    <p>Class Attandance Record</p>
                    <p>Year 2020</p>
                </div>
                <div className="chart">

                </div>
            </div>
        </StudentStyles>
    )
}

const StudentStyles = styled.section`
    .student-profile-summary{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "profile missed-test"
            "profile results";
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

        .student-profile{
            grid-area: profile;
            background: #fff;

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

        .missed-test-summary{
            grid-area: missed-test;
            background: #fff;

            .tests{
                div{
                    margin: 2rem 1rem 1rem 1rem;

                    p{
                        margin-bottom: .8rem;
                    }

                    p:first-child{
                        color: rgb(182, 0, 0);
                        font-weight: 600;
                    }

                    p:nth-child(2){
                        font-weight: 600;
                        color: rgb(38, 218, 203);
                    }

                    p:last-child{
                        color: rgb(214, 214, 214);;
                    }
                }
            }
        }

        .results-summary{
            grid-area: results;
            background: #fff;

            .results-table{
                border-collapse: collapse;
                font-size: .7rem;
                width: 100%;
                font-family: Montserrat-Regular;
                margin-bottom: 0rem;
                
                thead tr{
                    text-align: left;
                    border-bottom: 1px solid rgb(220, 220, 220);
                    
                    th{
                        padding: 1rem 1rem;
                        font-weight: 600;
                        margin-right: 2rem;
                    }
                }

                tbody tr{


                    td{
                        padding: 1rem 1rem;
                        margin-right: 2rem;
    
                        div{
                            width: 2rem;
                            height: 2rem;
                            background: pink;
                            border-radius: 100%;
                        }
    
                    }
    
                    td:last-child{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 6rem;
                    }
                }

                tbody tr:nth-child(odd){
                    background-color:  rgb(238, 201, 120);
                }
                tbody tr:nth-child(even){
                    background-color: rgb(99, 243, 207);
                }
            }
        }
    }

    .attandance{
        margin: 1rem 0rem;
        padding: 4rem 0rem;
        background-image: linear-gradient(rgb(245, 71, 115), rgb(153, 8, 44));
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;

        div:first-child{
            p{
                padding-left: 1rem;
                font-weight: 500;
                font-family: Montserrat-Medium;
                color: #fff;
            }

            p:first-child{
                font-size: 1.3rem;
                margin-bottom: 1rem;
            }

            p:last-child{
                font-size: 3rem;
                font-weight: 600;
                margin-bottom: 0rem;
                letter-spacing: .5rem;
            }
        }
    }
`;

export default SingleStudent
