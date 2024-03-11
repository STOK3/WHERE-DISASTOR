import React from 'react';
import './App.css';
import login from './assets/image/Login.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function App() {

  const navigate = useNavigate(); // Utilize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Invalid email or password'); // Throw error if response is not OK
        }
        return res.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('LOGIN SUCCESS');
        navigate('/search'); // Redirect to search path on successful login
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.message); // Show error message in alert
        // Handle error here
      });

    // Clear the form fields if needed
    e.target.reset();
  };

  return (
    <div id='login'>
      <img src={login} className='image' alt='Logo' />
      <form onSubmit={handleSubmit}>
        <h1 className='head'>LOGIN</h1>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' /> {/* Add name attribute */}
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' /> {/* Add name attribute */}
        <input type='submit' value='LOGIN' />
        <p style={{ margin: '10px 0', fontSize: '14px' }}>DON'T HAVE AN ACCOUNT YET? <a href='signup'>SIGNUP</a></p>
      </form>
    </div>
  );
}

export default App;
