import React, {useState, useContext, useEffect} from 'react'
import {FormStyles} from '../Styles/FormStyles'
import AdminContext from '../../context/admin/adminContext'

const StudentForm = () => {
    
    // Use admin contxt
    const adminContext = useContext(AdminContext);

    // Destrcuture items
    const {addPerson, addStatus}  = adminContext

    // Form state
    const [fields, setFields] = useState({
        fname: '',
        lname: '',
        gender: 'male',
        age: '',
        grade: 'Grade 8',
        sections: '',
        email: '',
        phone: '',
        address: ''
    })

    // Handle change
    const changeHandler = (e, input) => {
        setFields({
            ...fields,
            [input]: e.target.value
        })
    }

    // Handle form submit
    const submitHandler = (e) => {
        e.preventDefault();
        addPerson(fields, 'student');

        // Empty form fields
        setFields({
            fname: '',
            lname: '',
            gender: 'male',
            age: '',
            grade: 'Grade 8',
            sections: '',
            email: '',
            phone: '',
            address: ''
        })
        
    }

    return (
        <FormStyles>
            <div className='header'>
                <p>Add Students</p>
            </div>
            <form>
                <div>
                    <label>First Name :</label>
                    <input type="text" name = "fname" onChange={(e)=>changeHandler(e,'fname')} value={fields.fname}/>
                </div>
                <div>
                    <label>Last Name :</label>
                    <input type="text" name = "lname" onChange={(e)=>changeHandler(e,'lname')} value={fields.lname}/>
                </div>
                <div>
                    <label>Gender :</label>
                    <select name = "gender" onChange={(e)=>changeHandler(e,'gender')} defaultValue={'male'}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Date Of Birth :</label>
                    <input type="date" name = "age" onChange={(e)=>changeHandler(e,'age')} value={fields.age}/>
                </div>
                <div>
                    <label>Grade :</label>
                    <select name = "grade" onChange={(e)=>changeHandler(e,'grade')} defaultValue={"Grade 8"} value={fields.grade}>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                        <option value="Grade 11">Grade 11</option>
                        <option value="Grade 12">Grade 12</option>
                    </select>
                </div>
                <div>
                    <label>Section :</label>
                    <input type="text" name = "sections" onChange={(e)=>changeHandler(e,'sections')} value={fields.sections}/>
                </div>
                <div>
                    <label>E-Mail :</label>
                    <input type="text" name = "email" onChange={(e)=>changeHandler(e,'email')} value={fields.email}/>
                </div>
                <div>
                    <label>Phone  :</label>
                    <input type="text" name = "phone" onChange={(e)=>changeHandler(e,'phone')} value={fields.phone}/>
                </div>
                <div>
                    <label>Address :</label>
                    <textarea type="text" name = "address" onChange={(e)=>changeHandler(e,'address')} value={fields.address}></textarea>
                </div>
                <button onClick = {(e)=>submitHandler(e)}>Submit</button>
            </form>
            {addStatus.status? <div className = "notice">{addStatus.message}</div> : null}
        </FormStyles>
    )
}

export default StudentForm;
