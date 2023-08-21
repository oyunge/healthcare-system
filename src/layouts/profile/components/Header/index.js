import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";
// Soft UI Dashboard React base styles
import breakpoints from "../../../../assets/theme/base/breakpoints";
import SoftButton from "../../../../soft-components/SoftButton";
import { Modal } from 'react-bootstrap'
import CloseIcon from '@mui/icons-material/Close';
import { MDBCardImage } from "mdb-react-ui-kit";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import PsychologyIcon from '@mui/icons-material/Psychology';
import Diagnosis from "./Diagnosis";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchDisease from "./Search-Desease";

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


function Header({ firstName, lastName, profilePhoto, isApproved, wpBuilder, spBuilder }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [name, setName] = useState('')
  const [modalShow, setModalShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenMenu(false)
  };
  const handleOpen = () => {
    setOpen(true);
    setOpenMenu(true)
  };

  const openModal = () => {
    setModalShow(true)
  }

  const closeModal = () => {
    setModalShow(false)
    handleOpen()
  }

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);
  
    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];
  
    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {
  
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);
  
        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;
  
             // Add the letter for the abbreviation
             number += abbrev[i];
  
             // We are done... stop
             break;
        }
    }
  
    return number;
  }


  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleLightboxClose = () => {
    setIsOpen(false);
  };

  return (
    <SoftBox position="relative">
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(https://www.shutterstock.com/shutterstock/photos/212251981/display_1500/stock-photo-modern-hospital-style-building-212251981.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "20%",
          overflow: "hidden",
          zIndex: -1,
          marginTop: -2,
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center" style={{
          
        }}>
          <Grid>
          <MDBCardImage src={profilePhoto}
          onClick={handleImageClick}
          alt={firstName} style={{ width:70, height:70, borderRadius:10, cursor: 'pointer', objectFit: 'cover', marginLeft:10, marginTop:10 }} fluid />

          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {firstName} {lastName}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid container justifyContent="flex-end" style={{
            marginTop:0,
            display:'flex',
            flexWrap:'wrap'
          }}>
        <SoftButton onClick={openModal} style={{backgroundColor:'#2152ff',color:'#fff',marginRight:5,marginTop:5}} variant="gradient">
        AI Diagnosis <PsychologyIcon fontSize="large"  style={{marginLeft:5}}/>
      </SoftButton>
          </Grid>
        </Grid>
      </Card>


      <Modal
      show={modalShow}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      // centered
      style={{
        zIndex:1500
      }}
    >
      <Modal.Header style={{
        display:'flex',
        justifyContent:'space-between',
        background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
        color:'#fff'
      }}>
        <Modal.Title id="contained-modal-title-vcenter">
          {name}
        </Modal.Title>
        <CloseIcon onClick={closeModal} fontSize="medium" style={{cursor:'pointer'}} />
      </Modal.Header>
      <Modal.Body
      style={{
        background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
      }}
      >
      <AppBar position="static">
        <Tabs
        style={{backgroundColor:'#fff'}}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Select Symptops" {...a11yProps(0)} />
          <Tab label="Type Symptoms" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Diagnosis />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SearchDisease />
        </TabPanel>
      </SwipeableViews>
       
      </Modal.Body>
    </Modal>

    {isOpen && (
      <Lightbox
      style={{zIndex: 9999}}
        mainSrc={profilePhoto}
        onCloseRequest={handleLightboxClose}
        imageCaption={`${firstName} ${lastName}`}
      />
    )}
    </SoftBox>
  );
}

export default Header;
