import React, {useRef, useState} from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";
import {CharacterDataType} from "../../../../../../shared/CharacterCreator/CharacterDataType";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {createCharActions} from "../../reducer";

const CategoryIdList: CharacterDataType[] = [
	CharacterDataType.Dna,
	CharacterDataType.Face,
	CharacterDataType.Body,
	CharacterDataType.Hair,
	CharacterDataType.Clothes,
]

type CategoryHelperList = {
	[CharacterDataType.Dna]: string
	[CharacterDataType.Face]: string
	[CharacterDataType.Body]: string
	[CharacterDataType.Hair]: string
	[CharacterDataType.Clothes]: string
}
const CategoryHelperList: CategoryHelperList = {
	[CharacterDataType.Dna]: 'This section will help you create a unique character by identifying his ancestors and similarities with them',
	[CharacterDataType.Face]: 'The "Face" category allows you to fine-tune your character\'s face. Take special care to give your character a special personality',
	[CharacterDataType.Body]: 'Increase or decrease the number of moles, add wrinkles or other expressive details to create an unusual and memorable image.',
	[CharacterDataType.Hair]: 'Choose the style, hair color, and brows style to create your personal style.',
	[CharacterDataType.Clothes]: 'In this section you can customize the starting clothes of your character',
}

const Categories: React.FC = () => {
	const dispatch = useAppDispatch()
	const {isOpen, categoryId} = useAppSelector(state => state.createChar)
	const nodeRef = useRef(null)
	const [isShowContent, setIsShowContent] = useState(false)
	const [hoveredId, setHoveredId] = useState(CharacterDataType.Dna)

	const setCategoryId = (categoryId: CharacterDataType) => dispatch(createCharActions.setCategoryId(categoryId))

	const renderList = () => CategoryIdList.map((id) => {
		const isActive = id === categoryId
		return (
			<div
				key={id}
				className={`item ${isActive && 'active'} icon-${id}`}
				onClick={() => setCategoryId(id)}
				onMouseEnter={() => setHoveredId(id)}
			/>
		)
	})

	return (
		<CSSTransition
			in={isOpen}
			timeout={{enter: 250, exit: 1000}}
			mountOnEnter
			unmountOnExit
			classNames='MainPage'
			onEnter={() => setIsShowContent(true)}
			onExiting={() => setIsShowContent(false)}
			nodeRef={nodeRef}
		>
			<div className='Categories' ref={nodeRef}>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} classNames='list'>
					<div className='list'>
						{renderList()}
						<div className='helper'>
							<div className="bg"/>
							<div className="text">{CategoryHelperList[hoveredId]}</div>
						</div>
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	);
};

export default Categories;
