import { TableCell, TableRow } from '@mui/material'
import React from 'react'

function Post({ doctor, disease, isChecked, timestamp}) {
    var d = timestamp;
    //var d =val.timestamp;
  
    //NB: use + before variable name
    var date = new Date(+d);
    
  return (
    <TableRow>
    <TableCell >{disease}</TableCell>
      <TableCell align="right">{doctor}</TableCell>        
        <TableCell align="right">{isChecked === true ? <span style={{color:'#00D100', fontWeight:'bold'}}>Approved</span>: <span style={{fontWeight:'bold',color:'#FF5C5C'}}>Pending</span>}</TableCell>
        <TableCell align="right">{date.toDateString()}</TableCell>
    </TableRow>
  )
}

export default Post