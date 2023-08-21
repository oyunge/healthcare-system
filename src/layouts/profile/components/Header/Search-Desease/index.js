import React, { useState } from 'react';
import { diseases } from '../../../../../assets/data';
import { Modal } from 'react-bootstrap';
import { Button, Divider, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { auth, db } from '../../../../../firebase';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';



// Define a red icon for markers
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


function SearchDisease() {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [price, setPrice] = React.useState('')
  const [preventation, setPreventation] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState()
  const [inputSymptoms, setInputSymptoms] = useState('');
  const [matchedDisease, setMatchedDisease] = useState(null);

  const handleInputChange = (event) => {
    setInputSymptoms(event.target.value);
  };

  const handleCheckSymptoms = () => {
    const matched = findMatchingDisease(inputSymptoms);
    setMatchedDisease(matched);
  };

  const findMatchingDisease = (inputSymptoms) => {
    const inputSymptomsArray = inputSymptoms.toLowerCase().split(',');

    let bestMatch = null;
    let bestMatchScore = 0;

    for (const disease of diseases) {
      const diseaseSymptoms = disease.symptoms.map(symptom => symptom.toLowerCase());
      const matchingSymptoms = diseaseSymptoms.filter(symptom =>
        inputSymptomsArray.includes(symptom)
      );

      const matchingScore = matchingSymptoms.length / diseaseSymptoms.length;

      if (matchingScore > bestMatchScore) {
        bestMatchScore = matchingScore;
        bestMatch = disease;
      }
    }

    return bestMatch;
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

  const handleCardClick = (diseaseName, recommend, pharmacy, price, preventation) => {
    setSelectedDisease(diseaseName);
    setRecommend(recommend);
    setPharmacy(pharmacy);
    setPreventation(preventation)
    setPrice(price)
    setModalShow(true)
  };

  const bookAppointment = () => {
    db.collection('appointments').add({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      phoneNumber: currentUser?.phone,
      profilePhoto: currentUser?.profilePhoto,
      disease: matchedDisease?.name,
      doctor: matchedDisease?.doctor,
      userId: auth?.currentUser?.uid,
      timestamp: Date.now(),
      isChecked: false
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
        })
      })
  }
  return (
    <div>
      <Paper
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Type Symptoms"
          value={inputSymptoms}
          onChange={handleInputChange}
        />
        <button onClick={handleCheckSymptoms}>Check Symptoms</button>
      </Paper>

      <TableContainer style={{ marginTop: 10 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Disease</TableCell>
              <TableCell>{matchedDisease?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Recomendation</TableCell>
              <TableCell style={{ display: 'flex' }}>
                {matchedDisease?.recommendedMedicines?.join(', ')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Prevantion</TableCell>
              <TableCell style={{ display: 'flex' }}>
                {matchedDisease?.preventation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell style={{ display: 'flex' }}>
                {matchedDisease?.price}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Management</TableCell>
              <TableCell style={{ display: 'flex' }}>
                {matchedDisease?.management}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Doctor</TableCell>
              <TableCell style={{ display: 'flex' }}>
                {matchedDisease?.doctor}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <center>
        <Button onClick={bookAppointment} variant='contained' style={{ color: '#fff' }}>Book Appointment</Button>
      </center>
      <center>
        <Button onClick={() => Swal.fire({
          icon: 'success',
          title: 'Order Medicine',
          text: 'Medicine ordered successfully',
          customClass: {
            container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
          },
        })} variant='outlined' style={{ marginTop: 8, color: '#17c1e8' }}>Order Medicine</Button>
      </center>

      <br />
      <center>Pharmacy: {matchedDisease?.pharmacy?.name}</center>
      <MapContainer center={[-1.2921, 36.8219]} zoom={12} style={{ height: '250px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {matchedDisease?.pharmacy && (
          <Marker position={matchedDisease?.pharmacy?.location} icon={redIcon}>
            <Popup>{matchedDisease?.pharmacy?.name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default SearchDisease