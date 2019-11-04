import React, { useState, useMemo } from 'react';

import api from '../../services/api';

import './styles.css';

import camera from '../../assets/camera.svg';

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);

  const [company, setCompany] = useState('');

  const [technologies, setTechnologies] = useState('');

  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail]);

  return (
    <form onSubmit={ handleSubmit }>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})`}}
        className={ thumbnail ? 'has-thumbnail' : '' }
      >
        <input type="file" onChange={ event => setThumbnail(event.target.files[0])} />

        <img src={ camera } alt="Select img"/>
      </label>

      <label htmlFor="company">Company *</label>

      <input
        type="text"
        id="company"
        placeholder="Your company"
        value={ company }
        onChange={ event => setCompany(event.target.value) }
      />

      <label htmlFor="technologies">
        Technologies * <span>(comma separated)</span>
      </label>

      <input
        type="text"
        id="technologies"
        placeholder="What technologies they use?"
        value={ technologies }
        onChange={ event => setTechnologies(event.target.value) }
      />

      <label htmlFor="price">
        Daily price * <span>(Leave empty if it is free)</span>
      </label>

      <input
        type="text"
        id="price"
        placeholder="Price per day"
        value={ price }
        onChange={ event => setPrice(event.target.value) }
      />

      <button className="btn" type="submit">Register</button>
    </form>
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('technologies', technologies);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }
}