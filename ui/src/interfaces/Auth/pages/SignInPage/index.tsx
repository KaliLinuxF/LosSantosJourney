import React, {useRef, useState} from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {ButtonType, PageIds} from "../../types";
import Logo from "../../components/Logo";
import {calcVh} from "../../../../utils/calcVh";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {authActions} from "../../reducer";
import {sendNotify} from "../../../../utils/notify";
import {NotificationPositions, NotificationTypes} from "../../../../../../shared/notifications/types";

const SignInPage: React.FC = () => {
	const [isShowContent, setIsShowContent] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useAppDispatch()
	const {isOpen, page} = useAppSelector(state => state.auth)
	const isAnimIn = isOpen && page === PageIds.SignIn
	const nodeRef = useRef(null)

	const handleClickRecover = () => dispatch(authActions.setPage(PageIds.PasswordRecovery))
	const handleClickToSignUp = () => dispatch(authActions.setPage(PageIds.SignUp))

	return (
		<CSSTransition
			in={isAnimIn}
			timeout={{enter: 250, exit: 1000}}
			mountOnEnter
			unmountOnExit
			classNames='SignInPage'
			onEnter={() => setIsShowContent(true)}
			onExiting={() => setIsShowContent(false)}
			nodeRef={nodeRef}
		>
			<div className='SignInPage' ref={nodeRef}>
				<div className="content">
					<Logo isShowAnim={isShowContent} style={{width: calcVh(202), height: calcVh(61), marginBottom: calcVh(30)}}/>
					<Title text='Log in to your account' isShowAnim={isShowContent} style={{marginBottom: calcVh(25)}}/>
					<Input
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(20)}}
						placeholder='Username'
						value={username}
						setValue={setUsername}
					/>
					<Input
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(25)}}
						placeholder='Password'
						value={password}
						setValue={setPassword}
						hasEye
					/>
					<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} mountOnEnter unmountOnExit
												 classNames='row'>
						<div className="row">
							<div className="text">Forgot your password?</div>
							<div className="link" onClick={handleClickRecover}>Recover</div>
						</div>
					</CSSTransition>
					<Button
						text='Log in'
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(20)}}
						arrowState='right'
						type={ButtonType.Light}
						onClick={() => {
							sendNotify({
								type: NotificationTypes.Success,
								text: 'You have successfully logged in!',
								position: NotificationPositions.TopLeft,
								duration: 5,
							})
						}}
					/>
					<Button
						text='Register a new account'
						isShowAnim={isShowContent}
						onClick={handleClickToSignUp}
						type={ButtonType.Dark}
					/>
				</div>
			</div>
		</CSSTransition>
	);
};

export default SignInPage;
