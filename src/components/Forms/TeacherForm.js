import React from 'react'
import {FormStyles} from '../Styles/FormStyles'

const TeacherForm = () => {
    let dt = new Date('2021-02-03 17:35:40').toString();
    console.log(dt.split(" ").splice(0, 3).join(" "))
    return (
        <FormStyles>
            <div className='header'>
                <p>Add Teacher</p>
            </div>
            <form>
                <div>
                    <lable>First Name :</lable>
                    <input type="text" name = "fname"/>
                </div>
                <div>
                    <lable>Last Name :</lable>
                    <input type="text" name = "lname"/>
                </div>
                <div>
                    <lable>Gender :</lable>
                    <select name = "gender" value = "Gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <lable>Date Of Birth :</lable>
                    <input type="date" name = "age"/>
                </div>
                <div>
                    <lable>Classes :</lable>
                    <select name = "classes">
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                    </select>
                </div>
                <div>
                    <lable>Section :</lable>
                    <input type="text" name = "sections"/>
                </div>
                <div>
                    <lable>E-Mail :</lable>
                    <input type="text" name = "email"/>
                </div>
                <div>
                    <lable>Phone  :</lable>
                    <input type="text" name = "lname"/>
                </div>
                <div>
                    <lable>Address :</lable>
                    <textarea type="text" name = "address"></textarea>
                </div>
                <button>Submit</button>
            </form>
        </FormStyles>
    )
}

export default TeacherForm;
