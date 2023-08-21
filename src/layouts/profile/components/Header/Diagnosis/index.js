import React, { useState } from 'react';
import { diseases } from '../../../../../assets/data';
import { Modal } from 'react-bootstrap';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { auth, db } from '../../../../../firebase';
import Swal from 'sweetalert2';
import ReactWhatsapp from 'react-whatsapp';

// Define a red icon for markers
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Diagnosis = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [price, setPrice] = React.useState('')
  const [preventation, setPreventation] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState()
  const [management, setManagement] = React.useState('')
  const [doctor, setDoctor] = React.useState('')


  React.useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
    });

    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);

  const handleCardClick = (diseaseName, recommend, pharmacy, price, preventation, management, doctor) => {
    setSelectedDisease(diseaseName);
    setRecommend(recommend);
    setPharmacy(pharmacy);
    setPreventation(preventation)
    setPrice(price)
    setManagement(management)
    setDoctor(doctor)
    setModalShow(true)
  };

  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const bookAppointment = () => {
    if (!appointmentBooked) {
      // Prevent further bookings
      setAppointmentBooked(true);

      // Your appointment booking logic here
      db.collection('appointments').add({
        // ... (appointment details)
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Appointment Progress',
          text: 'Appointment booked successfully',
          showConfirmButton: false,
          timer: 5000,
          customClass: {
            container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
          },
        });
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error booking appointment:', error);
      });
    } else {
      // Appointment already booked, show a message or handle accordingly
      Swal.fire({
        icon: 'info',
        title: 'Already Booked',
        text: 'You have already booked an appointment.',
        showConfirmButton: true,
        // ...
      });
    }
  };


  return (
    <div>
      <center>Choose your set symptomps</center>
      <div className="disease-cards">
        {diseases.map((disease, index) => (
          <div
            key={index}
            className={`disease-card ${selectedDisease === disease.name ? 'active' : ''}`}
            onClick={() => handleCardClick(disease.name, disease.recommendedMedicines, disease.pharmacy, disease.price, disease.preventation, disease.management, disease.doctor)}
          >
            {disease.symptoms.map((symptom, sIndex) => (
              <div key={sIndex} className="symptom">
                {symptom}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        style={{
          zIndex: 1500
        }}
      >
        <Modal.Body>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Disease</TableCell>
                  <TableCell>{selectedDisease}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Recomendation</TableCell>
                  <TableCell style={{ display: 'flex' }}>
                    {recommend?.map((recommend, index) => (
                      <div key={index}>
                        {recommend}&nbsp;
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell style={{ display: 'flex' }}>
                    {price}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Prevention</TableCell>
                  <TableCell style={{ display: 'flex' }}>
                    {preventation}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Management</TableCell>
                  <TableCell style={{ display: 'flex' }}>
                    {management}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Doctor</TableCell>
                  <TableCell style={{ display: 'flex' }}>
                    {doctor}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <center>
            <Button onClick={bookAppointment} variant='contained' disabled={appointmentBooked} style={{ color: '#fff' }}>Book Appointment</Button>
          </center>
          <center>
            <Button onClick={() => Swal.fire({
              icon: 'success',
              title: 'Medicine Order',
              text: 'You Have Ordered Your Medicine Sucessful',
              customClass: {
                container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
              },
            })} variant='outlined' style={{ marginTop: 8, color: '#17c1e8' }}>Order Medicine</Button>
          </center>
          <center>
            <Button>
              <ReactWhatsapp number="+254771912985" variant='outlined' style={{
                marginTop: 8,
                color: '#17c1e8',
                backgroundColor: 'white',
                border: '2px solid #17c1e8',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer'
              }} >Chatt Us Online</ReactWhatsapp>

            </Button>

          </center>
          <br />
          <center>Pharmacy: {pharmacy.name}</center>
          <MapContainer center={[-1.2921, 36.8219]} zoom={12} style={{ height: '250px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pharmacy && (
              <Marker position={pharmacy.location} icon={redIcon}>
                <Popup>{pharmacy.name}</Popup>
              </Marker>
            )}
          </MapContainer>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Diagnosis;
