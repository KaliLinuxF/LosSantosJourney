import React, {useEffect} from 'react';
import './styles.sass'
import {useAppDispatch} from "../../hooks/redux";
import {authActions} from './reducer'
import DisclaimerPage from "./pages/DislaimerPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import {PageIds} from "./types";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";

const Auth: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		setTimeout(() => {
			dispatch(authActions.show({ disclaimerDuration: 5 }))
		}, 2000)
		// setTimeout(() => {
		// 	dispatch(authActions.show({ disclaimerDuration: 0 }))
		// 	setTimeout(() => {
		// 		dispatch(authActions.setPage(PageIds.SignIn))
		// 	}, 100)
		// }, 100)
		// @ts-ignore
		window.show = (data) => dispatch(authActions.show(data))
		// @ts-ignore
		window.hide = (data) => dispatch(authActions.hide(data))
	}, [])

	return (
		<div className='Auth'>
			<SignInPage/>
			<SignUpPage/>
			<PasswordRecoveryPage/>
			<DisclaimerPage/>
		</div>
	);
};

export default Auth;
