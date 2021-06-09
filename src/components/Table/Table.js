import React, {useState, useContext, useEffect} from 'react'
import {FaTrash} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import {IoEyeSharp} from 'react-icons/io5'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AdminContext from '../../context/admin/adminContext'
import AuthContext from '../../context/authentication/authContext'

import {TableStyles} from '../Styles/TableStyles'
import Search from '../Forms/Search'

const Table = ({heading, title, linkTo, updateLink, query, persons}) => {

    // Use admin context
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

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
    const {role} = authContext;

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

    // Toggle backdrop
    const classHandler = (toggleState, deleteId) => {
        setDeleteId(deleteId)
        setActiveClass(toggleState);
    }

    // Remove person
    const removePerson = (id, query, role) => {
        // Return results after removing the person
         //deletePerson(id, query);
         const personToDelete = individuals.find(individual => individual.id === id);
         if(personToDelete.role !== "admin"){
             console.log('yey')
         }

         if((query === "teachers" || query === "student" || query === "parents") && personToDelete.role !== "admin"){
            deletePerson(id, query);
            console.log(personToDelete.id)
            setIndividuals(individuals.filter(person => id !== person.id));
        }

        // Remove backdrop
        setActiveClass(!activeClass);
        
    }
    
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
                                        <Link to ={`/form/${linkTo}/${updateLink}/${person.teacher_id? person.teacher_id : person.student_id? person.student_id: person.parent_id}`}>
                                            <FiEdit style={{color: "rgb(38, 218, 203)", cursor: "pointer", fontSize: ".8rem"}}/>
                                        </Link>
                                        { role == "teacher"? null : <FaTrash style={{color: "rgb(177, 2, 2)", cursor: "pointer", fontSize: ".8rem"}} onClick={() => classHandler(true, person.id)}/>}
                                    </td>
                              </tr>
                    }): null}
                </tbody>
            </table>
            {activeClass? <div className="confirm">
                <p>This operation will delete the {title.split(" ")[0].toLowerCase()} form the database.</p>
                <p>Do you want to continue?</p>
                <div className="buttons">
                    <div onClick ={() => removePerson(deleteId, query, role)}>Yes</div>
                    <div onClick={() => classHandler(false)}>No</div>
                </div>
            </div>: null}
        </TableStyles>
    )
}

Table.propTypes = {
    heading: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default Table
