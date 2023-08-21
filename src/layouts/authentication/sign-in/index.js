import React, { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "../../../soft-components/SoftBox";
import SoftTypography from "../../../soft-components/SoftTypography";
import SoftInput from "../../../soft-components/SoftInput";
import SoftButton from "../../../soft-components/SoftButton";

// Authentication layout soft-components
import BasicLayout from "../components/BasicLayout";
import Socials from "../components/Socials";
import Separator from "../components/Separator";

// Images
import curved6 from "../../../assets/images/curved-images/curved14.jpg";
import { Space, Spin } from 'antd';
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { auth, db } from "../../../firebase";
import { updateAuthId } from "../../../redux/dataSlice";
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete';
import { Button, TextField } from "@mui/material";
import swal from "@sweetalert/with-react";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import ForgotPass from "./ForgotPass";



function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.authId);
  const [modalShowForgetPass, setModalShowForgetPass] = React.useState(false);
  const history = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
            
          }
        })
        dispatch(updateAuthId(user?.uid))

      }
    })
    return () => unsubscribe()
  }, [])

  const login = (e)=> {
    e.preventDefault();
   setLoading(true)
   if(!email || !password){
    toast.error('Email and password are required!', {
      position: toast.POSITION.TOP_CENTER
    })
    setLoading(false)
   }else{
    auth.signInWithEmailAndPassword(email,password)
    .then((auth) =>{
      setLoading(false)
      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully',
        text: 'Welcome back!',
      })
    }).then(() => {
      history('/');
      // window.location.reload();
    })

    .catch((e) =>{
            toast.error(e.message, {
              position: toast.POSITION.TOP_CENTER
          })      
          setLoading(false)     
    })
   }
}

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image="https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg"
    >
    <Card>
    <SoftBox p={3} mb={1} textAlign="center">
    <SoftTypography variant="h5" fontWeight="medium">
      Sign In Here!
    </SoftTypography>
  </SoftBox>
    {/* <Separator /> */}
    <SoftBox pt={0} pb={3} px={3}>
      <SoftBox component="form" role="form">
        <SoftBox mb={1}>
          <SoftInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
          </SoftBox>
    <SoftBox mb={1}>
    <SoftInput
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    placeholder="Password" />
  </SoftBox>


        <SoftBox mt={2} mb={1}>
          <SoftButton style={{backgroundColor:'#2152ff',color:'#fff'}} onClick={login} variant="gradient" color="info" fullWidth>
          {loading === true ?(
            <span><span style={{color:'#fff'}}>signing in...<Spin size="middle" /></span></span>
          ):(
            <span>Sign In</span>
          )}
          </SoftButton>

          <SoftBox mt={2} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{cursor:'pointer'}}
              onClick={() => setModalShowForgetPass(true)}
            >
              Forgotten Password?
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftBox mt={3} textAlign="center">
        <Link to="/register">
        <SoftTypography variant="button" color="text" fontWeight="regular">
          <SoftTypography
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
            style={{cursor:'pointer'}}
          >
            Don't have an account?
          </SoftTypography>
        </SoftTypography>
        </Link>
      </SoftBox>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  </Card>


  <Modal
  show={modalShowForgetPass}
  onHide={() => setModalShowForgetPass(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Body>
   <ForgotPass setModalShowForgetPass={setModalShowForgetPass} />
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={() => setModalShowForgetPass(false)}>Close</Button>
  </Modal.Footer>
</Modal>
    </BasicLayout>
  );
}

export default SignUp;
