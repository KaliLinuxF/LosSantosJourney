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
import Select from "../Select";
import Color from "../Color";
import {callUpdateData} from "../../index";
import {Data} from "../../data";
import {Gender} from "../../../../../../shared/CharacterCreator/types";

type HairCategoryProps = {
	isAnimIn: boolean
	title: string
	helper: string
}

const Controls: CharacterDataKeys[] = [
	CharacterDataKeys.hairStyle,
	CharacterDataKeys.hairColor,
	CharacterDataKeys.browsStyle,
	CharacterDataKeys.browsColor,
	CharacterDataKeys.chestStyle,
	CharacterDataKeys.chestColor,
]

const BodyCategory: React.FC<HairCategoryProps> = ({isAnimIn, title, helper}) => {
	const dispatch = useAppDispatch()
	const {data, gender} = useAppSelector(state => state.createChar)
	const [isShowContent, setIsShowContent] = useState(false)
	const categoryData = data[CharacterDataType.Hair]
	const [control, setControl] = useState(0)
	const currentControl = Controls[control]

	useEffect(() => {
		setControl(0)
	}, [isAnimIn])

	const handleKeyDown = useCallback(
		// @ts-ignore
		({keyCode}) => {
			let newControl = control

			switch (keyCode) {
				case KeyCodes.ArrowUp:
					newControl -= 1
					break;
				case KeyCodes.ArrowDown:
					newControl += 1
					break;
			}

			const length = Controls.length - 1
			if (newControl < 0) newControl = length
			else if (newControl > length) newControl = 0

			setControl(newControl)
		},
		[control, setControl]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	const renderColor = (
		key: CharacterDataKeys,
		title: string,
		description: string,
	) => (
		<Color
			isActive={currentControl === key}
			setActive={() => setControl(Controls.findIndex(el => el === key))}
			isShowContent={isShowContent}
			title={title}
			list={[
				'#1C1F21',
				'#5C3B24',
				'#D6B97B',
				'#020202',
				'#706C66',
			]}
			// @ts-ignore
			current={categoryData[key]}
			setCurrent={(value) => {
				dispatch(createCharActions.setDataItem({
					category: CharacterDataType.Hair,
					key,
					value,
				}))
				callUpdateData(CharacterDataType.Hair, {
					[key]: value
				})
			}}
			description={description}
			style={{marginBottom: calcVh(30)}}
		/>
	)
	const renderSelect = (
		key: CharacterDataKeys,
		title: string,
		description: string,
		list: { id: number, name: string }[],
	) => (
		<Select
			isActive={currentControl === key}
			setActive={() => setControl(Controls.findIndex(el => el === key))}
			isShowContent={isShowContent}
			title={title}
			description={description}
			list={list}
			// @ts-ignore
			currentId={categoryData[key]}
			setCurrentId={(value) => {
				dispatch(createCharActions.setDataItem({
					category: CharacterDataType.Hair,
					key,
					value,
				}))
				// @ts-ignore
				let styles = Data[Controls[control]]
				if(!Array.isArray(styles))
					styles = styles[gender]
				callUpdateData(CharacterDataType.Hair, {
					[key]: styles[value]
				})
			}}
			style={{marginBottom: calcVh(30)}}
		/>
	)

	return (
		<CSSTransition
			in={isAnimIn}
			timeout={{enter: 600, exit: 300}}
			classNames='Category'
			mountOnEnter
			unmountOnExit
			onEntered={() => setIsShowContent(true)}
			onExit={() => setIsShowContent(false)}
		>
			<div className='Category CategoryHair'>
				<div className='title'>
					<div className="text">{title}</div>
					<div className='icon icon-1'/>
				</div>
				<div className='helper'>{helper}</div>
				<div className="content">
					<div className="list">
						{renderSelect(
							CharacterDataKeys.hairStyle,
							'Hair Style',
							'And independent states form a global economic network and at the same time',
							// @ts-ignore
							new Array(Data[CharacterDataKeys.hairStyle][gender].length).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
						{renderColor(
							CharacterDataKeys.hairColor,
							'Hair color',
							'And independent states form a global economic network and at the same time',
						)}
						{renderSelect(
							CharacterDataKeys.browsStyle,
							'Brows style',
							'And independent states form a global economic network and at the same time',
							// @ts-ignore
							new Array(Data[CharacterDataKeys.browsStyle].length).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
						{renderColor(
							CharacterDataKeys.browsColor,
							'Brows color',
							'And independent states form a global economic network and at the same time',
						)}
						{gender === Gender.Male && (
							<>
								{renderSelect(
									CharacterDataKeys.chestStyle,
									'Chest hair style',
									'And independent states form a global economic network and at the same time',
									// @ts-ignore
									new Array(Data[CharacterDataKeys.chestStyle][gender].length).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
								)}
								{renderColor(
									CharacterDataKeys.chestColor,
									'Chest hair color',
									'And independent states form a global economic network and at the same time',
								)}
							</>
						)}
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

export default BodyCategory;