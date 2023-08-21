import React, { useState } from 'react'
import SoftBox from '../../../../soft-components/SoftBox';
import SoftButton from '../../../../soft-components/SoftButton';
import SoftInput from '../../../../soft-components/SoftInput';
import SoftTypography from '../../../../soft-components/SoftTypography';
import { auth, db } from '../../../../firebase';
import { toast } from 'react-toastify'
import { Space, Spin } from 'antd';
import Swal from 'sweetalert2';
import logo from '../../../../logo.svg';


function ForgotPass({ setModalShowForgetPass }) {
    const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);


  const resetPasword = async(e) =>{
    e.preventDefault();
    setLoading(true)

    if(!email){
        toast.error('Email input is empty!', {
          position: toast.POSITION.TOP_CENTER
      })
        setLoading(false)
    }else{
        const config ={
            url: `https://electronic-doctor.web.app/login`,
            handleCodeInApp: true
        };
      
          await auth
          .sendPasswordResetEmail(email,config)
          .then(() => {
           setEmail('')
           setModalShowForgetPass(false)
           setLoading(false)
          //  toast.success("Check your email for password reset")
          Swal.fire({
            icon: 'success',
            title: `Check your email "${email}" for password reset`,
            text: 'See you soon!',
          })
          })
          .catch((error)=>{
            setLoading(false)
           toast.error(error.message,{
              position: toast.POSITION.TOP_CENTER
          })
          })
    }
  }


  return (
    <SoftBox p={2}>
    <center><img src={logo} className="App-logo" alt="logo" /></center>
    <center style={{fontWeight:'bold'}}>Reset Password Form!</center>
    <SoftBox component="form" role="form">
    <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Email
        </SoftTypography>
      </SoftBox>
      <SoftInput 
      value={email} onChange={e => setEmail(e.target.value)}
      type="email" placeholder="Enter your email" />
    </SoftBox>

    <SoftBox mt={4}>
      <SoftButton onClick={resetPasword} variant="gradient" color="info" fullWidth>
      {loading === true ?(
        <span><span style={{color:'#fff'}}>loading...<Spin size="middle" /></span></span>
      ):(
        <span>Send</span>
      )}
      </SoftButton>
    </SoftBox>
  </SoftBox>
    </SoftBox>
  )
}

export default ForgotPass