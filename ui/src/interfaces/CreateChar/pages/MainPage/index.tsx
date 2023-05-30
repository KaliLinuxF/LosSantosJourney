import React, {useCallback, useEffect, useRef, useState} from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {calcVh} from "../../../../utils/calcVh";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {ButtonIcon, ButtonType} from "../../types";
import {KeyCodes} from "../../../../utils/keyCodes";
import {Gender} from "../../../../../../shared/CharacterCreator/types";
import rpc from "../../../../../../shared/rpc";
import {
	CreateCharApiEventNames,
	CreateCharApiSave,
	CreateCharApiUpdateGender
} from "../../../../../../shared/CharacterCreator/api";
import {createCharActions} from "../../reducer";
import {callUpdateData} from "../../index";

const MainPage: React.FC = () => {
	const [isShowContent, setIsShowContent] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const dispatch = useAppDispatch()
	const {isOpen, gender} = useAppSelector(state => state.createChar)
	const [keys, setKeys] = useState({
		arrowLeft: false,
		arrowRight: false,
		arrowUp: false,
		arrowDown: false,
		space: false,
	})
	const nodeRef = useRef(null)

	useEffect(() => {
		dispatch(createCharActions.resetData())
		const event = CreateCharApiEventNames.UpdateGender
		const data: CreateCharApiUpdateGender = {gender}
		rpc.callClient('executeServer', { event, data })
	}, [gender])

	const handleSave = () => {
		const event = CreateCharApiEventNames.Save
		const data: CreateCharApiSave = {firstName, lastName}
		rpc.callClient('executeServer', { event, data })
	}

	const handleKeyDown = useCallback(
		// @ts-ignore
		({keyCode}) => {
			switch (keyCode) {
				case KeyCodes.ArrowLeft:
					setKeys(prev => ({...prev, arrowLeft: true}))
					break;
				case KeyCodes.ArrowRight:
					setKeys(prev => ({...prev, arrowRight: true}))
					break;
				case KeyCodes.ArrowUp:
					setKeys(prev => ({...prev, arrowUp: true}))
					break;
				case KeyCodes.ArrowDown:
					setKeys(prev => ({...prev, arrowDown: true}))
					break;
				case KeyCodes.Space:
					setKeys(prev => ({...prev, space: true}))
					break;
			}
		},
		[setKeys]
	);

	const handleKeyUp = useCallback(
		// @ts-ignore
		({keyCode}) => {
			switch (keyCode) {
				case KeyCodes.ArrowLeft:
					setKeys(prev => ({...prev, arrowLeft: false}))
					break;
				case KeyCodes.ArrowRight:
					setKeys(prev => ({...prev, arrowRight: false}))
					break;
				case KeyCodes.ArrowUp:
					setKeys(prev => ({...prev, arrowUp: false}))
					break;
				case KeyCodes.ArrowDown:
					setKeys(prev => ({...prev, arrowDown: false}))
					break;
				case KeyCodes.Space:
					setKeys(prev => ({...prev, space: false}))
					break;
			}
		},
		[setKeys]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	useEffect(() => {
		document.addEventListener('keyup', handleKeyUp);
		return () => {
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyUp]);

	return (
		<CSSTransition
			in={isOpen}
			timeout={{enter: 350, exit: 1000}}
			mountOnEnter
			unmountOnExit
			classNames='MainPage'
			onEnter={() => setIsShowContent(true)}
			onExiting={() => setIsShowContent(false)}
			nodeRef={nodeRef}
		>
			<div className='MainPage' ref={nodeRef}>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} classNames='logo'>
					<div className='logo'>Character<br/>Creation</div>
				</CSSTransition>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} classNames='title'>
					<div className='title'>Character name</div>
				</CSSTransition>
				<Input
					isShowAnim={isShowContent}
					style={{marginBottom: calcVh(20)}}
					placeholder='Name'
					value={firstName}
					setValue={setFirstName}
				/>
				<Input
					isShowAnim={isShowContent}
					style={{marginBottom: calcVh(20)}}
					placeholder='Lastname'
					value={lastName}
					setValue={setLastName}
				/>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} classNames='title'>
					<div className='title' style={{color: '#fff'}}>Character gender</div>
				</CSSTransition>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} classNames='gender'>
					<div className='gender'>
						<div
							className={`item male ${gender === Gender.Male && 'active'}`}
							onClick={() => dispatch(createCharActions.setGender(Gender.Male))}
						>
							<div className="name">Male</div>
							<div className="icon male"/>
						</div>
						<div
							className={`item female ${gender === Gender.Female && 'active'}`}
							onClick={() => dispatch(createCharActions.setGender(Gender.Female))}
						>
							<div className="name">Female</div>
							<div className="icon female"/>
						</div>
					</div>
				</CSSTransition>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} classNames='helper'>
					<div className='helper'>And independent states form a global economic<br/>network and at the same time</div>
				</CSSTransition>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} mountOnEnter unmountOnExit
											 classNames='buttons'>
					<div className="buttons">
						<Button
							text='Create character'
							type={ButtonType.Light}
							icon={ButtonIcon.Arrow}
							style={{marginBottom: calcVh(20)}}
							onClick={handleSave}
						/>
						<Button
							text='Full random'
							type={ButtonType.Dark}
							icon={ButtonIcon.Random}
							style={{marginBottom: calcVh(59)}}
						/>
					</div>
				</CSSTransition>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} classNames='keys'>
					<div className="keys">
						<div className="row">
							<div className="btns">
								<div className={`btn ${keys.arrowLeft && 'active'}`}>
									<div className="icon arrowLeft"/>
								</div>
								<div className={`btn ${keys.arrowRight && 'active'}`}>
									<div className="icon arrowRight"/>
								</div>
							</div>
							<div className="text">Moving through the options</div>
						</div>
						<div className="row">
							<div className="btns">
								<div className={`btn ${keys.arrowUp && 'active'}`}>
									<div className="icon arrowUp"/>
								</div>
								<div className={`btn ${keys.arrowDown && 'active'}`}>
									<div className="icon arrowDown"/>
								</div>
							</div>
							<div className="text">Moving through categories</div>
						</div>
						<div className="row">
							<div className="btns">
								<div className={`btn large ${keys.space && 'active'}`}>
									<div className="icon">Space</div>
								</div>
							</div>
							<div className="text">Switch camera</div>
						</div>
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	);
};

export default MainPage;
