import React, {useEffect, useRef, useState} from 'react';
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
import {AuthValidationRegExps} from "../../../../../../shared/auth/validationRegExps";
import {
	AuthApiEventNames,
	AuthApiRecoveryCode,
	AuthApiRecoveryEmail,
	AuthApiRecoveryPassword
} from "../../../../../../shared/auth/api";
import rpc from 'rage-rpc'
import {sendNotify} from "../../../../utils/notify";
import {NotificationPositions, NotificationTypes} from "../../../../../../shared/notifications/types";

type PasswordRecoveryPageProps = {
	sendErrorNotify: (text: string) => void
}

enum Step {
	Email,
	Code,
	Password,
}

const ButtonText = {
	[Step.Email]: 'Request a code',
	[Step.Code]: 'Send code',
	[Step.Password]: 'Set password'
}

const PasswordRecoveryPage: React.FC<PasswordRecoveryPageProps> = ({ sendErrorNotify }) => {
	const [isShowContent, setIsShowContent] = useState(false)
	const [email, setEmail] = useState('')
	const [code, setCode] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useAppDispatch()
	const {isOpen, page} = useAppSelector(state => state.auth)
	const [step, setStep] = useState(Step.Email)
	const isAnimIn = isOpen && page === PageIds.PasswordRecovery
	const nodeRef = useRef(null)

	useEffect(() => {
		// @ts-ignore
		window.setStep = (step) => setStep(step)
	}, [])

	useEffect(() => {
		setStep(Step.Email)
	}, [isShowContent, email])

	const handleClickToSignIn = () => dispatch(authActions.setPage(PageIds.SignIn))

	const handleClickButton = () => {
		switch (step) {
			case Step.Email: {
				const {mailRegExps} = AuthValidationRegExps
				if (!mailRegExps.AllowedChars.test(email))
					return sendErrorNotify('Incorrect email address entered!')
				const event = AuthApiEventNames.RecoveryEmail
				const data: AuthApiRecoveryEmail = {email}
				rpc.callServer(event, data)
					.then(() => setStep(Step.Code))
					.catch(() => sendErrorNotify('There is no account with this email address!'))
				break
			}

			case Step.Code: {
				if (!code.length)
					return sendErrorNotify('The code field cannot be empty!')
				const event = AuthApiEventNames.RecoveryCode
				const data: AuthApiRecoveryCode = {code}
				rpc.callServer(event, data)
					.then(() => setStep(Step.Password))
					.catch(() => sendErrorNotify('!'))
				break
			}

			case Step.Password: {
				const {passwordRegExps} = AuthValidationRegExps
				if (!passwordRegExps.Length.test(password))
					return sendErrorNotify('The password must contain from 6 to 18 characters!')
				if (!passwordRegExps.AllowedChars.test(password))
					return sendErrorNotify('Password contains invalid characters!')
				const event = AuthApiEventNames.RecoveryPassword
				const data: AuthApiRecoveryPassword = {password}
				rpc.callServer(event, data)
					.then(() => {
						sendNotify({
							type: NotificationTypes.Success,
							duration: 3,
							position: NotificationPositions.TopLeft,
							text: 'Password recovery success'
						})
						handleClickToSignIn()
					})
					.catch(() => sendErrorNotify('Password recovery error'))
				break
			}
		}
	}

	return (
		<CSSTransition
			in={isAnimIn}
			timeout={{enter: 250, exit: 1000}}
			mountOnEnter
			unmountOnExit
			classNames='PasswordRecoveryPage'
			onEntered={() => setIsShowContent(true)}
			onExit={() => setIsShowContent(false)}
			nodeRef={nodeRef}
		>
			<div className='PasswordRecoveryPage' ref={nodeRef}>
				<div className="content">
					<Logo isShowAnim={isShowContent} style={{width: calcVh(202), height: calcVh(61), marginBottom: calcVh(30)}}/>
					<Title text='Password Recovery' isShowAnim={isShowContent} style={{marginBottom: calcVh(25)}}/>
					<div className={`block step-${step}`}>
						<Input
							isShowAnim={isShowContent}
							placeholder='E-Mail'
							value={email}
							setValue={setEmail}
						/>
						<Input
							isShowAnim={isShowContent}
							placeholder='Code'
							value={code}
							setValue={setCode}
						/>
						<Input
							isShowAnim={isShowContent}
							placeholder='Password'
							value={password}
							setValue={setPassword}
						/>
					</div>
					<div className="row">
						<Button
							isShowAnim={isShowContent}
							arrowState='left'
							square
							onClick={handleClickToSignIn}
							type={ButtonType.Dark}
						/>
						<Button
							text={ButtonText[step]}
							isShowAnim={isShowContent}
							style={{ width: calcVh(328), textAlign: 'center'}}
							type={ButtonType.Light}
							centeredText
							onClick={handleClickButton}
						/>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
};

export default PasswordRecoveryPage;
