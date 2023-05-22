import React from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";
import {useAppSelector} from "../../../../hooks/redux";
import {PageIds} from "../../types";

const SignInPage: React.FC = () => {
	const {isOpen, page} = useAppSelector(state => state.auth)
	const isAnimIn = isOpen && page === PageIds.SignIn

	return (
		<CSSTransition
			in={isAnimIn}
			timeout={{enter: 250, exit: 750}}
			mountOnEnter
			unmountOnExit
			classNames='SignInPage'
		>
			<div className='SignInPage'>
			</div>
		</CSSTransition>
	);
};

export default SignInPage;