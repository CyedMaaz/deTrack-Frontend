import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import './index.css'

function Login() {
  const navigate = useNavigate();

  const loginMutation = useMutation(
    (formData) =>
      fetch('https://de-track-be.vercel.app/auth/login', {
        method: 'POST',
        headers: {},
        body: JSON.stringify(formData),
      }).then((response) => response.json()),
    {
      onSuccess: (data) => {
        console.log('Login successful', data);

        navigate('/dashboard');
      },
      onError: (error) => {
        console.error('Login failed', error);
      },
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log('Form Data:', formData);
    loginMutation.mutate(formData);

  };

  return (
    <div className="login">
      <h1 className="login-heading">Log In</h1>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <label>
            <input className='login-input' type="text" name="email" placeholder="Username" />
          </label>
          <label>
            <input className='login-input' type="password" name="password" placeholder="Password" />
          </label>
          <button className='submit-login' type="submit" disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <p className="copyright">&copy; 2023 All Rights Reserved.</p>
    </div>
  );
}

export default Login;