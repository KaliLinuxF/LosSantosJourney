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
	[CharacterDataType.Dna]: 'And independent states form a global economic network and at the same time ',
	[CharacterDataType.Face]: 'And independent states form a global economic network and at the same time ',
	[CharacterDataType.Body]: 'And independent states form a global economic network and at the same time ',
	[CharacterDataType.Hair]: 'And independent states form a global economic network and at the same time ',
	[CharacterDataType.Clothes]: 'And independent states form a global economic network and at the same time ',
}

const Categories: React.FC = () => {
	const dispatch = useAppDispatch()
	const {isOpen, categoryId} = useAppSelector(state => state.createChar)
	const nodeRef = useRef(null)
	const [isShowContent, setIsShowContent] = useState(false)

	const setCategoryId = (categoryId: CharacterDataType) => dispatch(createCharActions.setCategoryId(categoryId))

	const renderList = () => CategoryIdList.map((id) => {
		const isActive = id === categoryId
		return (
			<div
				key={id}
				className={`item ${isActive && 'active'} icon-${id}`}
				onClick={() => setCategoryId(id)}
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
					<div className='list'>{renderList()}</div>
				</CSSTransition>
				<CSSTransition in={isShowContent} timeout={{enter: 600, exit: 300}} classNames='helper'>
					<div className='helper'>
						<div className="bg"/>
						<div className="text">{CategoryHelperList[categoryId]}</div>
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	);
};

export default Categories;
