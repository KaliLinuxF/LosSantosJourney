import React, {useEffect} from 'react';
import './styles.sass'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {CSSTransition} from "react-transition-group";
import {authActions} from './reducer'
import DisclaimerPage from "./pages/DislaimerPage";
import SignInPage from "./pages/SignInPage";

const Auth: React.FC = () => {
	const dispatch = useAppDispatch()
	const {isOpen} = useAppSelector(state => state.auth)

	useEffect(() => {
		// setTimeout(() => {
		// 	dispatch(authActions.show({ disclaimerDuration: 3 }))
		// }, 100)
		// @ts-ignore
		window.show = (data) => dispatch(authActions.show(data))
		// @ts-ignore
		window.hide = (data) => dispatch(authActions.hide(data))
	}, [])

	return (
		<div className='Auth'>
			<DisclaimerPage/>
			<SignInPage/>
		</div>
	);
};

export default Auth;