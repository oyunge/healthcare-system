import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import { db } from "../../../../../firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import { Modal } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Typography } from "@mui/material";


function Post({
  id,
  fullName,
  email,
  phone,
  message,
  readStatus,
  timestamp,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [name, setName] = useState('')
  const [modalShow, setModalShow] = React.useState(false);

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

  const setTReadToTrue = () => {
     
    db.collection('contacts').doc(id).update({
      isRead:true
    })
}

  const openModal = () => {
    setModalShow(true)
    setTReadToTrue()
  }

  const deleteContact = () =>{
    // Show a confirmation dialog before deleting the user
    const confirmed = window.confirm(`Are you sure you want to delete contact row for ${fullName}?`);
    if (confirmed) {
      // User confirmed the deletion, proceed with the delete operation
      handleOpenBackdrop(); // Show the backdrop or loading spinner if needed

      // Perform the user deletion from Firestore
      db.collection('contacts')
        .doc(id)
        .delete()
        .then(() => {
          toast.success(`${fullName} contact row has been deleted`, {
            position: 'top-center',
          });
          handleCloseBackdrop(); // Close the backdrop or loading spinner if needed
        })
        .catch((err) => {
          toast.error(`Failed to delete ${fullName} contact row`, {
            position: 'top-center',
          });
          handleCloseBackdrop(); // Close the backdrop or loading spinner if needed
        });
    }
    
  }

  const paragraphStyle = {
    marginBottom: '1.5em' // Adjust the spacing as needed
  };

  const paragraphs = message?.split('\n').map((paragraph, index) => (
    <p key={index} style={paragraphStyle}>{paragraph}</p>
  ));
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{fullName}</TableCell>
      <TableCell align="right">
      <a style={{textDecoration:'none'}} href={`mailto:${email}`}>{email}</a>
      </TableCell>
      <TableCell align="right">
      <a style={{textDecoration:'none'}} href={`tel:${phone}`}>{phone}</a>
      </TableCell>
      <TableCell align="right"><RemoveRedEyeIcon onClick={openModal}  fontSize="medium" style={{cursor:'pointer',color:'#2a68af'}}/></TableCell>
      <TableCell align="right">
        {readStatus === true ? (
          <span style={{
            color:'#00D100',
            fontWeight:'bold',
            fontSize:15,
            padding:5,
            backgroundColor:'#D1D1D1',
            borderRadius:8,
          }}
          >read</span>
        ):(
           <span
           style={{
              color:'#FF5C5C',
              fontWeight:'bold',
              fontSize:15,
              padding:5,
              backgroundColor:'#D1D1D1',
              borderRadius:8,
           }}
           >unread</span>
        )}
      </TableCell>
      <TableCell align="right">{date.toDateString()}</TableCell>
      <TableCell align="right"><DeleteForeverIcon fontSize="medium" onClick={deleteContact}  style={{color:'#2a68af',cursor:'pointer'}}/></TableCell>


      <Backdrop
      sx={{ color: '#fff', zIndex: 1502 }}
      open={openBackdrop}
      onClick={handleCloseBackdrop}
    >
      Processing...<CircularProgress color="inherit" />
    </Backdrop>



    <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header
    style={{
      display:'flex',
      justifyContent:'space-between',
      background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
      color:'#fff'
    }}
    >
      <Modal.Title id="contained-modal-title-vcenter">
        Message - {fullName}
      </Modal.Title>
      <ClearIcon onClick={() => setModalShow(false)} fontSize="medium" style={{cursor:'pointer'}} />
    </Modal.Header>
    <Modal.Body
    style={{
      background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
      height:'auto',
      overflowY:'auto'
    }}
    >
    <Typography style={{color:'wheat'}}>
      {paragraphs}
    </Typography>
    </Modal.Body>
  </Modal>
    </TableRow>
  );
}

export default Post;
