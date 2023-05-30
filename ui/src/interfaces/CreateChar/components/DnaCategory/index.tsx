import React, {useCallback, useEffect, useState} from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {Gen} from "./types";
import {GensData} from "./GensData";
import {CharacterDataKeys, CharacterDataType} from "../../../../../../shared/CharacterCreator/CharacterDataType";
import {createCharActions} from "../../reducer";
import Range from "../Range";
import {calcVh} from "../../../../utils/calcVh";
import Button from "../Button";
import {ButtonIcon, ButtonType} from "../../types";
import {KeyCodes} from "../../../../utils/keyCodes";
import {CreateCharApiEventNames, CreateCharApiUpdateData} from "../../../../../../shared/CharacterCreator/api";
import rpc from "../../../../../../shared/rpc";
import {callUpdateData} from "../../index";

type DnaCategoryProps = {
	isAnimIn: boolean
	title: string
	helper: string
}

const Controls: CharacterDataKeys[] = [
	CharacterDataKeys.shapeMix,
	CharacterDataKeys.skinMix,
]

const DnaCategory: React.FC<DnaCategoryProps> = ({isAnimIn, title, helper}) => {
	const dispatch = useAppDispatch()
	const {data} = useAppSelector(state => state.createChar)
	const categoryData = data[CharacterDataType.Dna]
	const [gen, setGen] = useState(Gen.First)
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

	const renderList = () => GensData.map(({name, imageUrl}, idx) => {
		let isActive
		let shapeKey: CharacterDataKeys
		let skinKey: CharacterDataKeys
		if (gen === Gen.First) {
			isActive = idx === categoryData[CharacterDataKeys.shapeFirstId]
			shapeKey = CharacterDataKeys.shapeFirstId
			skinKey = CharacterDataKeys.skinFirstId
		} else if (gen === Gen.Second) {
			isActive = idx === categoryData[CharacterDataKeys.shapeSecondId]
			shapeKey = CharacterDataKeys.shapeSecondId
			skinKey = CharacterDataKeys.skinSecondId
		}

		return (
			<div
				key={idx}
				className={`item ${isActive && 'active'}`}
				style={{backgroundImage: `url(${imageUrl})`}}
				onClick={() => {
					dispatch(createCharActions.setDataItem({
						category: CharacterDataType.Dna,
						key: shapeKey,
						value: idx,
					}))
					dispatch(createCharActions.setDataItem({
						category: CharacterDataType.Dna,
						key: skinKey,
						value: idx,
					}))
					callUpdateData(CharacterDataType.Dna, {
						[shapeKey]: idx,
						[skinKey]: idx,
					})
				}}
			>
				<div className="name">{name}</div>
			</div>
		)
	})

	return (
		<CSSTransition
			in={isAnimIn}
			timeout={{enter: 600, exit: 300}}
			classNames='Category'
			mountOnEnter
			unmountOnExit
		>
			<div className='Category CategoryDna'>
				<div className='title'>
					<div className="text">{title}</div>
					<div className='icon icon-0'/>
				</div>
				<div className='helper'>{helper}</div>
				<div className="gens">
					<div className={`gen ${gen === Gen.First && 'active'}`} onClick={() => setGen(Gen.First)}>
						<div className="text">Gen 1</div>
						<div className="icon"/>
					</div>
					<div className={`gen ${gen === Gen.Second && 'active'}`} onClick={() => setGen(Gen.Second)}>
						<div className="text">Gen 2</div>
						<div className="icon"/>
					</div>
				</div>
				<div className="list">{renderList()}</div>
				<Range
					isActive={currentControl === CharacterDataKeys.shapeMix}
					setActive={() => setControl(Controls.findIndex(key => key === CharacterDataKeys.shapeMix))}
					title='Similarity'
					description='And independent states form a global economic network and at the same time'
					style={{marginBottom: calcVh(10)}}
					value={categoryData[CharacterDataKeys.shapeMix]}
					setValue={(value) => {
						dispatch(createCharActions.setDataItem({
							category: CharacterDataType.Dna,
							key: CharacterDataKeys.shapeMix,
							value,
						}))
						callUpdateData(CharacterDataType.Dna, {
							[CharacterDataKeys.shapeMix]: value,
						})
					}}
				/>
				<Range
					isActive={currentControl === CharacterDataKeys.skinMix}
					setActive={() => setControl(Controls.findIndex(key => key === CharacterDataKeys.skinMix))}
					title='Skin color'
					description='And independent states form a global economic network and at the same time'
					style={{marginBottom: calcVh(20)}}
					value={categoryData[CharacterDataKeys.skinMix]}
					setValue={(value) => {
						dispatch(createCharActions.setDataItem({
							category: CharacterDataType.Dna,
							key: CharacterDataKeys.skinMix,
							value,
						}))
						callUpdateData(CharacterDataType.Dna, {
							[CharacterDataKeys.skinMix]: value,
						})
					}}
				/>
				<Button
					text='Randomize category'
					type={ButtonType.Dark}
					icon={ButtonIcon.Random}
				/>
			</div>
		</CSSTransition>
	);
};

export default DnaCategory;
