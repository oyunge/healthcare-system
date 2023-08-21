import React, { useState } from 'react';
import './styles.css'
import SoftButton from '../../../soft-components/SoftButton';
import UseWhatsapp from 'whatsapp-react-component';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { db } from '../../../firebase';

const Contact = ({setModalShowContact}) => {
    const [fullName, setFullName] = useState('')
    const [senderEmail, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const receiver = '+254780734415';

    const submitToAdmin = () => {
      setLoading(true);
      if (fullName === '' || senderEmail === '' || phone === '' || message === '') {
        toast.error('Please fill all fields!', {
          position: toast.POSITION.TOP_CENTER
        });
        setLoading(false);
        return;
      } else {
        const confirmDetails = async () => {
          const result = await Swal.fire({
            title: 'Confirm your details',
            html: `Name: ${fullName}<br/>
                   Phone Number: ${phone}<br/>
                   Email: ${senderEmail}<br/><br/>
                   Message: ${message}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
              container: 'my-swal-container', // Add a custom CSS class name
            },
          });
  
          if (result.isConfirmed) {
                setLoading(true);
                sendEmail()
                  Swal.fire({
                    icon: 'success',
                    title: 'Message sent successfully!',
                    text: 'We will get back to you shortly either via phone or email. Thank you!',
                  })
                    setLoading(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                    setModalShowContact(false);
          } else {
            setLoading(false);
          }
        };
  
        confirmDetails();
      }
    };


    const sendEmail = () => {
      const email = 'WebThemesKenya@gmail.com '; // Replace with the email address you want to send the email to
      const subject = 'Contact Form Submission';
      const body = `Dear Web Themes Kenya Admin,\n\n${message}\n\nBest regards,\n${fullName}\n${senderEmail}\n${phone}`;
  
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      window.open(mailtoLink, '_blank');
    };

  return (
    <div className="contact3 py-5">
    <div className="row no-gutters">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="card-shadow">
              <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg" className="img-fluid image-contact" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-box">
              <form className="mt-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <input className="form-control"
                       value={fullName}
                       onChange={e => setFullName(e.target.value)}
                      type="text" placeholder="Full Name" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <input className="form-control" type="email"
                      value={senderEmail}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="email address" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <input className="form-control" type="text" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="phone" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <textarea className="form-control" rows={3} 
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <SoftButton
                    fullWidth
                    style={{marginTop:10}}
                    onClick={submitToAdmin}
                    >
                    {loading ? (
                      <span>Submitting...</span>
                    ):(
                    <span>Submit</span>
                    )}
                    </SoftButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="card mt-4 border-0 mb-4">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="card-body d-flex align-items-center c-detail pl-0">
                    <div className="mr-3 align-self-center">
                      <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png" />
                    </div>
                    <div className>
                      <h6 className="font-weight-medium">Address</h6>
                      <p className>P.O box 00100-4533 Even business park,
                        <br />North airport road off Mombasa road</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png" />
                  </div>
                  <div className>
                    <h6 className="font-weight-medium">Email</h6>
                    <p>
                    <a style={{fontWeight:'bold'}} href="mailto:info@webthemeskenya.or.ke">info@webthemeskenya.or.ke</a>
                    </p>
                  </div>
                </div>
              </div>
                <div className="col-lg-4 col-md-4">
                  <div className="card-body d-flex align-items-center c-detail">
                    <div className="mr-3 align-self-center">
                      <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png" />
                    </div>
                    <div className>
                      <h6 className="font-weight-medium">Phone</h6>
                      <p>
                      <a style={{fontWeight:'bold'}} href="tel:+254780734415">+254780734415</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Contact;
