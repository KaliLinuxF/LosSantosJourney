import React, {useCallback, useEffect, useRef, useState} from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {CharacterDataKeys, CharacterDataType} from "../../../../../../shared/CharacterCreator/CharacterDataType";
import {createCharActions} from "../../reducer";
import {calcVh} from "../../../../utils/calcVh";
import Button from "../Button";
import {ButtonIcon, ButtonType} from "../../types";
import {KeyCodes} from "../../../../utils/keyCodes";
import FaceXY from "../FaceXY";
import FaceTitle from "../FaceTitle";
import {callUpdateData} from "../../index";
import FaceX from "../FaceX";

type FaceCategoryProps = {
	isAnimIn: boolean
	title: string
	helper: string
}

enum Tabs {
	Nose,
	Brows,
	Jaw,
	Lips,
	Jowls,
	Eyes,
}

type ControlXYType = {
	idx: number
	x: {
		key: CharacterDataKeys
		isInverted: boolean
	}
	y: {
		key: CharacterDataKeys
		isInverted: boolean
	}
}

type ControlXType = {
	idx: number
	x: {
		key: CharacterDataKeys
		isInverted: boolean
	}
}

type TabControlsTypes = {
	[Tabs.Nose]: {
		WidthHeight: ControlXYType,
		LengthBridge: ControlXYType,
		TipShift: ControlXYType,
	},
	[Tabs.Brows]: {
		WidthHeight: ControlXYType,
	},
	[Tabs.Jaw]: {
		WidthHeight: ControlXYType,
		LengthPosition: ControlXYType,
		WidthShape: ControlXYType,
	},
	[Tabs.Lips]: {
		Width: ControlXType,
	},
	[Tabs.Jowls]: {
		Width: ControlXType,
		WidthHeight: ControlXYType,
	},
	[Tabs.Eyes]: {
		Height: ControlXType,
	},
}

const TabsControl: TabControlsTypes = {
	[Tabs.Nose]: {
		WidthHeight: {
			idx: 0,
			x: {key: CharacterDataKeys.noseWidth, isInverted: false},
			y: {key: CharacterDataKeys.noseHeight, isInverted: true},
		},
		LengthBridge: {
			idx: 1,
			x: {key: CharacterDataKeys.noseLength, isInverted: true},
			y: {key: CharacterDataKeys.noseBridge, isInverted: false},
		},
		TipShift: {
			idx: 2,
			x: {key: CharacterDataKeys.noseTip, isInverted: true},
			y: {key: CharacterDataKeys.noseBridgeShift, isInverted: true},
		},
	},
	[Tabs.Brows]: {
		WidthHeight: {
			idx: 0,
			x: {key: CharacterDataKeys.browWidth, isInverted: false},
			y: {key: CharacterDataKeys.browHeight, isInverted: true},
		},
	},
	[Tabs.Jaw]: {
		WidthHeight: {
			idx: 0,
			x: {key: CharacterDataKeys.jawWidth, isInverted: false},
			y: {key: CharacterDataKeys.jawHeight, isInverted: true},
		},
		LengthPosition: {
			idx: 1,
			x: {key: CharacterDataKeys.chinLength, isInverted: false},
			y: {key: CharacterDataKeys.chinPosition, isInverted: false},
		},
		WidthShape: {
			idx: 2,
			x: {key: CharacterDataKeys.chinWidth, isInverted: false},
			y: {key: CharacterDataKeys.chinShape, isInverted: false},
		},
	},
	[Tabs.Lips]: {
		Width: {
			idx: 0,
			x: {key: CharacterDataKeys.lips, isInverted: true},
		},
	},
	[Tabs.Jowls]: {
		Width: {
			idx: 0,
			x: {key: CharacterDataKeys.cheeksWidth, isInverted: true},
		},
		WidthHeight: {
			idx: 1,
			x: {key: CharacterDataKeys.cheekboneWidth, isInverted: false},
			y: {key: CharacterDataKeys.cheekboneHeight, isInverted: true},
		},
	},
	[Tabs.Eyes]: {
		Height: {
			idx: 0,
			x: {key: CharacterDataKeys.eyes, isInverted: true},
		},
	},
}

type RenderXY = {
	tab: number
	idx: number
	titleRef: React.RefObject<HTMLDivElement>
	helpers: {
		x: [string, string]
		y: [string, string]
	}
	current: ControlXYType
	style?: { [key: string]: any }
}

type RenderX = {
	tab: number
	idx: number
	titleRef: React.RefObject<HTMLDivElement>
	helpers: {
		x: [string, string]
	}
	current: ControlXType
	style?: { [key: string]: any }
}

const FaceCategory: React.FC<FaceCategoryProps> = ({isAnimIn, title, helper}) => {
	const dispatch = useAppDispatch()
	const {data} = useAppSelector(state => state.createChar)
	const categoryData = data[CharacterDataType.Face]
	const [isShowContent, setIsShowContent] = useState(false)
	const titleNoseRef = useRef(null)
	const titleBrowRef = useRef(null)
	const titleJawRef = useRef(null)
	const titleChinRef = useRef(null)
	const titleLipsRef = useRef(null)
	const titleJowlsRef = useRef(null)
	const titleCheeksRef = useRef(null)
	const titleEyesRef = useRef(null)
	const [isAnimTab, setIsAnimTab] = useState(false)
	const [tabsControl, setTabsControl] = useState({tab: Tabs.Nose, control: 0})
	const {tab, control} = tabsControl
	let currentControl: ControlXYType | ControlXType
	Object.keys(TabsControl[tab]).forEach((objKey) => {
		// @ts-ignore
		const obj = TabsControl[tab][objKey]
		if (obj.idx === control) currentControl = obj
	})

	useEffect(() => {
		setTabsControl({tab: Tabs.Nose, control: 0})
	}, [isAnimIn])

	const handleKeyDown = useCallback(
		// @ts-ignore
		({keyCode}) => {
			let newControl = tabsControl.control

			switch (keyCode) {
				case KeyCodes.ArrowUp:
					newControl -= 1
					break;
				case KeyCodes.ArrowDown:
					newControl += 1
					break;
			}

			const length = Object.keys(TabsControl[tabsControl.tab]).length - 1
			if (newControl < 0) newControl = length
			else if (newControl > length) newControl = 0

			setTabsControl(prev => ({...prev, control: newControl}))
		},
		[tabsControl, setTabsControl]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	const renderTabs = () => [Tabs.Nose, Tabs.Brows, Tabs.Jaw, Tabs.Lips, Tabs.Jowls, Tabs.Eyes]
		.map(tabId => {
			const isActive = tabsControl.tab === tabId

			return (
				<div
					key={tabId}
					className={`tab tab-${tabId} ${isActive && 'active'}`}
					onClick={() => {
						if (isActive) return
						setIsAnimTab(true)
						setTabsControl({tab: tabId, control: 0})
					}}
				/>
			)
		})

	const renderXY = ({
											tab,
											idx,
											titleRef,
											helpers,
											current,
											style = {},
										}: RenderXY) => {
		// @ts-ignore
		const currentValueX = categoryData[current.x.key]
		// @ts-ignore
		const currentValueY = categoryData[current.y.key]

		return (
			<FaceXY
				isShowContent={isShowContent && !isAnimTab}
				isActive={tabsControl.tab === tab && tabsControl.control === idx}
				idx={idx}
				titleRef={titleRef}
				setActive={() => setTabsControl({tab, control: idx})}
				helpers={helpers}
				current={{
					x: currentValueX,
					y: currentValueY,
				}}
				setCurrent={({x, y}) => {
					// @ts-ignore
					if (categoryData[current.x.key] === x && categoryData[current.y.key] === y)
						return
					dispatch(createCharActions.setDataItem({
						category: CharacterDataType.Face,
						key: current.x.key,
						value: x,
					}))
					dispatch(createCharActions.setDataItem({
						category: CharacterDataType.Face,
						key: current.y.key,
						value: y,
					}))
					callUpdateData(CharacterDataType.Face, {
						[current.x.key]: x * (current.x.isInverted ? -1 : 1),
						[current.y.key]: y * (current.x.isInverted ? -1 : 1),
					})
				}}
				style={style}
			/>
		)
	}

	const renderX = ({
											tab,
											idx,
											titleRef,
											helpers,
											current,
											style = {},
										}: RenderX) => {
		// @ts-ignore
		const currentValueX = categoryData[current.x.key]

		return (
			<FaceX
				isShowContent={isShowContent && !isAnimTab}
				isActive={tabsControl.tab === tab && tabsControl.control === idx}
				idx={idx}
				titleRef={titleRef}
				setActive={() => setTabsControl({tab, control: idx})}
				helpers={helpers}
				current={{
					x: currentValueX,
				}}
				setCurrent={({x}) => {
					// @ts-ignore
					if (categoryData[current.x.key] === x)
						return
					dispatch(createCharActions.setDataItem({
						category: CharacterDataType.Face,
						key: current.x.key,
						value: x,
					}))
					callUpdateData(CharacterDataType.Face, {
						[current.x.key]: x * (current.x.isInverted ? -1 : 1),
					})
				}}
				style={style}
			/>
		)
	}

	return (
		<CSSTransition
			in={isAnimIn}
			timeout={{enter: 600, exit: 300}}
			classNames='Category'
			mountOnEnter
			unmountOnExit
			onEntered={() => setIsShowContent(true)}
			onExited={() => setIsShowContent(false)}
		>
			<div className='Category CategoryFace'>
				<div className='title'>
					<div className="text">{title}</div>
					<div className='icon icon-2'/>
				</div>
				<div className='helper'>{helper}</div>
				<div className="tabs">{renderTabs()}</div>
				<div className="content">
					<CSSTransition
						in={tabsControl.tab === Tabs.Nose}
						timeout={{enter: 350, exit: 250}}
						mountOnEnter
						unmountOnExit
						classNames='list'
						onEntered={() => setIsAnimTab(false)}
					>
						<div className="list">
							<div className='content'>
								<FaceTitle
									isActive={tabsControl.tab === Tabs.Nose && tabsControl.control >= 0 && tabsControl.control <= 2}
									title='Nose'
									nodeRef={titleNoseRef}
									description="Change the parameters of your character's nose to personalize it"
									style={{marginBottom: calcVh(25)}}
								/>
								{renderXY({
									tab: Tabs.Nose,
									idx: 0,
									titleRef: titleNoseRef,
									helpers: {
										x: ['Narrow', 'Wide'],
										y: ['Low', 'High'],
									},
									current: TabsControl[Tabs.Nose].WidthHeight,
									style: {marginBottom: calcVh(10)},
								})}
								{renderXY({
									tab: Tabs.Nose,
									idx: 1,
									titleRef: titleNoseRef,
									helpers: {
										x: ['Short', 'Long'],
										y: ['Round', 'Hollow'],
									},
									current: TabsControl[Tabs.Nose].LengthBridge,
									style: {marginBottom: calcVh(10)},
								})}
								{renderXY({
									tab: Tabs.Nose,
									idx: 2,
									titleRef: titleNoseRef,
									helpers: {
										x: ['Left', 'Right'],
										y: ['Downward', 'Upward'],
									},
									current: TabsControl[Tabs.Nose].TipShift,
								})}
							</div>
						</div>
					</CSSTransition>
					<CSSTransition
						in={tabsControl.tab === Tabs.Brows}
						timeout={{enter: 350, exit: 250}}
						mountOnEnter
						unmountOnExit
						classNames='list'
						onEntered={() => setIsAnimTab(false)}
					>
						<div className="list">
							<div className="content">
								<FaceTitle
									isActive={tabsControl.tab === Tabs.Brows && tabsControl.control === 0}
									title='Brow'
									nodeRef={titleBrowRef}
									description={`Change the parameters of your character's eyebrow area to give him personality`}
									style={{marginBottom: calcVh(25)}}
								/>
								{renderXY({
									tab: Tabs.Brows,
									idx: 0,
									titleRef: titleBrowRef,
									helpers: {
										x: ['Inward', 'Outward'],
										y: ['Bottom', 'Top'],
									},
									current: TabsControl[Tabs.Brows].WidthHeight,
								})}
							</div>
						</div>
					</CSSTransition>
					<CSSTransition
						in={tabsControl.tab === Tabs.Jaw}
						timeout={{enter: 350, exit: 250}}
						mountOnEnter
						unmountOnExit
						classNames='list'
						onEntered={() => setIsAnimTab(false)}
					>
						<div className="list">
							<div className="content">
								<FaceTitle
									isActive={tabsControl.tab === Tabs.Jaw && tabsControl.control === 0}
									title='Jaw'
									nodeRef={titleJawRef}
									description={`Change the parameters of your character's jaw to give him personality`}
									style={{marginBottom: calcVh(25)}}
								/>
								{renderXY({
									tab: Tabs.Jaw,
									idx: 0,
									titleRef: titleJawRef,
									helpers: {
										x: ['Narrow', 'Wide'],
										y: ['Bottom', 'Top'],
									},
									current: TabsControl[Tabs.Jaw].WidthHeight,
									style: {marginBottom: calcVh(25)}
								})}
								<FaceTitle
									isActive={tabsControl.tab === Tabs.Jaw && tabsControl.control >= 1 && tabsControl.control <= 2}
									title='Chin'
									nodeRef={titleChinRef}
									description={`Change your character's chin parameters to give him personality`}
									style={{marginBottom: calcVh(25)}}
								/>
								{renderXY({
									tab: Tabs.Jaw,
									idx: 1,
									titleRef: titleChinRef,
									helpers: {
										x: ['Inward', 'Outward'],
										y: ['Small', 'Long'],
									},
									current: TabsControl[Tabs.Jaw].LengthPosition,
									style: {marginBottom: calcVh(25)}
								})}
								{renderXY({
									tab: Tabs.Jaw,
									idx: 2,
									titleRef: titleChinRef,
									helpers: {
										x: ['Narrow', 'Grand'],
										y: ['Simple', 'Double'],
									},
									current: TabsControl[Tabs.Jaw].WidthShape,
								})}
							</div>
						</div>
					</CSSTransition>
					<CSSTransition
						in={tabsControl.tab === Tabs.Lips}
						timeout={{enter: 350, exit: 250}}
						mountOnEnter
						unmountOnExit
						classNames='list'
						onEntered={() => setIsAnimTab(false)}
					>
						<div className="list">
							<div className="content">
								<FaceTitle
									isActive={tabsControl.tab === Tabs.Lips && tabsControl.control === 0}
									title='Brow'
									nodeRef={titleLipsRef}
									description={`Change your character's lips options to give him personality`}
									style={{marginBottom: calcVh(25)}}
								/>
								{renderX({
									tab: Tabs.Lips,
									idx: 0,
									titleRef: titleLipsRef,
									helpers: {
										x: ['Narrow', 'Wide'],
									},
									current: TabsControl[Tabs.Lips].Width,
								})}
							</div>
						</div>
					</CSSTransition>
					<CSSTransition
						in={tabsControl.tab === Tabs.Jowls}
						timeout={{enter: 350, exit: 250}}
						mountOnEnter
						unmountOnExit
						classNames='list'
						onEntered={() => setIsAnimTab(false)}
					>
						<div className="list">
							<div className="content">
								<FaceTitle
									isActive={tabsControl.tab === Tabs.Jowls && tabsControl.control === 0}
									title='Cheeks'
									nodeRef={titleJowlsRef}
									description={`Change the parameters of your character's cheeks to give him personality`}
									style={{marginBottom: calcVh(25)}}
								/>
								{renderX({
									tab: Tabs.Jowls,
									idx: 0,
									titleRef: titleJowlsRef,
									helpers: {
										x: ['Narrow', 'Wide'],
									},
									current: TabsControl[Tabs.Jowls].Width,
									style: { marginBottom: calcVh(35) }
								})}
								<FaceTitle
									isActive={tabsControl.tab === Tabs.Jowls && tabsControl.control === 0}
									title='Cheekbone'
									nodeRef={null}
									description={`Change the parameters of your character's cheekbones to give him personality`}
									style={{marginBottom: calcVh(25)}}
								/>
								{renderXY({
									tab: Tabs.Jowls,
									idx: 0,
									titleRef: titleJowlsRef,
									helpers: {
										x: ['Narrow', 'Wide'],
										y: ['Bottom', 'Top'],
									},
									current: TabsControl[Tabs.Jowls].WidthHeight,
								})}
							</div>
						</div>
					</CSSTransition>
					<CSSTransition
						in={tabsControl.tab === Tabs.Eyes}
						timeout={{enter: 350, exit: 250}}
						mountOnEnter
						unmountOnExit
						classNames='list'
						onEntered={() => setIsAnimTab(false)}
					>
						<div className="list">
							<div className="content">
								<FaceTitle
									isActive={tabsControl.tab === Tabs.Eyes && tabsControl.control === 0}
									title='Brow'
									nodeRef={titleEyesRef}
									description={`Change the parameters of your character's eyes to give them personality`}
									style={{marginBottom: calcVh(25)}}
								/>
								{renderX({
									tab: Tabs.Eyes,
									idx: 0,
									titleRef: titleEyesRef,
									helpers: {
										x: ['Closed', 'Opened'],
									},
									current: TabsControl[Tabs.Lips].Width,
								})}
							</div>
						</div>
					</CSSTransition>
				</div>
				<Button
					text='Randomize category'
					type={ButtonType.Dark}
					icon={ButtonIcon.Random}
					onClick={() => dispatch(createCharActions.randomDataCategory(CharacterDataType.Face))}
				/>
			</div>
		</CSSTransition>
	);
};

export default FaceCategory;
