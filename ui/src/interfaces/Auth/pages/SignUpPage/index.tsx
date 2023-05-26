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
import Checkbox from "../../components/Checkbox";
import {sendNotify} from "../../../../utils/notify";
import {NotificationPositions, NotificationTypes} from "../../../../../../shared/notifications/types";
import {AuthValidationRegExps} from "../../../../../../shared/auth/validationRegExps";
import {AuthApiEventNames, AuthApiSignInData, AuthApiSignUpData} from "../../../../../../shared/auth/api";
import rpc from "rage-rpc";

type SignUpPageProps = {
	sendErrorNotify: (text: string) => void
}

const SignUpPage: React.FC<SignUpPageProps> = ({ sendErrorNotify }) => {
	const [isShowContent, setIsShowContent] = useState(false)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repass, setRepass] = useState('')
	const [promocode, setPromocode] = useState('')
	const [isChecked, setIsChecked] = useState(false)
	const dispatch = useAppDispatch()
	const {isOpen, page} = useAppSelector(state => state.auth)
	const isAnimIn = isOpen && page === PageIds.SignUp
	const nodeRef = useRef(null)

	const handleClickToSignIn = () => dispatch(authActions.setPage(PageIds.SignIn))

	const handleSignUp = () => {
		const {usernameRegExps, passwordRegExps, mailRegExps} = AuthValidationRegExps
		if(!usernameRegExps.Length.test(username))
			return sendErrorNotify('Login must contain from 3 to 25 characters!')
		if(!usernameRegExps.AllowedChars.test(username))
			return sendErrorNotify('Login can only consist of Latin characters and numbers!')
		if(!passwordRegExps.Length.test(password))
			return sendErrorNotify('The password must contain from 6 to 18 characters')
		if(!passwordRegExps.AllowedChars.test(password))
			return sendErrorNotify('Password contains invalid characters')
		if(password !== repass)
			return sendErrorNotify('Wrong re-entered password')
		if(!mailRegExps.AllowedChars.test(email))
			return sendErrorNotify('Incorrect email address entered')

		const event = AuthApiEventNames.SignIn
		const data: AuthApiSignUpData = { username, password, email, promocode }
		rpc.callServer(event, data)
			.then(() => sendNotify({
				type: NotificationTypes.Success,
				duration: 3,
				position: NotificationPositions.TopLeft,
				text: 'Sign Up success'
			}))
			.catch(() => sendErrorNotify('Sign Up error'))
	}

	return (
		<CSSTransition
			in={isAnimIn}
			timeout={{enter: 250, exit: 1000}}
			mountOnEnter
			unmountOnExit
			classNames='SignUpPage'
			onEntered={() => setIsShowContent(true)}
			onExit={() => setIsShowContent(false)}
			nodeRef={nodeRef}
		>
			<div className='SignUpPage' ref={nodeRef}>
				<div className="content">
					<Logo isShowAnim={isShowContent} style={{width: calcVh(202), height: calcVh(61), marginBottom: calcVh(30)}}/>
					<Title text='Register your account' isShowAnim={isShowContent} style={{marginBottom: calcVh(25)}}/>
					<Input
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(20)}}
						placeholder='Username'
						value={username}
						setValue={setUsername}
					/>
					<Input
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(20)}}
						placeholder='E-Mail'
						value={email}
						setValue={setEmail}
					/>
					<Input
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(20)}}
						placeholder='Password'
						value={password}
						setValue={setPassword}
						hasEye
					/>
					<Input
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(20)}}
						placeholder='Repeat password'
						value={repass}
						setValue={setRepass}
						hasEye
					/>
					<Input
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(25)}}
						placeholder='Promocode'
						value={promocode}
						setValue={setPromocode}
					/>
					<Checkbox
						text='I am familiar with and accept the rules of the server'
						isShowAnim={isShowContent}
						checked={isChecked}
						setChecked={setIsChecked}
						style={{ marginBottom: calcVh(25) }}
					/>
					<div className="row">
						<Button
							isShowAnim={isShowContent}
							arrowState='left'
							square
							onClick={handleClickToSignIn}
							type={ButtonType.Dark}
						/>
						<Button
							text='Create account'
							isShowAnim={isShowContent}
							style={{ width: calcVh(328), textAlign: 'center'}}
							type={ButtonType.Light}
							centeredText
							onClick={handleSignUp}
						/>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
};

export default SignUpPage;
