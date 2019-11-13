import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {connect} from 'react-redux';

import userIcon from '../images/user.png';
import lockIcon from '../images/lock.png';

import TextIn from './TextIn';
import SubmitBtn from './SubmitBtn';

import {loginSrv,setProperLoginState} from '../actions';

const FormCtrDiv = styled.div`
  margin-top:50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StylH2 = styled.h2`
  margin-top:10px;
  text-align:center;
  
`;

const StylH3 = styled.h3`
  margin-top:30px;
  text-align:center;
  
`;


function formStatus(formState,errMsg="") {
  switch(formState) {
    case 0:
      return "Not authenticated";
    case 1:
      return "Checking credentials on server. Please wait...";
    case 2:
      return "You are logged in, you can now visit other pages on this site.";
    case 3:
      return errMsg;
    default:
      return "Unknown Error";      
  }
}



const LogInForm = ({errors,touched,status,loginSrv,loginState,loginErrMsg,setProperLoginState}) => {
  // const [data, setData] = useState({});

  useEffect(() => {
    // console.log("This is status in useEffects: ",status);
    // status && setData(status); 
    status && loginSrv(status);
  }, [status]);

  useEffect(() => {
    // console.log("This is useEffects in LogInForm");
    setProperLoginState(); //This sets the Login Form state properly on page refresh
  }, []);


  return (
    <>
      <StylH2>Login Page</StylH2>
      

      <FormCtrDiv>
        <Form>
          <TextIn 
            fieldName="username" fieldType="text" fieldPlaceHolder="UserName" 
            iconImg={userIcon} imgTxt="User Icon"
            touched={touched.username} errors={errors.username}
          />
          <TextIn 
            fieldName="password" fieldType="password" fieldPlaceHolder="Password" 
            iconImg={lockIcon} imgTxt="Password Icon"
            touched={touched.password} errors={errors.password}
          />
          <SubmitBtn textDisplay={"LogIn"}/>
        </Form>
        
      </FormCtrDiv>

      <StylH3>{formStatus(loginState,loginErrMsg)}</StylH3>

      {/* The following code is for testing purposes only */}
      {/* comment out in customer version of the code */}
      {/* <p>{`The user name is: ${data.username}`}</p> */}
      {/* <p>{`The password is: ${data.password}`}</p> */}
            

    </>

  );
    
 
 } //End of LogInForm function
 
 
 
const FormikLogInForm = withFormik({
  
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please input a user name"),
    password: Yup.string().required("Please input a password").min(3,"Min of 3 chars for the password"),
  }),
  
  handleSubmit(values, { setStatus, resetForm }) {
    resetForm();
    // console.log("In the handleSubmit function and values is: ",values);
    setStatus(values);
    
  },
  
  
})(LogInForm); 

function mapStateToProps(state) {
  return {
    loginState: state.loginState,
    loginErrMsg: state.loginErrMsg,
  };
}

export default connect(mapStateToProps,{loginSrv,setProperLoginState})(FormikLogInForm);