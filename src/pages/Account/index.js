import React, { useEffect, useState } from 'react'
import SoftTypography from '../../soft-components/SoftTypography'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import { useSelector } from 'react-redux'
import { auth, db } from '../../firebase'
import "./styles.css"
import Header from '../../components/Header'
import ProfileInfoCard from '../../examples/Cards/InfoCards/ProfileInfoCard'
import ProfileInfoCard2 from '../../examples/Cards/InfoCards/ProfileInfoCard2'
import { Grid } from '@mui/material'
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ReportIcon from '@mui/icons-material/Report';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import Footer from '../../examples/Footer'
import Header1 from '../../layouts/profile/components/Header'


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

function Account() {
  const authId = useSelector((state) => state.authId);
  const [currentUser, setCurrentUser] = useState()
  const [countArtcles, setCountArticles] = useState(0)


  React.useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
    });
  
    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);

React.useEffect(() => {
  db.collection('articles').where("ownerId","==",authId)
 .onSnapshot(snapshot => (
  setCountArticles(snapshot.docs.length)
 ))
}, []);



const [data, setData] = React.useState([])
React.useEffect(() => {
  db.collection('articles').where("ownerId","==",authId).limit(4).onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
  })
})


const bioStatus = currentUser?.bio === "" ? "Add Bio" : currentUser?.bio

// P Rating
const PtotalRatings = (currentUser?.pWorks?.reduce((a,v) =>  a = a + v.rate , 0 ))
const PnumberOfRatings = currentUser?.pWorks?.length
const Prating = PtotalRatings / PnumberOfRatings
var pRate = Math.round(Prating * 10) / 10
var pTotal = currentUser?.pWorks?.length


// MC Rating
const MctotalRatings = (currentUser?.mcworks?.reduce((a,v) =>  a = a + v.rate , 0 ))
const McnumberOfRatings = currentUser?.mcworks?.length
const Mcrating = MctotalRatings / McnumberOfRatings
var McRate = Math.round(Mcrating * 10) / 10
var McTotal = currentUser?.mcworks?.length


// DV Rating
const dVtotalRatings = (currentUser?.diviworks?.reduce((a,v) =>  a = a + v.rate , 0 ))
const dVnumberOfRatings = currentUser?.diviworks?.length
const dVrating = dVtotalRatings / dVnumberOfRatings
var dVRate = Math.round(dVrating * 10) / 10
var dVTotal = currentUser?.diviworks?.length

  return (
    <SoftTypography>
      <Header1 countArtcles={countArtcles} firstName={currentUser?.firstName} lastName={currentUser?.lastName} profilePhoto={currentUser?.profilePhoto} isApproved={currentUser?.isApproved} wpBuilder={currentUser?.wpBuilder} spBuilder={currentUser?.spBuilder}/>
      <Box>
      <Grid container spacing={1}>
      <Grid item xs={12} md={6} xl={6}>
      <ProfileInfoCard
        title="profile Info."
        description={bioStatus}
        info={{
          firstName: `${currentUser?.firstName}`,
          lastName: ` ${currentUser?.lastName}`,
          mobile: `${currentUser?.phone}`,
          email: `${currentUser?.email}`,
        }}
        social={[
          {
            link: "#",
            icon: <FacebookIcon />,
            color: "facebook",
          },
          {
            link: "#",
            icon: <TwitterIcon />,
            color: "twitter",
          },
          {
            link: "#",
            icon: <InstagramIcon />,
            color: "instagram",
          },
        ]}
        action={{ route: "", tooltip: "Edit Profile" }}
      />
    </Grid>
    <Grid item xs={12} md={6} xl={6}>
    <ProfileInfoCard2
      title="Hospitals Near You!"
      description={`Here you find summary of your account rating status from admin.`}
      info={{
        year: `${currentUser?.yos}`,
        Gender: `${currentUser?.gender}`,
        country: `${currentUser?.country}`,
        student: `${currentUser?.student}`,
      }}
      action={{ route: "", tooltip: "Edit Profile" }}
      pRate={pRate}
      McRate={McRate}
      dVRate={dVRate}
      pTotal={pTotal}
      McTotal={McTotal}
      dVTotal={dVTotal}

      isApproved={currentUser?.isApproved}
      pWorks={currentUser?.pWorks}
      mcworks={currentUser?.mcworks}
      diviworks={currentUser?.diviworks}
    />
  </Grid>
      </Grid>
    </Box>
    <Footer/>
    </SoftTypography>
  )
}

export default Account