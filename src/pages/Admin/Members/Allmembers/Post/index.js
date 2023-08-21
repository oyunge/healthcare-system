import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Avatar, Button, ImageListItem } from "@mui/material";
import { MDBCardImage } from "mdb-react-ui-kit";
import moment from "moment";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import { db } from "../../../../../firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { Modal } from 'react-bootstrap';
import Create from "./Create";
import Sell from "./Sell";


function Post({
  firstName,
  lastName,
  email,
  phone,
  profilePhoto,
  timestamp,
  isApproved,
  doctor,
  disease,
  appointmentId
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [name, setName] = useState('')
  const [modalShow, setModalShow] = React.useState(false);

  const updateStatus = () =>{
    db.collection('appointments').doc(`${appointmentId}`).update({
      isChecked: true
    }).then(()=>{
      toast.success(`Approved ${firstName} ${lastName} Successfully`,{
        position: toast.POSITION.TOP_CENTER
      
      })
    })
  }

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleLightboxClose = () => {
    setIsOpen(false);
  };
  var d = timestamp;
  //var d =val.timestamp;

  //NB: use + before variable name
  var date = new Date(+d);
  

  const openModal = (name) => {
    setName(name)
    setModalShow(true)
  }


  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <MDBCardImage
          src={profilePhoto}
          alt={firstName}
          onClick={handleImageClick}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            cursor: "pointer",
            objectFit: "cover",
          }}
          fluid
        />
      </TableCell>
      <TableCell align="right">{firstName}</TableCell>
      <TableCell align="right">{lastName}</TableCell>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right">{phone}</TableCell>
      <TableCell align="right">{disease}</TableCell>
      <TableCell align="right">{doctor}</TableCell>
      <TableCell align="right">{isApproved === true ? <span style={{color:'#00D100', fontWeight:'bold'}}>Approved</span>: <span style={{fontWeight:'bold',color:'#FF5C5C',cursor:'pointer'}} onClick={updateStatus}>Pending</span>}</TableCell>
      <TableCell align="right">{date.toDateString()}</TableCell>

      {isOpen && (
        <Lightbox
        style={{zIndex: 9999}}
          mainSrc={profilePhoto}
          onCloseRequest={handleLightboxClose}
          imageCaption={`${firstName} ${lastName}`}
        />
      )}

      <Backdrop
      sx={{ color: '#fff', zIndex: 1502 }}
      open={openBackdrop}
      onClick={handleCloseBackdrop}
    >
      Processing...<CircularProgress color="inherit" />
    </Backdrop>

    </TableRow>
  );
}

export default Post;
