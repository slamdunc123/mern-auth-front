import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';

const Login = () => {
	const userContext = useContext(UserContext);
	const {
		userData: { test },
	} = userContext;
	return <>Login - {test}</>;
};

export default Login;
