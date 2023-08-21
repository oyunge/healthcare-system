import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../../assets/images/logos/logo1.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth, db } from '../../firebase';
import { Avatar, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { updateAuthId } from '../../redux/dataSlice';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { MDBCardImage } from 'mdb-react-ui-kit';
import { deepOrange } from '@mui/material/colors';


export default function Header() {
  const authId = useSelector((state) => state.authId);
  const [currentUser, setCurrentUser] = React.useState(``)
  const history = useNavigate()
  const dispatch = useDispatch();
  const [modalShowAbout, setModalShowAbout] = React.useState(false);


  React.useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
    });

    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);



  const logout = () => {
    auth.signOut();
    dispatch(updateAuthId(''))
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully',
      text: 'See you soon!',
    })
    history('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
          zIndex: 1500,
          position: 'fixed', // Make the header fixed
          top: 0, // Distance from the top of the viewport
          width: '100%', // Set the width to take the full viewport width
        }}
      >
        <Toolbar>
          <Link to='/'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={logo} className="App-logo" alt="logo" />
            </IconButton>
          </Link>
          <Typography style={{
            display: 'flex',
            alignItems: 'center',
          }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button style={{
              fontWeight: "bold",
              color: '#fff'
            }} variant='outlined' onClick={() => setModalShowAbout(true)}>About</Button>

          </Typography>
          {authId ? (
            <>
              {authId === 'X8sv18oDj6RZelzRrctZU8jGJ2E3' ? (
                <Avatar style={{ cursor: 'pointer' }} onClick={logout}>AD</Avatar>
              ) : (
                <Tooltip title="Logout">
                  <MDBCardImage onClick={logout} src={currentUser?.profilePhoto}
                    alt={currentUser?.firstName} style={{ width: 40, height: 40, borderRadius: 40 / 2, cursor: 'pointer', objectFit: 'cover' }} fluid />
                </Tooltip>
              )}
            </>
          ) : (
            <Link to='/register'>
              <Button style={{
                fontWeight: "bold",
                color: '#fff'
              }} variant='outlined'>Register</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>


      <Modal
        show={modalShowAbout}
        onHide={() => setModalShowAbout(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
          zIndex: 1500
        }}
      >
        <Modal.Header
          style={{
            background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Health Care System
          </Modal.Title>
          <CloseIcon onClick={() => setModalShowAbout(false)} fontSize="medium" style={{ cursor: 'pointer' }} />
        </Modal.Header>
        <Modal.Body
          style={{
            background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
            color: '#fff'
          }}
        >
          <center><i style={{ fontWeight: 'bold' }}>About</i></center>
          <hr />
          <Typography variant="body2" color="text.secondary">
            This is a simple web application that allows users to register and login to their accounts, if you are feeling sick you can type your symptoms and get a diagnosis from the system from there we recommend you to a pharmacy and Hospital.
          </Typography>
        </Modal.Body>
      </Modal>

    </Box>
  );
}