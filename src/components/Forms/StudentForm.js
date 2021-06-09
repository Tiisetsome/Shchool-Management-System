import React, {useState, useContext, useRef} from 'react'
import {FormStyles} from '../Styles/FormStyles'
import AdminContext from '../../context/admin/adminContext'
import { withRouter } from 'react-router-dom';
import { ContentStyles } from '../Styles/ContentStyles';
import SideNavigation from '../SideNavigation';

const StudentForm = () => {
    
    // Use admin contxt
    const adminContext = useContext(AdminContext);

    // Destrcuture items
    const {addPerson, addStatus}  = adminContext

    // Form state
    const [fields, setFields] = useState({
        fname: '',
        lname: '',
        gender: 'Male',
        age: '',
        grade: 'Grade 8',
        sections: '',
        email: '',
        phone: '',
        address: '',
        subjects: '',
        chosenSubs: [],
    })

    // Error message state
    const [errorMsg, setErrorMsg] = useState(null)

    // Handle change
    const changeHandler = (e, input) => {
        setFields({
            ...fields,
            [input]: e.target.value
        })
    }
    
    const checkboxHandler = (e, input) => {
        let subjects = [...fields.chosenSubs];
        if(e.target.checked === true){
             subjects = [...subjects, e.target.value];
        }else{
            subjects = subjects.filter(subject => subject !== e.target.value)
        }
        setFields({
            ...fields,
            subjects: subjects.join(","),
            chosenSubs: subjects
        })
    }

    // Form validation
    const isEmpty = (fieldInputs) => {
        let errorMessage ;
        for(let i = 0; i < fieldInputs.length; i++){
            if(fieldInputs[i].length == 0){
                errorMessage = 'Please fill in all fields.';
                setErrorMsg(errorMessage);
                return true;
            }
        }
        return false;
    }

    const isNumbers = (fieldInput) => {
        const regex = !/^[0-9]+$/.test(fieldInput)
        let errorMessage ;
        if(regex){
            errorMessage = "Please enter a valid phone number.";
            setErrorMsg(errorMessage);
            return false;
        }
        return true;
    }

    const isValidEmail = (fieldInput) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldInput);
        let errorMessage;
        console.log(regex)
        if(!regex){
            errorMessage = "Please enter a valid email.";
            console.log(errorMessage)
            setErrorMsg(errorMessage);
            return false;
        }
        return true;
    }

    // Handle form submit
    const submitHandler = (e) => {
        e.preventDefault();
        const inputs = Object.values(fields);

        // Check empty fields
        if(isEmpty(inputs)) return;

        // Check person ID input
        if(!isNumbers(fields.phone)) return;

        // Check email address
        if(!isValidEmail(fields.email)) return;

        setErrorMsg(null);
        addPerson(fields, 'student');
        
        // Empty form fields
        setFields({
            ...fields,
            fname: '',
            lname: '',
            gender: 'Male',
            age: '',
            grade: 'Grade 8',
            sections: '',
            email: '',
            phone: '',
            address: '',
        })
        
    }

    return (
        <ContentStyles>
            <SideNavigation/>
            <FormStyles>
                <p style={{background: '#F0F0F0'}} className="p-header">Home - <span>Student</span></p>
                <div className='header'>
                    <p>Add Students</p>
                </div>
                {errorMsg !== null ? <div className="error" style = {{fontWeight: "500"}}>{errorMsg}</div> : null}
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
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
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
                    <div className="checkboxes-wrapper">
                        <label>subjects  :</label>
                        <div className="checkboxes">
                            <input type="checkbox" name = "subject" value="Physical Sciences" onChange={(e) => checkboxHandler(e, 'subject')}/>
                            <label>Physical Sciences</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "subject" value="Mathematics" onChange={(e) => checkboxHandler(e, 'subject')}/>
                            <label>Mathematics</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "subject-3" value="Mathematical Literacy" onChange={(e) => checkboxHandler(e, 'subject')}/>
                            <label>Mathematical Literacy</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "subject-4" value="Agricultural Sciences" onChange={(e) => checkboxHandler(e, 'subject')}/>
                            <label>Agricultural Sciences</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "subject-5" value="Accounting" onChange={(e) => checkboxHandler(e, 'subject')}/>
                            <label>Accounting</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "subject-2" value="Economics" onChange={(e) => checkboxHandler(e, 'subject')}/>
                            <label>Economics</label>
                        </div>
                    </div>
                </form>
                {addStatus.status? <div className = "notice">{addStatus.message}</div> : null}
            </FormStyles>
        </ContentStyles>
    )
}

export default withRouter(StudentForm);
