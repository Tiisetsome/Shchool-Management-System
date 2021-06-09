import React, {useState, useContext, useEffect} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom';
import axios from 'axios'
import AuthContext from './context/authentication/authContext'

import './App.css';
import Navigation from './components/Navigation';
import Protected from './components/Protected/Protected';
import StudentForm from './components/Forms/StudentForm';
import UpdateStudent from './pages/UpdateStudent';
import RegularTeacherUpdateStudent from './pages/teachers/RegularTeacherUpdateStudent';
import TeacherForm from './components/Forms/TeacherForm';
import UpdateTeacherForm from './components/Forms/update/UpdateTeacherForm';
import ParentForm from './components/Forms/ParentForm';
import UpdateParentForm from './components/Forms/update/UpdateParentForm';
import NoticeForm from './components/Forms/NoticeForm';
import TestNotices from './components/Notices/TestNotices'
import TestNoticeForm from './components/Forms/TestNoticeForm';
import EventForm from './components/Forms/EventForm';
import CasesForm from './components/Forms/CasesForm';
import MarksForm from './components/Forms/MarksForm';
import RegularTeacherUpdateMarks from './pages/teachers/RegularTeacherUpdateMarks';
import Login from './pages/Login'
import Home from './pages/Home';
import TeachersPage from './pages/TeachersPage';
import StudentsPage from './pages/StudentsPage';
import SchoolEvents from './pages/SchoolEvents';
import ParentsPage from './pages/ParentsPage';
import Cases from './pages/Cases'
import StudentPromotion from './pages/StudentPromotion'
import ParentProfile from './pages/single/ParentProfile';
import TeacherProfile from './pages/single/TeacherProfile';
import StudentProfile from './pages/single/StudentProfile';
import StudentPage from './pages/students/StudentPage';
import StudentEvents from './pages/students/StudentEvents';
import StudentTestNotices from './pages/students/StudentTestNotices';
import StudentMyProfile from './pages/students/StudentMyProfile';
import StudentAssessment from './pages/students/StudentAssessment';
import StudentTimetable from './pages/students/StudentTimetable';
import RegularTeacher from './pages/teachers/RegularTeacher';
import RegularTeacherProfile from './pages/teachers/RegularTeacherProfile';
import TeacherSchoolEvents from './pages/teachers/RegularTeacherEvents';
import RegularTeacherAssessment from './pages/teachers/RegularTeacherAssessment';
import RegularTeacherStudents from './pages/teachers/RegularTeacherStudents';
import RegularTeacherParents from './pages/teachers/RegularTeacherParents';
import RegularTeacherStudentPromotion from './pages/teachers/RegularTeacherStudentPromotion';
import RegularTeacherStudentProfile from './pages/single/RegularTeacherStudentProfile';
import RegularTeacherTestNotices from './pages/teachers/RegularTeacherTestNotices';
import RegularTeacherParentProfile from './pages/single/RegularTeacherParentProfile';
import RegularTeacherStudentMissedTest from './pages/teachers/RegularTeacherStudentMissedTest'
import ScrollToTop from './HOC/ScrollToTop'

const App = () => {

  // Use auth reducer
  const authContext = useContext(AuthContext)

  // Destructure items
  const {tcAuth, sdnAuth, isAuth, errorMessage, errorStatus, isLoading, searchPerson, logOutUser} = authContext

  // History method
  const history = useHistory()

  // Login state
  const [credentials, setCredentials] = useState({
      person_id: '',
      pwd: ''
  })

  // Signup state
  const [signup, setSignup] = useState({
      person_id: '',
      otp_code: '',
      pwd: '',
      pwd_confirm: '',
      errorMessage: '',
      errorStatus: false,
      updated: false,
  })

  // Error message state
  const [errorMsg, setErrorMsg] = useState(null)
    
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

  useEffect(() => {

    // Handle routes
    if(isAuth){
      history.push('/');
    }else if(tcAuth){
      history.push('/teacher_dashboard');
    }else if(sdnAuth){
      history.push('/student_dashboard');
    }
  },[isAuth, tcAuth, sdnAuth])

  // Form validation
  const isEmpty = (fieldInputs) => {
    let errorMessage ;
    for(let i = 0; i < fieldInputs.length; i++){
      if(fieldInputs[i] == ""){
        errorMessage = 'Please fill in all fields.';
        setErrorMsg(errorMessage);
        return true;
      }
    }
    return false;
  }

  const isNumbers = (fieldInput) => {
    let errorMessage ;
    if(!/^[0-9]+$/.test(fieldInput)){
      errorMessage = "Please enter a valid ID";
      setErrorMsg(errorMessage);
      return false;
    }
    return true;
  }

  const checkPasswordMatch = (password, confirmPassword) => {
      let errorMessage;
      if(password !== confirmPassword){
        errorMessage = "Password does not match";
        setErrorMsg(errorMessage);
        return false
      }
      return true;
  }

  // Login Form submit handler
  const submitHandler = async (e) => {
      e.preventDefault();
      const inputs = Object.values(credentials);
      
      // Check empty fields
      if(isEmpty(inputs)) return;

      // Check person ID input
      if(!isNumbers(credentials.person_id)) return;
      
      setErrorMsg(null);
      searchPerson(credentials);
  }

   // Login Form submit handler
   // NB: YOU NEED TO MOVE THIS METHOD TO AUTH STATE
   const signupSubmitHandler = async (e) => {
      e.preventDefault();

      const signUpFieldInputs = [signup.person_id, signup.otp_code, signup.pwd, signup.pwd_confirm]

      if(isEmpty(signUpFieldInputs)) return;
      if(!isNumbers(signup.person_id)) return;
      if(!isNumbers(signup.otp_code)) return;
      if(!checkPasswordMatch(signup.pwd, signup.pwd_confirm)) return;

      console.log(signup)
      const res = await axios.post('auth/signUp.php', signup)
      
      console.log(res.data)

      if(res.data.updated){
        console.log(res.data)
        //setBackdrop(false);
        setBackdrop(false)

        setCredentials({
          ...credentials,
          person_id: signup.person_id,
        });

        setSignup({
          person_id: '',
          pwd: '',
          otp_code: '',
          errorMessage: '',
          errorStatus: false,
          pwd_confirm: '',
          updated: false
        });
        
        setErrorMsg(null);
        return
      }

      setErrorMsg(res.data.errorMsg);
  }

  const verification = async (e) => {
        e.preventDefault();
        const res = await axios.post('auth/signUp_verification.php', {person_id: signup.person_id})
        console.log(res)
        if(res.data.updated){
            setSignup({
            ...signup,
            errorMessage: "",
            errorStatus: false,
            updated : true,
            })
            return 
        }

        setSignup({
          ...signup,
          errorMessage: res.data.errorMsg,
          errorStatus: true
        })

        return
  }

  const resetAll = () => {
      setBackdrop(false);
      setSignup({
        person_id: '',
        pwd: '',
        otp_code: '',
        pwd_confirm: '',
        updated: false,
      })
      setErrorMsg(null)
  }

  console.log(errorStatus)

  return (
      <>
        <ScrollToTop/>
        <Navigation isAuth={isAuth} sdnAuth={sdnAuth} tcAuth={tcAuth} logoutHandler = {logOutUser}/>
        <Switch>
            <Route path='/login'>
              <Login changeHandler={changeHandler}
                     signInErrorMessage = {errorMessage}
                     signInErrorStatus = {errorStatus}
                     signupChangeHandler = {signupChangeHandler}
                     submitHandler={submitHandler}
                     signupSubmitHandler = {signupSubmitHandler}
                     signupVerification = {verification}
                     credentials={credentials}
                     signup = {signup}
                     backdrop= {backdrop}
                     loading = {isLoading}
                     errorMsg = {errorMsg}
                     resetAll = {resetAll}
                     setBackdrop = {setBackdrop}
              />
            </Route>
            <Protected exact path="/" component={Home} isAuth={isAuth}/>
            <Protected exact path="/teachers" component={TeachersPage} isAuth={isAuth}/>
            <Protected exact path="/teachers/:id" component={TeacherProfile} isAuth={isAuth}/>
            <Protected exact path="/students" component={StudentsPage} isAuth={isAuth}/>
            <Protected exact path="/events" component={SchoolEvents} isAuth={isAuth}/>
            <Protected exact path="/students/:id" component={StudentProfile} isAuth={isAuth}/>
            <Protected exact path="/parents" component={ParentsPage} isAuth={isAuth}/>
            <Protected exact path="/parents/:id" component={ParentProfile} isAuth={isAuth}/>
            <Protected exact path="/promotion" component={StudentPromotion} isAuth={isAuth}/>
            <Protected exact path="/cases" component={Cases} isAuth={isAuth}/>
            <Protected exact path="/form/student" component={StudentForm} isAuth={isAuth}/>
            <Protected exact path="/form/students/update/:id" component={UpdateStudent} isAuth={isAuth}/>
            <Protected exact path="/form/teacher_dashboard/students/update/:id" component={RegularTeacherUpdateStudent} isAuth={tcAuth}/>
            <Protected exact path="/form/teacher" component={TeacherForm} isAuth={isAuth}/>
            <Protected exact path="/form/teachers/update/:id" component={UpdateTeacherForm} isAuth={isAuth}/>
            <Protected exact path="/form/parent" component={ParentForm} isAuth={isAuth}/>
            <Protected exact path="/form/parents/update/:id" component={UpdateParentForm} isAuth={isAuth}/>
            <Protected exact path="/form/notice" component={NoticeForm} isAuth={isAuth}/>
            <Protected exact path="/form/event" component={EventForm} isAuth={isAuth}/>
            <Protected exact path="/form/case" component={CasesForm} isAuth={isAuth}/>
            <Protected exact path="/form/marks" component={MarksForm} isAuth={tcAuth}/>
            <Protected exact path="/form/missedTest" component={RegularTeacherStudentMissedTest} isAuth={tcAuth}/>
            <Protected exact path="/notices/upcomingTests" component={TestNotices} isAuth={isAuth}/>
            <Protected exact path="/student_dashboard" component={StudentPage} isAuth={sdnAuth}/>
            <Protected exact path="/student_dashboard/profile" component={StudentMyProfile} isAuth={sdnAuth}/>
            <Protected exact path="/student_dashboard/events" component={StudentEvents} isAuth={sdnAuth}/>
            <Protected exact path="/student_dashboard/tests" component={StudentTestNotices} isAuth={sdnAuth}/>
            <Protected exact path="/student_dashboard/assessment" component={StudentAssessment} isAuth={sdnAuth}/>
            <Protected exact path="/student_d ashboard/timetable" component={StudentTimetable} isAuth={sdnAuth}/>
            <Protected exact path="/teacher_dashboard" component={RegularTeacher} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/profile" component={RegularTeacherProfile} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/events" component={TeacherSchoolEvents} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/upcomingTests" component={RegularTeacherTestNotices} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/test_notice_add" component={TestNoticeForm} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/assessment" component={RegularTeacherAssessment} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/students" component={RegularTeacherStudents} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/parents" component={RegularTeacherParents} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/promotion" component={RegularTeacherStudentPromotion} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/students/:id" component={RegularTeacherStudentProfile} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/parents/:id" component={RegularTeacherParentProfile} isAuth={tcAuth}/>
            <Protected exact path="/teacher_dashboard/forms/update_marks/:id" component={RegularTeacherUpdateMarks} isAuth={tcAuth}/>
         </Switch>
      </>
  );
}

export default App;
