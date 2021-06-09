import React, {useState, useContext, useEffect} from 'react'
import {FormStyles} from '../Styles/FormStyles'
import AdminContext from '../../context/admin/adminContext'
import { withRouter } from 'react-router-dom';
import { ContentStyles } from '../Styles/ContentStyles';
import SideNavigation from '../SideNavigation';

const ParentForm = () => {
    
    // Use admin contxt
    const adminContext = useContext(AdminContext);

    // Destrcuture items
    const {addPerson, addStatus}  = adminContext
    console.log(addStatus)

    // Form state
    const [fields, setFields] = useState({
        fname: '',
        lname: '',
        gender: 'male',
        age: '',
        classes: '',
        chosenClasses: [],
        sections: '',
        email: '',
        phone: '',
        address: ''
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

     // Grades checkbox handler
     const gradesCheckboxHandler = (e, input) => {
        let grades = [...fields.chosenClasses];
        if(e.target.checked === true){
             grades = [...grades, e.target.value];
        }else{
            grades = grades.filter(grade => grade !== e.target.value)
        }
        setFields({
            ...fields,
            classes: grades.join(","),
            chosenClasses: grades
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
        addPerson(fields, 'parents');

        // Empty form fields
        setFields({
            ...fields,
            fname: '',
            lname: '',
            gender: 'male',
            age: '',
            sections: '',
            email: '',
            phone: '',
            address: ''
        })
        
    }

    return (
        <ContentStyles>
            <SideNavigation/>
            <FormStyles>
                <p style={{background: '#F0F0F0'}} className="p-header">Home - <span>Parent</span></p>
                <div className='header'>
                    <p>Add Parent</p>
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
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label>Date Of Birth :</label>
                        <input type="date" name = "age" onChange={(e)=>changeHandler(e,'age')} value={fields.age}/>
                    </div>
                    <div className="checkboxes-wrapper">
                        <label>Classes  :</label>
                        <div className="checkboxes">
                            <input type="checkbox" name = "grade" value="Grade 8" onChange={(e) => gradesCheckboxHandler(e, 'grade')}/>
                            <label>Grade 8</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "grade" value="Grade 9" onChange={(e) => gradesCheckboxHandler(e, 'grade')}/>
                            <label>Grade 9</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "grade" value="Grade 10" onChange={(e) => gradesCheckboxHandler(e, 'grade')}/>
                            <label>Grade 10</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "grade" value="Grade 11" onChange={(e) => gradesCheckboxHandler(e, 'grade')}/>
                            <label>Grade 11</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" name = "grade" value="Grade 12" onChange={(e) => gradesCheckboxHandler(e, 'grade')}/>
                            <label>Grade 12</label>
                        </div>
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
        </ContentStyles>
    )
}

export default withRouter(ParentForm);
