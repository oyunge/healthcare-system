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
import React from 'react'
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from "react-redux";
import { pharmacies } from "../../../../assets/data";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define a red icon for markers
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


function ProfileInfoCard2({ title, description, action, pRate, McRate, dVRate, pTotal, McTotal, dVTotal, pWorks, diviworks, mcworks, isApproved }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [name, setName] = React.useState('');
    const authId = useSelector(state => state.authId);

    const openModal = (name) => {
      setModalShow(true);
      setName(name)
    }
 
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography component={Link} to={action.route} variant="body2" color="secondary">

        </SoftTypography>
      </SoftBox>
       <SoftBox p={2}>
       <MapContainer center={[-1.2921, 36.8219]} zoom={12} style={{ height: '250px', width: '100%' }}>
       <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       />
       {pharmacies.map((pharmacy, index) => (
         <Marker key={index} position={pharmacy.location} icon={redIcon}>
           <Popup>{pharmacy.name}</Popup>
         </Marker>
       ))}
     </MapContainer>
       </SoftBox>
      
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard2.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard2;
