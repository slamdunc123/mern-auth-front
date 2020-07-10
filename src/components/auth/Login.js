import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/UserContext';

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordCheck, setPasswordCheck] = useState();
	const [displayName, setDisplayName] = useState();

	const { setUserData, testMsg } = useContext(UserContext);
	const history = useHistory();

	const submit = async (e) => {
		e.preventDefault();
		const loginUser = {
			email,
			password,
		};
		const loginRes = await axios.post(
			'http://localhost:5000/users/login',
			loginUser
		);
		setUserData({
			token: loginRes.data.token,
			user: loginRes.data.user,
		});
		localStorage.setItem('auth-token', loginRes.data.token);
		history.push('/');
	};
	return (
		<>
			Login - {testMsg}
			<div className='page'>
				<h2>Login</h2>
				<form className='form' onSubmit={submit}>
					<label htmlFor='login-email'>Email</label>
					<input
						id='login-email'
						type='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor='login-password'>Password</label>
					<input
						id='login-password'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor='login-password' />

					<input type='submit' value='Login' />
				</form>
			</div>
		</>
	);
};

export default Login;
