import { useEffect, useState } from "react";

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
import { TextField } from "@mui/material";
import swal from "@sweetalert/with-react";
import Swal from "sweetalert2";



function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const handleSetAgremment = () => setAgremment(!agreement);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [idNo, setIdNo] = useState('')
  const [country, setCountry] = useState('')
  const [institution, setInstitution] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [countryCode, setCountryCode] = useState('')
  const history = useNavigate("");
  const dispatch = useDispatch();

  const handleChangeInstitution = (event) => {
    setInstitution(event.target.value);
  };


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

const completeRegistration = () => {
  setLoading(true)

  if(!firstName){
    toast.error('First Name is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!lastName){
    toast.error('Last Name is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!email){
    toast.error('E-mail is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!phone){
    toast.error('Phone No. is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!password){
    toast.error('Password is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!cPassword){
    toast.error('Confirm Password is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(password.length <8){
    toast.error('Password must have atleast 8 characters!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(cPassword !== password){
    toast.error("Passwords don't match each other!", {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else{

              db.collection('users').where("email", "==", email).get().then((resultSnapShot) => {

                  // resultSnapShot is an array of docs where "email" === "user_mail"
          
                  if (resultSnapShot.size == 0) {                      
                        auth
                        .createUserWithEmailAndPassword(email, password)
                        .then((auth) => {
                            if (auth.user) {
                                auth.user.updateProfile({
                                    photoURL: "https://firebasestorage.googleapis.com/v0/b/uon-foe.appspot.com/o/profile-photos%2Fmale.png?alt=media&token=87975cfa-98e0-4350-bbe5-ec68d547b59d",
                                }).then((s) => {

                                    db.collection('users').doc(auth.user.uid).set({
                                        uid: auth.user.uid,
                                        firstName,
                                        lastName,
                                        phone,
                                        email,
                                        profilePhoto: "https://firebasestorage.googleapis.com/v0/b/uon-foe.appspot.com/o/profile-photos%2Fmale.png?alt=media&token=87975cfa-98e0-4350-bbe5-ec68d547b59d",
                                        bio:"",
                                        isApproved:false,
                                        timestamp: Date.now(),
                                    }).then((r) => {
                                          setLoading(false)
                                          Swal.fire({
                                            icon: 'success',
                                            title: 'Successfully created Health Care System Account.\n',
                                            text: '\nThank you!',
                                          });
                                          history('/');
                                        })
                                })
                            }
                        })
                        .catch((e) => {
                                toast.error(e.message, {
                                  position: toast.POSITION.TOP_CENTER
                              })
                                setLoading(false)
                        });
          
                  } else {
                      //Already registered
                      setLoading(false)
                      toast.error("The email you enterd already in use!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                  }
          
              })
  
  }
}

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image="https://cdn.pixabay.com/photo/2016/11/08/05/29/surgery-1807541_1280.jpg"
    >
    <Card>
    <SoftBox p={3} mb={1} textAlign="center">
    <SoftTypography variant="h5" fontWeight="medium">
      Sign Up Here!
    </SoftTypography>
  </SoftBox>
    {/* <Separator /> */}
    <SoftBox pt={0} pb={3} px={3}>
      <SoftBox component="form" role="form">
        <SoftBox style={{display:'flex'}} mb={2}>
          <SoftInput style={{marginRight:3}}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name" />
          <SoftInput style={{marginLeft:3}} 
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name" />
        </SoftBox>
        <SoftBox mb={1} style={{display:'flex'}}>
          <SoftInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
          <SoftInput style={{marginRight:3}} 
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone No." />
          </SoftBox>
    <SoftBox style={{display:'flex'}} mb={1}>
    <SoftInput style={{marginRight:3}}
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    placeholder="Password" />
    <SoftInput style={{marginLeft:3}}
    value={cPassword}
    type="password"
    onChange={e => setCPassword(e.target.value)}
    placeholder="Confirm Password" />
  </SoftBox>

        <SoftBox mt={2} mb={1}>
          <SoftButton style={{backgroundColor:'#2152ff',color:'#fff'}} onClick={completeRegistration} variant="gradient" color="info" fullWidth>
          {loading === true ?(
            <span><span style={{color:'#fff'}}>signing up...<Spin size="middle" /></span></span>
          ):(
            <span>Sign Up</span>
          )}
          </SoftButton>

          <SoftBox mt={2} textAlign="center">
          <Link to="/login">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{cursor:'pointer'}}
            >
              Do have an account?
            </SoftTypography>
          </SoftTypography>
          </Link>
        </SoftBox>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  </Card>
    </BasicLayout>
  );
}

export default SignUp;
