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

const PasswordRecoveryPage: React.FC = () => {
	const [isShowContent, setIsShowContent] = useState(false)
	const [email, setEmail] = useState('')
	const dispatch = useAppDispatch()
	const {isOpen, page} = useAppSelector(state => state.auth)
	const isAnimIn = isOpen && page === PageIds.PasswordRecovery
	const nodeRef = useRef(null)

	const handleClickToSignIn = () => dispatch(authActions.setPage(PageIds.SignIn))

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
					<Input
						isShowAnim={isShowContent}
						style={{marginBottom: calcVh(20)}}
						placeholder='E-Mail'
						value={email}
						setValue={setEmail}
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
							text='Request a code'
							isShowAnim={isShowContent}
							style={{ width: calcVh(328), textAlign: 'center'}}
							type={ButtonType.Light}
							centeredText
							onClick={() => {
								sendNotify({
									type: NotificationTypes.Success,
									text: 'The password recovery code has been sent to your email!',
									position: NotificationPositions.TopLeft,
									duration: 5,
								})
							}}
						/>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
};

export default PasswordRecoveryPage;
