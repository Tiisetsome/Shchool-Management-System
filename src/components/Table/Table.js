import React from 'react'
import styled from 'styled-components'
import {FaTrash} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import {IoEyeSharp} from 'react-icons/io5'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Search from '../Forms/Search'

const Table = ({heading, title, linkTo}) => {

    // Single Page Handler
    const singlePageHandler = (page)=>{
        console.log(page == "teacher"? "teacher": page=="student"? "student": "parent")
        return page == "teacher"? "teacher": page=="student"? "student": "parent"; 
    }
    return (
        <TableStyles>
            <div className="header">
                <p>{heading}</p>
                <Search text="search by id"/>
            </div>
            <table className="teachers-table">
                <thead>
                    <tr>
                        <th>{title}</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Age</th>
                        <th>E-mail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>302101 </td>
                        <td>
                            <div></div>
                        </td>
                        <td>Magret</td>
                        <td>Nkuna</td>
                        <td>Female</td>
                        <td>Grade 8, Grade 9</td>
                        <td>45</td>
                        <td>magret@gmail.com</td>
                        <td>
                            <Link to={`/${linkTo}/${1}`}><IoEyeSharp style={{fontSize: "1rem", color: "grey", cursor: "pointer"}}/></Link>
                            <FiEdit style={{color: "rgb(38, 218, 203)", cursor: "pointer", fontSize: ".8rem"}}/>
                            <FaTrash style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".8rem"}}/>
                        </td>
                    </tr>
                    <tr>
                        <td>302102</td>
                        <td>
                            <div></div>
                        </td>
                        <td>James</td>
                        <td>Ledwaba</td>
                        <td>Male</td>
                        <td>Grade 9</td>
                        <td>38</td>
                        <td>james75@gmail.com</td>
                        <td>
                            <IoEyeSharp style={{fontSize: "1rem", color: "grey", cursor: "pointer"}}/>
                            <FiEdit style={{color: "rgb(38, 218, 203)", cursor: "pointer", fontSize: ".8rem"}}/>
                            <FaTrash style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".8rem"}}/>
                        </td>
                    </tr>
                    <tr>
                        <td>302103</td>
                        <td>
                            <div></div>
                        </td>
                        <td>Elizabeth</td>
                        <td>Moranang</td>
                        <td>Female</td>
                        <td>Grade 12</td>
                        <td>27</td>
                        <td>elizabeth@yahoo.com</td>
                        <td>
                            <IoEyeSharp style={{fontSize: "1rem", color: "grey", cursor: "pointer"}}/>
                            <FiEdit style={{color: "rgb(38, 218, 203)", cursor: "pointer", fontSize: ".8rem"}}/>
                            <FaTrash style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".8rem"}}/>
                        </td>
                    </tr>
                    <tr>
                        <td>302104</td>
                        <td>
                            <div></div>
                        </td>
                        <td>Katlego</td>
                        <td>Mashego</td>
                        <td>Male</td>
                        <td>Grade 11</td>
                        <td>25</td>
                        <td>katlego@hotmail.com</td>
                        <td>
                            <IoEyeSharp style={{fontSize: "1rem", color: "grey", cursor: "pointer"}}/>
                            <FiEdit style={{color: "rgb(38, 218, 203)", cursor: "pointer", fontSize: ".8rem"}}/>
                            <FaTrash style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".8rem"}}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </TableStyles>
    )
}

const TableStyles = styled.section`
        background-color: #fff;

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

        .teachers-table{
            border-collapse: collapse;
            font-size: .7rem;
            width: 100%;
            font-family: Montserrat-Regular;
            margin-bottom: 2rem;

            thead tr{
                text-align: left;
                border-bottom: 1px solid rgb(220, 220, 220);
                
                th{
                    padding: 1.2rem 1rem;
                    font-weight: 600;
                    margin-right: 2rem;
                }
            }

            tbody tr{


                td{
                    padding: 1.2rem 1rem;
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
                    margin-top: calc(1.2rem / 2);
                }
            }

            tbody tr:nth-child(even){
                background-color: rgb(240, 240, 240);
                
                td:nth-child(even) div{
                    background: rgb(158, 191, 252);
                }
            }
        }

`

Table.propTypes = {
    heading: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default Table
