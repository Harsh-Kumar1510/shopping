// import React, { useState } from 'react';
// import { Form } from 'react-router-dom';
// const ContactUs = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch('/social/contact-us/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, message }),
//     });

//     if (response.ok) {
//       setSuccessMessage('Thank you for contacting us');
//       setName('');
//       setEmail('');
//       setMessage('');
//     } else {
//       const data = await response.json();
//       console.error(data);
//     }
//   };

//   return (
//     <div>
//       {successMessage && <p>{successMessage}</p>}
     
//          <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 required
//                 type="text"
//                 placeholder="Enter Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="email">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control
//                 required
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="textarea">
//               <Form.Label>text</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//             </Form.Group>

          
//         <button type="submit">Submit</button>
//       </Form>
//     </div>
//   );
// };

// export default ContactUs;
import React from 'react'

export default function AboutUs() {
  return (
    <div>
      <h1>About Us</h1>
      <h2>To know more about me reach out to me</h2>
      <h3>Thankyou for visiting </h3>
      <h1>Page Under Construction</h1>
      <h2>Page Under Construction</h2>

      <h3>Page Under Construction</h3>
      <h4>Page Under Construction</h4>
      <h5>Page Under Construction</h5>


    </div>
  
  )
}
