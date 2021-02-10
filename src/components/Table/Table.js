import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {FaTrash} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import {IoEyeSharp} from 'react-icons/io5'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Search from '../Forms/Search'
import AdminContext from '../../context/admin/adminContext'

const Table = ({heading, title, linkTo, query}) => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teachers, searchTeachers} = adminContext;

    // Local state

    useEffect(() => {
        
        // Search either teachers, students or parents
         searchTeachers(query);
    }, [query])

    


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
                    {teachers.length > 0 ? teachers.map(teacher =>{
                        return <tr key={teacher.id}>
                                    <td>{teacher.teacher_id? teacher.teacher_id : teacher.student_id? teacher.student_id: teacher.parent_id}</td>
                                    <td>
                                        <div></div>
                                    </td>
                                    <td>{teacher.fname}</td>
                                    <td>{teacher.lname}</td>
                                    <td>{teacher.gender}</td>
                                    <td>{teacher.classes}</td>
                                    <td>{teacher.age}</td>
                                    <td>{teacher.email}</td>
                                    <td>
                                        <Link to={`/${linkTo}/${teacher.teacher_id? teacher.teacher_id : teacher.student_id? teacher.student_id: teacher.parent_id}`}><IoEyeSharp style={{fontSize: "1rem", color: "grey", cursor: "pointer"}}/></Link>
                                        <FiEdit style={{color: "rgb(38, 218, 203)", cursor: "pointer", fontSize: ".8rem"}}/>
                                        <FaTrash style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".8rem"}}/>
                                    </td>
                              </tr>
                    }): null}
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
