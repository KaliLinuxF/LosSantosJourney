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
	CharacterDataKeys.facialHair,
	CharacterDataKeys.facialColor,
]

const HairCategory: React.FC<HairCategoryProps> = ({isAnimIn, title, helper}) => {
	const dispatch = useAppDispatch()
	const {data, gender} = useAppSelector(state => state.createChar)
	const [isShowContent, setIsShowContent] = useState(false)
	const categoryData = data[CharacterDataType.Hair]
	const [control, setControl] = useState(0)
	const currentControl = Controls[control]
	const listRef = useRef(null)

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
			if (newControl <= 0) {
				newControl = 0
			}
			else if (newControl >= length) {
				newControl = length
			}
			if(newControl <= 3) {
				listRef.current?.scrollBy({ top: -9999, behavior: 'smooth' })
			}
			else if(newControl >= 4) {
				listRef.current?.scrollBy({ top: 9999, behavior: 'smooth' })
			}

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
				// @ts-ignore
				if(value === categoryData[key]) return
				dispatch(createCharActions.setDataItem({
					category: CharacterDataType.Hair,
					key,
					value,
				}))
				callUpdateData(CharacterDataType.Hair, {
					// @ts-ignore
					[key]: Data[key][value]
				})
			}}
			description={description}
			style={{paddingBottom: calcVh(30)}}
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
				// @ts-ignore
				if(value === categoryData[key]) return
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
				<div className="content" ref={listRef}>
					<div className="list">
						{renderSelect(
							CharacterDataKeys.hairStyle,
							'Hair Style',
							`Choose a starter hairstyle option for your character. You can change it in the future`,
							// @ts-ignore
							new Array(Data[CharacterDataKeys.hairStyle][gender].length).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
						{renderColor(
							CharacterDataKeys.hairColor,
							'Hair color',
							`Choose an initial hair color for your character. You can change it in the future`,
						)}
						{renderSelect(
							CharacterDataKeys.browsStyle,
							'Brows style',
							`Choose an initial eyebrow type for your character. You can change it in the future`,
							// @ts-ignore
							new Array(Data[CharacterDataKeys.browsStyle].length).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
						{renderColor(
							CharacterDataKeys.browsColor,
							'Brows color',
							`Choose an initial eyebrow color for your character. You can change it in the future`,
						)}
						{gender === Gender.Male && (
							<>
								{renderSelect(
									CharacterDataKeys.facialHair,
									'Beard style',
									`Choose an beard style for your character if you want.You can change it in the future`,
									// @ts-ignore
									new Array(Data[CharacterDataKeys.facialHair][gender].length).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
								)}
								{renderColor(
									CharacterDataKeys.facialColor,
									'Beard color',
									`Choose the initial beard color for your character. You can change this in the future`,
								)}
							</>
						)}
					</div>
				</div>
				<Button
					text='Randomize category'
					type={ButtonType.Dark}
					icon={ButtonIcon.Random}
					onClick={() => dispatch(createCharActions.randomDataCategory(CharacterDataType.Hair))}
				/>
			</div>
		</CSSTransition>
	);
};

export default HairCategory;
