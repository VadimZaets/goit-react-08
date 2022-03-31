import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { toast } from 'react-toastify';

import LoaderComponent from '../../components/LoaderComponent';
import s from './RegisterView.module.css';

export default function RegisterView() {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.getLoading);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      return toast.error('💩 Please fill in all fields!');
    } else if (password.length < 7) {
      return toast.info('Passwords must be at least 7 characters long!');
    }
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
        />
      </label>
      <label className={s.label}>
        Email
        <input
          className={s.input}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email"
        />
      </label>
      <label className={s.label}>
        Password
        <input
          className={s.input}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </label>

      {!isLoading && (
        <button className={s.btn} type="submit">
          Sign up
        </button>
      )}

      {isLoading && <LoaderComponent />}
    </form>
  );
}
