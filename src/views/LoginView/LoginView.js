import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { toast } from 'react-toastify';
import LoaderComponent from '../../components/LoaderComponent';
import s from './LoginView.module.css';

export default function LoginView() {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.getLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      return toast.error('💩 Please fill in all fields!');
    }
    dispatch(authOperations.logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
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
        <button type="submit" className={s.btn}>
          Log in
        </button>
      )}

      {isLoading && <LoaderComponent />}
    </form>
  );
}
