import { Grid } from '@mui/material'
import { MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import SoftInput from '../../../../../../soft-components/SoftInput'
import SoftButton from '../../../../../../soft-components/SoftButton'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../../../../../firebase'
import { toast } from 'react-toastify'

function Create({ spBuilder, wpBuilder, isApproved, userId }) {
  const [spBuilderLink, setSpBuilderLink] = React.useState(spBuilder)
  const [wpBuilderLink, setWpBuilderLink] = React.useState(wpBuilder)
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };


  const updateLinks = () => {
    handleOpenBackdrop()
    if(isApproved === false){
      toast.error('You have not approved this user yet',{
        position: 'top-center'
      })
      handleCloseBackdrop()
    }else{
      handleOpenBackdrop()
      db.collection('users').doc(userId).update({
        spBuilder: spBuilderLink,
        wpBuilder: wpBuilderLink
      }).then(() => {
        toast.success('Links Updated',{
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

  }

  return (
    <div>
    <MDBRow className="pt-1">
    <Grid item xs={12} sm={6}>
    <SoftInput 
    fullWidth
    value={wpBuilderLink}
    onChange={(e) => setWpBuilderLink(e.target.value)}
    placeholder="Wordpress Builder Link" />
  </Grid>
  <br />
  <hr />
  <Grid item xs={12} sm={6}>
  <SoftInput 
  fullWidth
  value={spBuilderLink}
  onChange={(e) => setSpBuilderLink(e.target.value)}
  placeholder="Sitepad Builder Link" />
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