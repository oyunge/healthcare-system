import React, { useEffect, useState } from 'react'
import SoftTypography from '../../soft-components/SoftTypography'
import Footer from '../../examples/Footer'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth,db } from '../../firebase'
import { Grid } from '@mui/material'
import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard'
import SoftBox from '../../soft-components/SoftBox'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// Data
import reportsBarChartData from "../../layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "../../layouts/dashboard/data/gradientLineChartData";
import typography from '../../assets/theme/base/typography'
import axios from 'axios'
import Header from '../../components/Header'
import Members from './Members'
import Contact from './Contact'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Admin() {
  const authId = useSelector((state) => state.authId)
  const history = useNavigate("")
  const dispatch = useDispatch();
  const [membersData, setMembers] = React.useState([])
  const [verifiedMembers, setVerifiedMembers] = React.useState([])
  const [unVerifiedMembers, setUnverifiedMembers] = React.useState([])
  const [contacts, setContacts] = React.useState([])
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const commaNumber = require('comma-number')



  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setMembers(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])
  React.useEffect(() => {
    db.collection('users').where('isApproved','==',true).onSnapshot((snapshot) => {
      setVerifiedMembers(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('users').where('isApproved','==',false).onSnapshot((snapshot) => {
      setUnverifiedMembers(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('contacts').onSnapshot((snapshot) => {
      setContacts(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])


const theme = useTheme();
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleChangeIndex = (index) => {
  setValue(index);
};

const date1 = new Date();

let day = date1.getDate();
let month = date1.getMonth() + 1;
let year = date1.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}/${month}/${year}`;

const date = new Date;
let hours = date.getHours();


const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [prevPage, setPrevPage] = useState(1);
const pageSize = 10; // Number of posts per page


let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");
  return (
    <div style={{padding:10}}>
    <Header />
    {authId === "X8sv18oDj6RZelzRrctZU8jGJ2E3" ?(
       <>
       <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:60}}>
       <div>
       <span style={{fontWeight:'bold'}}>{status}, Admin</span>
       </div>
       <div>
       <span style={{cursor:'pointer',fontWeight:'bold'}}>{currentDate}</span>
       </div>
       </div>
       <SoftTypography>
       <SoftBox py={3}>
       <SoftBox mb={3}>
         <Grid container spacing={1}>
           <Grid item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Total Members" }}
               count={commaNumber(membersData.length)}
               percentage={{ color: "success", text: "+55%" }}
               icon={{ color: "info", component: "group" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Verified Members" }}
               count={commaNumber(verifiedMembers.length)}
               percentage={{ color: "success", text: "+3%" }}
               icon={{ color: "info", component: "speaker" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Unverified Members" }}
               count={commaNumber(unVerifiedMembers.length)}
               percentage={{ color: "error", text: "-2%" }}
               icon={{ color: "info", component: "list_alt" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Contact Us" }}
               count={commaNumber(0)}
               percentage={{ color: "success", text: "+5%" }}
               icon={{
                 color: "info",
                 component: "assignment",
               }}
             />
           </Grid>
         </Grid>
       </SoftBox>
   
       <Box sx={{ bgcolor: 'background.paper' }}>
       <Members />
       </Box>
     </SoftBox>
       </SoftTypography>
       </>
    ):(
      <></>
    )}
    </div>
  )
}

export default Admin