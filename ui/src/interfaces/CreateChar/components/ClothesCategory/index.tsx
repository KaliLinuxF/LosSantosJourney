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
import {Data} from "../../data";
import {Gender} from "../../../../../../shared/CharacterCreator/types";
import {callUpdateData} from "../../index";

type ClothesCategoryProps = {
	isAnimIn: boolean
	title: string
	helper: string
}

const Controls: CharacterDataKeys[] = [
	CharacterDataKeys.topData,
	CharacterDataKeys.legs,
	CharacterDataKeys.shoes,
]

const ClothesCategory: React.FC<ClothesCategoryProps> = ({isAnimIn, title, helper}) => {
	const dispatch = useAppDispatch()
	const {data, gender} = useAppSelector(state => state.createChar)
	const [isShowContent, setIsShowContent] = useState(false)
	const categoryData = data[CharacterDataType.Clothes]
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

	const renderSelect = (
		key: CharacterDataKeys,
		title: string,
		description: string,
		list: { id: number, name: string }[],
		currentId: number,
		setCurrentId: (id: number) => void,
	) => (
		<Select
			isActive={currentControl === key}
			setActive={() => setControl(Controls.findIndex(el => el === key))}
			isShowContent={isShowContent}
			title={title}
			description={description}
			list={list}
			currentId={currentId}
			setCurrentId={setCurrentId}
			// @ts-ignore
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
			<div className='Category CategoryClothes'>
				<div className='title'>
					<div className="text">{title}</div>
					<div className='icon icon-1'/>
				</div>
				<div className='helper'>{helper}</div>
				<div className="content">
					<div className="list">
						{renderSelect(
							CharacterDataKeys.topData,
							'Top',
							`Choose a starter outfit that suits your character to start with`,
							new Array(Data[CharacterDataKeys.topData].top[gender].length)
								.fill(null)
								.map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
							categoryData[CharacterDataKeys.topData].top,
							(value) => {
								if(value === categoryData[CharacterDataKeys.topData].top) return
								dispatch(createCharActions.setDataItem({
									category: CharacterDataType.Clothes,
									key: CharacterDataKeys.topData,
									value: {
										top: value,
										torso: categoryData[CharacterDataKeys.topData].torso,
									},
								}))
								callUpdateData(CharacterDataType.Clothes, {
									[CharacterDataKeys.topData]: {
										top: Data[CharacterDataKeys.topData].top[gender][value],
										torso: Data[CharacterDataKeys.topData].torso[gender][value],
									}
								})
							}
						)}
						{renderSelect(
							CharacterDataKeys.legs,
							'Legs',
							`Choose a starter trousers that suits your character to start with`,
							new Array(Data[CharacterDataKeys.legs][gender].length)
								.fill(null)
								.map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
							categoryData[CharacterDataKeys.legs],
							(value) => {
								if(value === categoryData[CharacterDataKeys.legs]) return
								dispatch(createCharActions.setDataItem({
									category: CharacterDataType.Clothes,
									key: CharacterDataKeys.legs,
									value,
								}))
								callUpdateData(CharacterDataType.Clothes, {
									[CharacterDataKeys.legs]: Data[CharacterDataKeys.legs][gender][value],
								})
							}
						)}
						{renderSelect(
							CharacterDataKeys.shoes,
							'Shoes',
							`Choose a starter footwear that suits your character to start with`,
							new Array(Data[CharacterDataKeys.shoes][gender].length)
								.fill(null)
								.map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
							categoryData[CharacterDataKeys.shoes],
							(value) => {
								if(value === categoryData[CharacterDataKeys.shoes]) return
								dispatch(createCharActions.setDataItem({
									category: CharacterDataType.Clothes,
									key: CharacterDataKeys.shoes,
									value,
								}))
								callUpdateData(CharacterDataType.Clothes, {
									[CharacterDataKeys.shoes]: Data[CharacterDataKeys.shoes][gender][value],
								})
							}
						)}
					</div>
				</div>
				<Button
					text='Randomize category'
					type={ButtonType.Dark}
					icon={ButtonIcon.Random}
					onClick={() => dispatch(createCharActions.randomDataCategory(CharacterDataType.Clothes))}
				/>
			</div>
		</CSSTransition>
	);
};

export default ClothesCategory;
