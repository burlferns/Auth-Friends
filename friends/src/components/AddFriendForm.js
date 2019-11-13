import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {connect} from 'react-redux';

import userIcon from '../images/user.png';
import mailIcon from '../images/mail.png';

import TextIn from './TextIn';
import SubmitBtn from './SubmitBtn';

import {addFriend,setProperAddFriendState} from '../actions';

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
      return "";
    case 1:
      return "Adding friend to server. Please wait...";
    case 2:
      return "Friend added to server. ";
    case 3:
      return errMsg;
    default:
      return "Unknown Error";      
  }
}



const AddFriendForm = ({errors,touched,status,addFriend,addState,addErrMsg,setProperAddFriendState}) => {
  // const [data, setData] = useState({});

  useEffect(() => {
    // console.log("This is status in useEffects: ",status);
    // status && setData(status); 
    status && addFriend(status);
  }, [status]);

  useEffect(() => {
    // console.log("This is useEffects in LogInForm");
    setProperAddFriendState(); //This sets the AddFriend Form state properly on dismount
  }, []);


  return (
    <>
      <StylH2>Add a friend page</StylH2>
      

      <FormCtrDiv>
        <Form>
          <TextIn 
            fieldName="name" fieldType="text" fieldPlaceHolder="Name" 
            iconImg={userIcon} imgTxt="User Icon"
            touched={touched.name} errors={errors.name}
          />
          <TextIn 
            fieldName="age" fieldType="text" fieldPlaceHolder="Age" 
            iconImg={userIcon} imgTxt="User Icon"
            touched={touched.age} errors={errors.age}
          />
          <TextIn 
            fieldName="email" fieldType="text" fieldPlaceHolder="Email" 
            iconImg={mailIcon} imgTxt="Password Icon"
            touched={touched.email} errors={errors.email}
          />
          <SubmitBtn textDisplay={"Add Friend"}/>
        </Form>
        
      </FormCtrDiv>

      <StylH3>{formStatus(addState,addErrMsg)}</StylH3>

      {/* The following code is for testing purposes only */}
      {/* comment out in customer version of the code */}
      {/* <p>{`The user name is: ${data.name}`}</p> */}
      {/* <p>{`The password is: ${data.age}`}</p> */}
      {/* <p>{`The email is: ${data.email}`}</p> */}

    </>

  );
    
 
 } //End of AddFriendForm function
 
 
 
const FormikAddFriendForm = withFormik({
  
  mapPropsToValues({ name, age, email }) {
    return {
      name: name || "",
      age: age || "",
      email: email || "",
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please input a name"),
    age: Yup.number()
      .required("Please input age")
      .typeError("Age must only be digits not other chars")
      .integer("Age must be an integer number")
      .positive("Age must be a positive number"),
    email: Yup.string().required("Please input donor's email address").email("Please enter a valid email"),
  }),
  
  handleSubmit(values, { setStatus, resetForm }) {
    resetForm();
    // console.log("In the handleSubmit function and values is: ",values);
    setStatus(values);
    
  },
  
  
})(AddFriendForm); 

function mapStateToProps(state) {
  return {
    addState: state.addState,
    addErrMsg: state.addErrMsg,
  };
}

export default connect(mapStateToProps,{addFriend,setProperAddFriendState})(FormikAddFriendForm);