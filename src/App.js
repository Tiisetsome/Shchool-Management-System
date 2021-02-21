import React, {useState} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom';
import axios from 'axios'

import './App.css';
import Navigation from './components/Navigation';
import Protected from './components/Protected/Protected';
import StudentForm from './components/Forms/StudentForm';
import TeacherForm from './components/Forms/TeacherForm';
import ParentForm from './components/Forms/ParentForm';
import Login from './pages/Login'
import Home from './pages/Home';
import TeachersPage from './pages/TeachersPage';
import StudentsPage from './pages/StudentsPage';
import ParentsPage from './pages/ParentsPage';
import ParentProfile from './pages/single/ParentProfile';
import TeacherProfile from './pages/single/TeacherProfile';
import StudentProfile from './pages/single/StudentProfile';
import StudentPage from './pages/students/StudentPage';

const App = () => {

  const history = useHistory()

  // Authentication state
  const [isAuth, setIsAuth] = useState(false)
  const [sdnAuth, setSdnAuth] = useState(false)

  // Login state
  const [credentials, setCredentials] = useState({
      person_id: '',
      pwd: ''
  })

  // Signup state
  const [signup, setSignup] = useState({
      person_id: '',
      pwd: '',
      pwd_confirm: ''
  })
    
  // Backdrop state
  const [backdrop, setBackdrop] = useState(false);

  // Login Input change handler
  const changeHandler = (e, input) => {
    setCredentials({
        ...credentials,
        [input]: e.target.value
    })
  }

  // Signup Input change handler
  const signupChangeHandler = (e, input) => {
    setSignup({
        ...signup,
        [input]: e.target.value
    })
  }


  // Login Form submit handler
  const submitHandler = async (e) => {
      e.preventDefault();

      const res = await axios.post('http://localhost:4430/sandbox/student-management-system/api/auth/signIn.php', credentials
      )

      if(res.data.isAuth && res.data.person == 'teacher'){
        setIsAuth(true);
        history.push('/');
      }else if(res.data.isAuth && res.data.person == 'student'){
        setSdnAuth(true);
        history.push('/student_profile');
      }else{
        setIsAuth(false);
      }
  }

   // Login Form submit handler
   const signupSubmitHandler = async (e) => {
      e.preventDefault();

      const res = await axios.post('http://localhost:4430/sandbox/student-management-system/api/auth/signUp.php', signup
      )
      console.log(res.data)

      if(res.data.updated){
        setBackdrop(false);
        setCredentials({
          ...credentials,
          person_id: signup.person_id,
        })
        setSignup({
          person_id: '',
          pwd: '',
          pwd_confirm: ''
        })
      }
  }

  // Log out method
  const logoutHandler = () => {

    // Kill session
    setIsAuth(false);
    setSdnAuth(false);
  }

  return (
      <>
        <Navigation isAuth={isAuth} logoutHandler = {logoutHandler}/>
        <Switch>
            <Route path='/login'>
              <Login changeHandler={changeHandler}
                     signupChangeHandler = {signupChangeHandler}
                     submitHandler={submitHandler}
                     signupSubmitHandler = {signupSubmitHandler}
                     credentials={credentials}
                     signup = {signup}
                     backdrop= {backdrop}
                     setBackdrop = {setBackdrop}
              />
            </Route>
            <Protected exact path="/" component={Home} isAuth={isAuth}/>
            <Protected exact path="/teachers" component={TeachersPage} isAuth={isAuth}/>
            <Protected exact path="/teachers/:id" component={TeacherProfile} isAuth={isAuth}/>
            <Protected exact path="/students" component={StudentsPage} isAuth={isAuth}/>
            <Protected exact path="/students/:id" component={StudentProfile} isAuth={isAuth}/>
            <Protected exact path="/parents" component={ParentsPage} isAuth={isAuth}/>
            <Protected exact path="/parents/:id" component={ParentProfile} isAuth={isAuth}/>
            <Protected exact path="/form/student" component={StudentForm} isAuth={isAuth}/>
            <Protected exact path="/form/teacher" component={TeacherForm} isAuth={isAuth}/>
            <Protected exact path="/form/parent" component={ParentForm} isAuth={isAuth}/>
            <Protected exact path="/student_profile" component={StudentPage} isAuth={sdnAuth}/>
         </Switch>
      </>
  );
}

export default App;
