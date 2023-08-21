/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import React, { useEffect, useState } from "react";
// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "../../../../assets/theme/base/colors";
import typography from "../../../../assets/theme/base/typography";
import { Button, Form, Modal } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import SoftButton from "../../../../soft-components/SoftButton";
import { FormControl, Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import SoftInput from "../../../../soft-components/SoftInput";
import { useSelector } from "react-redux";
import { auth, db, storage } from "../../../../firebase";
import Swal from "sweetalert2";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Input } from "antd";
import Post from "./Post";

const TextArea = Input.TextArea;


function ProfileInfoCard({ title, description, info, social, action }) {
  const [modalShow, setModalShow] = React.useState(false);
  const authId = useSelector((state) => state.authId);
  const [currentUser, setCurrentUser] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [institution, setInstitution] = useState('')
  const [mobile, setMobile] = useState('')
  const [bio, setBio] = useState('')
  const [show, setShow] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = React.useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const pageSize = 5; // Number of posts per page

   React.useEffect(() => {
       db.collection('appointments').where("userId", "==", `${auth?.currentUser?.uid}`).onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({
               id: doc.id,
               post: doc.data(),
           })));
       })
   }, []);

// Calculate the total number of pages based on the posts array length and page size
const totalPages = Math.ceil(posts.length / pageSize);

// Handle page change
const handlePageChange = (event, page) => {
  setCurrentPage(page);
};

// Get the posts for the current page
const getCurrentPosts = () => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return posts.slice(startIndex, endIndex);
};

useEffect(() => {
  // Save the current page before updating the data
  setPrevPage(currentPage);
}, [posts]);

useEffect(() => {
  // Set the current page back to its previous value after data update
  setCurrentPage(prevPage);
}, [prevPage]);


  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleOpenBackdrop = () => {
    setOpen(true);
  };


  const handleChangeInstitution = (event) => {
    setInstitution(event.target.value);
  };

  React.useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
    });
  
    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);


  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  const openModalFun = (firstName, lastName, institution, mobile, bio) => {
    setModalShow(true);
    setFirstName(firstName)
    setLastName(lastName)
    setInstitution(institution)
    setMobile(mobile)
    setBio(bio)
  }

  const handleClose = () => {
    setShow(false);
    setProfilePhoto(null);
    setPreviewImage(null);
  };

  const handleShow = () => setShow(true);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePhotoUpload = () => {
    handleOpenBackdrop()
    const storageRef = storage.ref(`profile_photos/${authId}`);
    const uploadTask = storageRef.put(profilePhoto);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Profile photo updated',
          text: `Error uploading profile photo:', ${error}`,
          customClass: {
            container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
          }
        })
        handleCloseBackdrop()
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection('users').doc(authId).update({ profilePhoto: downloadURL });
          handleClose();
          handleCloseBackdrop()
          Swal.fire({
            icon: 'success',
            title: 'Profile photo updated',
            text: 'Your profile photo has been updated successfully!',
            customClass: {
              container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
            }
          })
        })
      }
    );
  };

  const UpdateProfile = () => {
     handleOpenBackdrop()
     
    db.collection('users').doc(authId).update({ firstName: firstName, lastName: lastName, institution: institution, phone: mobile, bio: bio })
    .then(() => {
      handleCloseBackdrop()
      Swal.fire({
        icon: 'success',
        title: 'Profile updated',
        text: 'Your profile has been updated successfully!',
        customClass: {
          container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
        }
      })
    }).catch((error) => {
      handleCloseBackdrop()
      Swal.fire({
        icon: 'error',
        title: 'Profile not updated',
        text: `Error updating profile:', ${error}`,
        customClass: {
          container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
        }
      })
    })
  };

  const requestAccountDelete = () =>{
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are about to delete your account. This action cannot be undone!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleOpenBackdrop();

        db.collection('users')
          .doc(authId)
          .update({ requestDelete: true })
          .then(() => {
            handleCloseBackdrop();
            Swal.fire({
              icon: 'success',
              title: 'Account Deletion Request',
              text: 'Your request has been sent to the admin and shall be reviewed within 24 hrs!',
              customClass: {
                container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
              },
            });
          })
          .catch((error) => {
            handleCloseBackdrop();
            Swal.fire({
              icon: 'error',
              title: 'Account Deletion Request',
              text: 'Error during sending of your request. Please try again later!',
              customClass: {
                container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
              },
            });
          });
      }
    });
  }

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <SoftBox key={label} display="flex" py={1} pr={2}>
      <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </SoftTypography>
      <SoftTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </SoftTypography>
    </SoftBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <SoftBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </SoftBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Appointment History
        </SoftTypography>
        <SoftTypography component={Link} to={action.route} variant="body2" color="secondary">
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
      <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
          <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}}>DISEASE</TableCell>
          <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">DOCTOR</TableCell>
          <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">STATUS</TableCell>
          <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">DATE OF APPOINTMENT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       {
        posts?.length > 0 ? (
          getCurrentPosts().map(({id, post}) => (
            <Post
            key={id} 
            doctor={post.doctor}
            disease={post.disease}
            isChecked={post.isChecked}
            timestamp={post.timestamp}
            />
          ))
        ) : (
          <div style={{ display: 'table', margin: 'auto', fontSize: 18, fontWeight: 'bold' }}>No Appointment.</div>
        )
       }
      </TableBody>
      </Table>
    </TableContainer>
      </SoftBox>

    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
