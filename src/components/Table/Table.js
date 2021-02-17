import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {FaTrash} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import {IoEyeSharp} from 'react-icons/io5'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Search from '../Forms/Search'
import AdminContext from '../../context/admin/adminContext'

const Table = ({heading, title, linkTo, query, persons}) => {
    
    // Use admin context
    const adminContext = useContext(AdminContext);

    // Persons state
    const [individuals, setIndividuals] = useState(persons)

    // Store person id from search form
    const [personId, setPersonId] = useState('');

    // Toggle class
    const [activeClass, setActiveClass] = useState(false)

    // Store delete id
    const [deleteId, setDeleteId] = useState('')

    // Destructure items
    const {getSinglePerson, deletePerson} = adminContext

    // Update state
    const onChangeHandler = (e)=>{
        setPersonId(e.target.value)
    }

    // Search single user
    const onSubmitHandler = (e) => {
        e.preventDefault();

        // Update persons based on the search id
        const person = getSinglePerson(personId);

        // Find person based on the search id from current array
        const currentPerson = persons.find(current => personId === current.student_id || personId === current.teacher_id || personId === current.parent_id)
        
        // Update table if passes test
        if(person.length > 0 && typeof person[0] !== "undefined" && typeof currentPerson !== "undefined"){
            setIndividuals(person)
        }
    }

    const classHandler = (toggleState, deleteId) => {
        setDeleteId(deleteId)
        setActiveClass(toggleState);
    }

    // Remove person
    const removePerson = (id, query) => {
        
        // Return results after removing the person
         deletePerson(id, query);

         if(query === "teachers" || query === "student" || query === "parents"){
            setIndividuals(individuals.filter(person => id !== person.id));
            console.log(id)
        }

        // Remove backdrop
        setActiveClass(!activeClass);
        
    }

    useEffect(() => {
        if(query === 'student'){
            setIndividuals((adminContext.students));
        } else if(query === 'teachers'){
            setIndividuals((adminContext.teachers));
        } else if(query === 'parents'){
            setIndividuals((adminContext.parents));
        }
    }, [])
    
    return (
        <TableStyles test ={'red'}>
            {activeClass? <div className="backdrop"></div> : null}
            <div className="header">
                <p>{heading}</p>
                <Search 
                    text="search by id"
                    onChangeHandler = {onChangeHandler}
                    onSubmitHandler = {onSubmitHandler}
                    personId= {personId}
                />
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
                    {individuals.length > 0 ? individuals.map(person =>{
                        return <tr key={person.id}>
                                    <td>{person.teacher_id? person.teacher_id : person.student_id? person.student_id: person.parent_id}</td>
                                    <td>
                                        <div></div>
                                    </td>
                                    <td>{person.fname}</td>
                                    <td>{person.lname}</td>
                                    <td>{person.gender}</td>
                                    <td>{person.teacher_id? person.classes: person.student_id? person.grade: person.classes}</td>
                                    <td>{person.age}</td>
                                    <td>{person.email}</td>
                                    <td>
                                        <Link to={`/${linkTo}/${person.teacher_id? person.teacher_id : person.student_id? person.student_id: person.parent_id}`}><IoEyeSharp style={{fontSize: "1rem", color: "grey", cursor: "pointer"}}/></Link>
                                        <FiEdit style={{color: "rgb(38, 218, 203)", cursor: "pointer", fontSize: ".8rem"}}/>
                                        <FaTrash style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".8rem"}} onClick={() => classHandler(true, person.id)}/>
                                    </td>
                              </tr>
                    }): null}
                </tbody>
            </table>
            {activeClass? <div className="confirm">
                <p>This operation will delete the {title.split(" ")[0].toLowerCase()} form the database.</p>
                <p>Do you want to continue?</p>
                <div className="buttons">
                    <div onClick ={() => removePerson(deleteId, query)}>Yes</div>
                    <div onClick={() => classHandler(false)}>No</div>
                </div>
            </div>: null}
        </TableStyles>
    )
}

const TableStyles = styled.section`
        background-color: #fff;
        position: relative;

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
                    position: relative;
                }
            }

            tbody tr:nth-child(even){
                background-color: rgb(240, 240, 240);
                
                td:nth-child(even) div{
                    background: rgb(158, 191, 252);
                }
            }
        }

        .confirm{
            width: 50%;
            padding: 2rem 0rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 200;

            p{
                margin-bottom: .5rem;
            }

            .buttons{
                display: flex;
                gap: .5rem;

                div{
                    padding: .4rem;
                    margin-top: .5rem;
                    border-radius: 5px;
                    font-size: .7rem;
                    font-weight: 600;
                    color: #fff;
                    background-color: rgb(177, 2, 2);
                    cursor: pointer;
                }

                div:first-child{
                    background-color: rgb(9, 95, 95);
                }
            }
        }

        .backdrop{
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: black;
            opacity: 0.8;
            position: absolute;
            z-index: 100;
        }

`

Table.propTypes = {
    heading: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default Table
