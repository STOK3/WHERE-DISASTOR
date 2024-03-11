import React from 'react';
import login from '../../image/Login.png';
import './signupstyle.css';

function Signup() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                console.log('Signup successful');
                alert('SIGNUP SUCCESS');
                // Handle successful signup response here (if needed)
            } else {
                console.error('Signup failed:', response.statusText);
                alert('SIGNUP FAILED');
                // Handle signup failure here (if needed)
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while signing up');
            // Handle error here (if needed)
        }

        // Clear the form fields if needed
        e.target.reset();
    };

    return (
        <div id='signup'>
            <img src={login} className='image' alt='Logo' />
            <form onSubmit={handleSubmit}>
                <h1 className='head'>SIGNUP</h1>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' name='email' />
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' />
                <input type='submit' value='SIGNUP' />
                <p style={{ margin: '10px 0', fontSize: '14px' }}> ALREADY HAVE AN ACCOUNT? <a href='/'>LOGIN</a></p>
            </form>
        </div>
    );
}

export default Signup;
