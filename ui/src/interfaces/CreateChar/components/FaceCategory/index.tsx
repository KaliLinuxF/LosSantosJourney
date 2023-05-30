import React, {useCallback, useEffect, useState} from 'react';
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
	helpers: {
		x: [string, string]
		y: [string, string]
	}
	current: ControlXYType
	style?: { [key: string]: any }
}

const FaceCategory: React.FC<FaceCategoryProps> = ({isAnimIn, title, helper}) => {
	const dispatch = useAppDispatch()
	const {data} = useAppSelector(state => state.createChar)
	const categoryData = data[CharacterDataType.Face]
	const [isShowContent, setIsShowContent] = useState(false)
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
						setTabsControl({tab: tabId, control: 0})
					}}
				/>
			)
		})

	const renderXY = ({
											tab,
											idx,
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
				isShowContent={isShowContent}
				isActive={tabsControl.tab === tab && tabsControl.control === idx}
				setActive={() => setTabsControl({tab, control: idx})}
				helpers={helpers}
				current={{
					x: {value: currentValueX, isInverted: current.x.isInverted},
					y: {value: currentValueY, isInverted: current.y.isInverted},
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
						[current.x.key]: x,
						[current.y.key]: y,
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
					<div className="list">
						<FaceTitle
							isActive={tabsControl.tab === Tabs.Nose && tabsControl.control >= 0 && tabsControl.control <= 2}
							title='Nose'
							description='And independent states form a global economic network and at the same time'
							style={{marginBottom: calcVh(35)}}
						/>
						{renderXY({
							tab: Tabs.Nose,
							idx: 0,
							helpers: {
								x: ['Low', 'High'],
								y: ['Narrow', 'Wide'],
							},
							current: TabsControl[Tabs.Nose].WidthHeight,
							style: {marginBottom: calcVh(35)},
						})}
						{renderXY({
							tab: Tabs.Nose,
							idx: 1,
							helpers: {
								x: ['Short', 'Long'],
								y: ['Round', 'Hollow'],
							},
							current: TabsControl[Tabs.Nose].LengthBridge,
							style: {marginBottom: calcVh(35)},
						})}
						{renderXY({
							tab: Tabs.Nose,
							idx: 2,
							helpers: {
								x: ['Downward', 'Upward'],
								y: ['Left', 'Right'],
							},
							current: TabsControl[Tabs.Nose].TipShift,
						})}
					</div>
				</div>
				<Button
					text='Randomize category'
					type={ButtonType.Dark}
					icon={ButtonIcon.Random}
				/>
			</div>
		</CSSTransition>
	);
};

export default FaceCategory;
