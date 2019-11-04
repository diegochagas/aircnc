import React, { useState } from 'react';

import api from '../../services/api';

export default function Login({ history  }) {
  const [email, setEmail] = useState('');
  
  return (
    <>
      <p>Offer <strong>spots</strong> for developers and find <strong>talents</strong> for your company.</p>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">E-MAIL *</label>

        <input
          type="email"
          id="email"
          placeholder="Your best e-mail"
          value={ email }
          onChange={ event => setEmail(event.target.value) }
        />

        <button className="btn" type="submit">Login</button>
      </form>
    </>
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }
}