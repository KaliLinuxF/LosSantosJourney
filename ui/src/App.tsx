import React from 'react';
import './index.sass'
import rpc from 'rage-rpc'
import Auth from "./interfaces/Auth";
import Notifications from "./interfaces/Notifications";
import {useAppDispatch} from "./hooks/redux";

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	rpc.register('executeRpc', (action) => dispatch(action))

	return (
		<>
			<Auth/>
			<Notifications/>
		</>
	);
};

export default App;
