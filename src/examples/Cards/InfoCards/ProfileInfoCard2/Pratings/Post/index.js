import React from 'react'
import { Avatar, Comment, Tooltip } from 'antd';
import { Box, Rating } from '@mui/material';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import SoftButton from '../../../../../../soft-components/SoftButton';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';
import { db } from '../../../../../../firebase';


const labels = {
    0.5: 'Useless | 0.5',
    1: 'Useless+  | 1',
    1.5: 'Poor  | 1.5',
    2: 'Poor+ | 2',
    2.5: 'Ok  | 2.5',
    3: 'Ok+ | 3',
    3.5: 'Good | 3.5',
    4: 'Good+ | 4',
    4.5: 'Excellent | 4.5',
    5: 'Excellent+ | 5',
  };
  
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  

function Post({ index, link, rate, timestamp, userId, isApproved}) {
    const [modalShow, setModalShow] = React.useState(false);
    const [value1, setValue1] = React.useState(rate);
    const [hover, setHover] = React.useState(-1);
    const [value, setValue] = React.useState(0);

    const actions = [
        <Tooltip key="comment-basic-dislike">
           <span><Rating name="half-rating-read" value={rate} precision={0.5} readOnly/></span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike">
        <span>{rate}/5</span>
     </Tooltip>
      ];

      var d = timestamp;
      //var d =val.timestamp;
      
      //NB: use + before variable name
      var date = new Date(+d);


      const adminRateFun = async() => {
         if(isApproved === false){
            toast.error('You have not approved this user yet',{
                position: 'top-center'
            })
         }else{
            if(value1 === 0){
                toast.error('Please select a rating',{
                    position: 'top-center'
                })
         }else{
            try {
                const userRef = db.collection('users').doc(userId);
          
                // Get the user document from Firestore
                const userSnapshot = await userRef.get();
                if (userSnapshot.exists) {
                  // Get the pWorks array from the user document
                  const pWorks = userSnapshot.get('pWorks');
          
                  // Check if the pWorks array is valid and has an image at index 1
                  if (Array.isArray(pWorks) && pWorks.length >= 2) {
                    // Update the rate of the image at index 1
                    pWorks[index].rate = value1; // Set the new rate value here (e.g., 5)
          
                    // Update the user document with the updated pWorks array
                    await userRef.update({ pWorks });
          
                    toast.success('Rate updated successfully',{
                        position: 'top-center'
                    })
                  } else {
                    toast.error('User document is invalid or has no pWorks array',{
                        position: 'top-center'
                    })
                  }
                } else {
                    toast.error('User document not found',{
                        position: 'top-center'
                    })
                }
              } catch (error) {
                toast.error('Error updating rate: '+error,{
                    position: 'top-center'
                })
              }
         }
      }
    }

  return (
    <div style={{
        display:'flex',
    }}>
    <span style={{
        marginRight:5,
        marginTop:13,
        fontSize:14
    }}>{index+1}.</span>
    <Comment
actions={actions}
content={
    <a href={link} target="_blank" rel="noreferrer">
    {link}
    </a>
  }
datetime={
  <Tooltip title={`${date}`}>
    <span>{moment(timestamp).fromNow()}</span>
  </Tooltip>
}
/>

<Modal show={modalShow} onHide={() => setModalShow(false)} 
style={{
    zIndex:2000
}}
>
        <Modal.Header
        style={{
            background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
            color:'#fff'
        }}
        closeButton>
            <Modal.Title>Link {index+1} - Page Layer</Modal.Title>
        </Modal.Header>
        <Modal.Body
        style={{
            background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
            height:'auto',
            overflowY:'auto'
        }}
        >
          <center>
          <Box
          sx={{
            display: 'table',
            margin: 'auto',
          }}
        >
          <Rating
            name="hover-feedback"
            value={value1}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue1(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <center>
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value1]}</Box>
          )}
          </center>
        </Box>
          
          </center>

          <SoftButton
          fullWidth
            onClick={adminRateFun}
          >
          Rate
          </SoftButton>
          
        </Modal.Body>
</Modal>
    </div>
  )
}

export default Post