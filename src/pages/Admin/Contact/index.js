import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {Button,Modal } from 'react-bootstrap';
import Allmembers from './Allcontacts';
import { auth, db } from '../../../firebase';
import SoftTypography from '../../../soft-components/SoftTypography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';

function Contact() {
  const [modalShow, setModalShow] = React.useState(false);
  const [posts1, setPosts1] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  
  // Fetch data from Firebase Firestore and update `posts1` state
  React.useEffect(() => {
    db.collection('contacts').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    });
  }, []);
  
  // Filter posts based on `searchTerm`
  React.useEffect(() => {
    if (posts1 !== undefined) {
      const finalPosts = posts1.filter((res) => {
        return res?.fullName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      setFilteredPosts(finalPosts);
    }
  }, [searchTerm, posts1]);
  
  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value);
  };

  
  return (
    <SoftTypography>
    <div>
    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search name..."
    />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>

    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    {auth?.currentUser?.uid &&(
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
    </IconButton>   
    )}   
  </Paper>  
  
  <Allmembers filteredPosts={filteredPosts} searchTerm={searchTerm}/>

  <Modal
  show={modalShow}
  style={{zIndex:2000}}
  onHide={() => setModalShow(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      Add Article
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
  </Modal.Body>
</Modal>
    </div>
    </SoftTypography>
  )
}

export default Contact