import { Grid } from '@mui/material'
import { MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import SoftInput from '../../../../soft-components/SoftInput'
import SoftButton from '../../../../soft-components/SoftButton'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../../../firebase'
import { toast } from 'react-toastify'
import { Label } from '@mui/icons-material'

function Create({ tuesLink, wedLink }) {
  const [spBuilderLink, setSpBuilderLink] = React.useState(tuesLink)
  const [wpBuilderLink, setWpBuilderLink] = React.useState(wedLink)
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };


  const updateLinks = () => {
    handleOpenBackdrop()

      db.collection('links').doc('UPcDVs9bv8tz9OmDJe1l').update({
        tues: spBuilderLink,
        wed: wpBuilderLink
      }).then(() => {
        toast.success('Links Updated!',{
          position: 'top-center'
        })
        handleCloseBackdrop()
      }).catch((err) => {
        toast.error(err.message,{
          position: 'top-center'
        })
        handleCloseBackdrop()
      })
    

  }

  return (
    <div>
    <MDBRow className="pt-1">
    <Grid item xs={12} sm={6}>
    <label style={{fontWeight:'bold',color:'#fff'}}>Tue, 5pm - 6pm (E.A.T) Link</label>
    <SoftInput 
    fullWidth
    value={spBuilderLink}
    onChange={(e) => setSpBuilderLink(e.target.value)}
    placeholder="Tue, 5pm - 6pm (E.A.T) Link!" />
  </Grid>
  <Grid style={{marginTop:15}} item xs={12} sm={6}>
  <label style={{fontWeight:'bold',color:'#fff'}}>Wed, 5pm - 6pm (E.A.T) Link</label>
  <SoftInput 
  fullWidth
  value={wpBuilderLink}
  onChange={(e) => setWpBuilderLink(e.target.value)}
  placeholder="Wed, 5pm - 6pm (E.A.T) Link" />
  </Grid>
  </MDBRow>

  <center style={{
    marginTop:10
  }}>
  <SoftButton
  component="a"
  target="_blank"
  rel="noreferrer"
  fullWidth
  onClick={updateLinks}
>
Update Links
</SoftButton>
  </center>

  <Backdrop
  sx={{ color: '#fff', zIndex: 1502 }}
  open={openBackdrop}
  onClick={handleCloseBackdrop}
>
  Processing...<CircularProgress color="inherit" />
</Backdrop>
    </div>
  )
}

export default Create