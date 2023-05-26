import React, {useEffect} from 'react';
import './styles.sass'
import {useAppDispatch} from "../../hooks/redux";
import {authActions} from './reducer'
import DisclaimerPage from "./pages/DislaimerPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import {PageIds} from "./types";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import {sendNotify} from "../../utils/notify";
import {NotificationPositions, NotificationTypes} from "../../../../shared/notifications/types";

const Auth: React.FC = () => {
	const dispatch = useAppDispatch()

	const sendErrorNotify = (text: string) => {
		// @ts-ignore
		if(window.hasAnyNotify) return
		sendNotify({
			type: NotificationTypes.Error,
			text,
			position: NotificationPositions.TopLeft,
			duration: 3,
		})
	}

	useEffect(() => {
		// setTimeout(() => {
		// 	dispatch(authActions.show({ disclaimerDuration: 5 }))
		// }, 2000)
		// -----------------
		// setTimeout(() => {
		// 	dispatch(authActions.show({ disclaimerDuration: 0 }))
		// 	setTimeout(() => {
		// 		dispatch(authActions.setPage(PageIds.PasswordRecovery))
		// 	}, 100)
		// }, 100)
	}, [])

	return (
		<div className='Auth'>
			<SignInPage sendErrorNotify={sendErrorNotify}/>
			<SignUpPage sendErrorNotify={sendErrorNotify}/>
			<PasswordRecoveryPage sendErrorNotify={sendErrorNotify}/>
			<DisclaimerPage/>
		</div>
	);
};

export default Auth;
