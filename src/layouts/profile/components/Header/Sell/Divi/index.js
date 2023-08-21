import React from 'react'
import SoftButton from '../../../../../../soft-components/SoftButton'
import { CardContent, Collapse, Paper, TextField } from '@mui/material';
import Styles from '../Styles';
import { Input } from 'antd';
import { auth, db } from '../../../../../../firebase';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const { TextArea } = Input;

function Div() {
  const [expanded, setExpanded] = React.useState(false);
  const classes = Styles();
  const [link, setLink] = React.useState('');
  const authId = useSelector(state => state.authId);
  const [loading, setLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
      const unsub = auth?.onAuthStateChanged((user) => {
        db.collection('users').doc(`${authId}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
      });
    
      // Clean up the listener when the component unmounts
      return () => unsub();
    }, []);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleSubmit = async () => {

      if(currentUser?.isApproved === false){
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You are not verified to sell!',
              customClass: {
                container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
              },
            });
            setExpanded(!expanded);
      }else{
          setLoading(true);
          const collectionRef = db.collection('users');
          const docRef = collectionRef.doc(`${authId}`);
           // Fetch the existing document data
          const docSnapshot = await docRef.get();
          const data = docSnapshot.data();
  
          if(!link){
              toast.error('Please paste a link',{
                  position: 'top-center'
              });
              setLoading(false);
          }else{
              setLoading(true)
              try {
                  // Create a new element to add to the 'pWorks' array
                  const newElement = {
                    link: link,
                    rate: 0,
                    timestamp: Date.now(),
                  };
          
                  // Update the 'pWorks' array by adding the new element
                  const updatedPWorks = [...data.diviworks, newElement];
          
                  // Update the document with the modified 'pWorks' array
                  await docRef.update({ diviworks: updatedPWorks });
          
                  Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: 'Divi link added successfully.\nYour Divi will be reviewed and approved within 24 hours',
                      customClass: {
                        container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
                      },
                    });
                  setExpanded(!expanded);
                  setLoading(false);
                  setLink('');
                } catch (error) {
                  setLoading(false);
                  toast.error('Error adding new element:', error,{
                      position: 'top-center'
                  });
                }
          }
      }        

  }
  return (
    <Paper style={{backgroundColor: "#E8E8E8"}} className={classes.upload}>
    <SoftButton
    component="a"
    target="_blank"
    rel="noreferrer"
    fullWidth
    onClick={handleExpandClick}
    >
  Divi @ Ksh 7,540
  </SoftButton>

  <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
      <div  className={classes.item}>
      <TextArea rows={4}
      value={link}
        onChange={(e) => setLink(e.target.value)}
      placeholder='Paste Link here...'/>
            </div>
            <center style={{marginTop:8}}>
            <SoftButton
            component="a"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color="info"
            onClick={handleSubmit}
          >
          {loading ? 'Selling...' : 'Sell'}
          </SoftButton>
            </center>
      </CardContent>
    </Collapse>
    </Paper>
  )
}

export default Div