import { Paper, Table, TableCell, TableContainer, TableHead, TableRow,TableBody, Typography } from '@mui/material'
import React from 'react'
import SoftTypography from '../../../../../soft-components/SoftTypography'


const GradientBorderTableCell = ({ children }) => {
  return (
    <TableCell style={{ position: 'relative', paddingBottom: '1px' }} align='center'>
      {children}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
        }}
      ></div>
    </TableCell>
  );
};

function Create({ wpBuilder, spBuilder }) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    {wpBuilder === '' && spBuilder === '' ?(
      <center>
      <Typography variant="h6" style={{textAlign:'center',marginTop:10,marginBottom:10}}>
      No Builder Links Found
    </Typography>
      </center>

    ):(
      <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
        <TableRow>
        <GradientBorderTableCell>
          <SoftTypography
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
            style={{ fontWeight: 'bold' }}
          >
            WordPress Builder Link
          </SoftTypography>
        </GradientBorderTableCell>
        <GradientBorderTableCell>
          <a href={wpBuilder} target='_blank' rel="noreferrer" style={{ textDecoration: 'none', color: '#000' }}>
            <SoftTypography
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{ fontWeight: 'bold' }}
            >
              Click Here
            </SoftTypography>
          </a>
        </GradientBorderTableCell>
      </TableRow>

            <TableRow>
            <GradientBorderTableCell>
            <SoftTypography
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
            style={{fontWeight:'bold'}}
          >
          Sitepad Builder Link
          </SoftTypography>
            </GradientBorderTableCell>
            <GradientBorderTableCell>
             <a href={spBuilder} target='_blank' rel="noreferrer" style={{textDecoration:'none',color:'#000'}}>
             <SoftTypography
             variant="button"
             color="info"
             fontWeight="medium"
             textGradient
             style={{fontWeight:'bold'}}
           >
            Click Here
           </SoftTypography>
             </a>
            </GradientBorderTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    )}

    </Paper>
  )
}

export default Create