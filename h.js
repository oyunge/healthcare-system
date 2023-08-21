import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert library if not already imported

// ...

const YourComponent = () => {
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

  // ...

  return (
    <div>
      {/* Your component JSX */}
      <button onClick={bookAppointment} disabled={appointmentBooked}>
        Book Appointment
      </button>
    </div>
  );
};

export default YourComponent;
