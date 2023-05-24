import React from 'react';
import './index.sass'
import Auth from "./interfaces/Auth";
import Notifications from "./interfaces/Notifications";

const App: React.FC = () => {
	return (
		<>
			<Auth/>
			<Notifications/>
		</>
	);
};

export default App;
