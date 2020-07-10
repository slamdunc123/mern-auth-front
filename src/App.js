import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import UserContext from './context/UserContext';

import './style.css';

const App = () => {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});

	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = localStorage.getItem('auth-token');
			if (token === null) {
				localStorage.setItem('auth-token', '');
				token = '';
			}
			const tokenRes = await axios.post(
				'http://localhost:5000/users/tokenIsValid',
				null,
				{
					headers: {
						'x-auth-token': token,
					},
				}
			);
			console.log(tokenRes.data);
			if (tokenRes.data) {
				const userRes = await axios.get('http://localhost:5000/users', {
					headers: { 'x-auth-token': token },
				});
				setUserData({
					token,
					user: userRes.data,
					testMsg: 'User Logged In',
				});
			}
		};
		checkLoggedIn();
	}, []);
	return (
		<>
			<BrowserRouter>
				<UserContext.Provider
					value={{
						userData,
						setUserData,
					}}
				>
					<Header />
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/login' component={Login} />
							<Route path='/register' component={Register} />
							<Route path='*' component={Home} />
						</Switch>
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</>
	);
};

export default App;
