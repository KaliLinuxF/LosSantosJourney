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
import Range from "../Range";
import {callUpdateData} from "../../index";

type BodyCategoryProps = {
	isAnimIn: boolean
	title: string
	helper: string
}

const Controls: CharacterDataKeys[] = [
	CharacterDataKeys.ageing,
	CharacterDataKeys.blemishes,
	CharacterDataKeys.bodyBlemishes,
	CharacterDataKeys.sunDamage,
	CharacterDataKeys.moles,
]

const BodyCategory: React.FC<BodyCategoryProps> = ({isAnimIn, title, helper}) => {
	const dispatch = useAppDispatch()
	const {data} = useAppSelector(state => state.createChar)
	const [isShowContent, setIsShowContent] = useState(false)
	const categoryData = data[CharacterDataType.Body]
	const [control, setControl] = useState(0)
	const listRef = useRef(null)
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
			if (newControl < 0) {
				newControl = 0
			}
			else if (newControl > length) {
				newControl = length
			}
			if(newControl <= 2) {
				listRef.current?.scrollBy({ top: -9999, behavior: 'smooth' })
			}
			else if(newControl >= 3) {
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
			list={[{id: -1, name: `None`}, ...list]}
			hasMinus={true}
			// @ts-ignore
			currentId={categoryData[key].value}
			setCurrentId={(value) => {
				// @ts-ignore
				if(value === categoryData[key].value) return
				dispatch(createCharActions.setDataItem({
					category: CharacterDataType.Body,
					key,
					value: {
						value,
						// @ts-ignore
						saturation: categoryData[key].saturation
					},
				}))
				callUpdateData(CharacterDataType.Body, {
					[key]: {
						value,
						// @ts-ignore
						saturation: categoryData[key].saturation,
					},
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
			<div className='Category CategoryBody'>
				<div className='title'>
					<div className="text">{title}</div>
					<div className='icon icon-3'/>
				</div>
				<div className='helper'>{helper}</div>
				<div className="content" ref={listRef}>
					<div className="list">
						{renderSelect(
							CharacterDataKeys.ageing,
							'Skin aging',
							`Set the skin aging parameter for your character if you want to show his age`,
							new Array(15).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
						{renderSelect(
							CharacterDataKeys.blemishes,
							'Blemishes',
							`Set the blemishes parameter for your character to make it stand out from the rest`,
							new Array(24).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
						{renderSelect(
							CharacterDataKeys.bodyBlemishes,
							'Body blemishes',
							`Set the body blemishes parameter for your character to make it stand out from the rest`,
							new Array(12).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
						{renderSelect(
							CharacterDataKeys.sunDamage,
							'Sun damage',
							`Set the sun damage parameter for your character to make it stand out from the rest`,
							new Array(11).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
						{renderSelect(
							CharacterDataKeys.moles,
							'Moles/Freckles',
							`Set the moles/freckles parameter for your character to make it stand out from the rest`,
							new Array(18).fill(null).map((_, idx) => ({id: idx, name: `Variant ${idx + 1}`})),
						)}
					</div>
				</div>
				<Range
					isActive
					title='Saturation'
					description={`Set how explicitly your character will reflect the selected feature`}
					style={{marginBottom: calcVh(10)}}
					min={0}
					keysDisabled
					// @ts-ignore
					value={categoryData[Controls[control]].saturation}
					setValue={(saturation) => {
						// @ts-ignore
						if(saturation === categoryData[Controls[control]].saturation) return
						dispatch(createCharActions.setDataItem({
							category: CharacterDataType.Body,
							key: Controls[control],
							value: {
								// @ts-ignore
								value: categoryData[Controls[control]].value,
								saturation,
							},
						}))
						callUpdateData(CharacterDataType.Body, {
							[Controls[control]]: {
								// @ts-ignore
								value: categoryData[Controls[control]].value,
								saturation,
							},
						})
					}}
				/>
				<Button
					text='Randomize category'
					type={ButtonType.Dark}
					icon={ButtonIcon.Random}
					onClick={() => dispatch(createCharActions.randomDataCategory(CharacterDataType.Body))}
				/>
			</div>
		</CSSTransition>
	);
};

export default BodyCategory;
