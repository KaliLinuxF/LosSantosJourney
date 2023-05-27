import React from 'react';
import './index.sass'
import rpc from '../../shared/rpc';
import Auth from "./interfaces/Auth";
import Notifications from "./interfaces/Notifications";
import {useAppDispatch} from "./hooks/redux";

const App: React.FC = () => {
	const dispatch = useAppDispatch()
	console.log('Пенис')
	rpc.register('executeRpc', (action: any) =>{
		console.log('Я пидор усатый волосатый')
		dispatch(action)
	})

	return (
		<>
			<Auth/>
			<Notifications/>
		</>
	);
};

export default App;
