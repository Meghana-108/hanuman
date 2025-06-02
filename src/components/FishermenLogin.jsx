import React, { useState } from 'react';
import axios from 'axios';

function FishermenLogin() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', licenseId: '', mobile: '' });
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const res = await axios.post('http://localhost:5000/login', formData);
    if (res.data.success) {
      alert('OTP sent to your phone');
      setStep(2);
    } else {
      alert(res.data.message);
    }
  };

const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:5000/verify', {
        phone: formData.mobile, // Ensure key is "phone" to match backend
        otp,
      });
      if (res.data.success) {
        alert('Login Successful');
        window.location.href = '/home'; // You can replace with useNavigate if using React Router
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      alert(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {step === 1 && (
        <>
          <h2>Login</h2>
          <input name="name" placeholder="Name" onChange={handleInputChange} /><br />
          <input name="licenseId" placeholder="License ID" onChange={handleInputChange} /><br />
          <input name="mobile" placeholder="Phone Number" onChange={handleInputChange} /><br />
          <button onClick={handleLogin}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Enter OTP</h2>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" /><br />
          <button onClick={handleVerify}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default FishermenLogin;
