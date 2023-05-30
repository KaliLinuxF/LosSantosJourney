import React, {useRef, useState} from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";
import {useAppSelector} from "../../../../hooks/redux";
import {CategoryTitleListType} from "./types";
import {CharacterDataType} from "../../../../../../shared/CharacterCreator/CharacterDataType";
import DnaCategory from "../../components/DnaCategory";
import BodyCategory from "../../components/BodyCategory";
import HairCategory from "../../components/HairCategory";
import ClothesCategory from "../../components/ClothesCategory";
import FaceCategory from "../../components/FaceCategory";

const CategoryTitleList: CategoryTitleListType = {
	[CharacterDataType.Dna]: 'Genetic',
	[CharacterDataType.Face]: 'Face',
	[CharacterDataType.Body]: 'Skin characteristics',
	[CharacterDataType.Hair]: 'Hair and fur styles',
	[CharacterDataType.Clothes]: 'Clothes',
}

const CategoryPage: React.FC = () => {
	const [isShowContent, setIsShowContent] = useState(false)
	const {isOpen, categoryId} = useAppSelector(state => state.createChar)
	const nodeRef = useRef(null)

	return (
		<CSSTransition
			in={isOpen}
			timeout={{enter: 350, exit: 1000}}
			mountOnEnter
			unmountOnExit
			classNames='CategoryPage'
			onEnter={() => setIsShowContent(true)}
			onExiting={() => setIsShowContent(false)}
			nodeRef={nodeRef}
		>
			<div className='CategoryPage' ref={nodeRef}>
				<div className="content">
					<DnaCategory
						title={CategoryTitleList[CharacterDataType.Dna]}
						helper='And independent states form a global economic network and at the same time'
						isAnimIn={isShowContent && categoryId === CharacterDataType.Dna}
					/>
					<BodyCategory
						title={CategoryTitleList[CharacterDataType.Body]}
						helper='And independent states form a global economic network and at the same time'
						isAnimIn={isShowContent && categoryId === CharacterDataType.Body}
					/>
					<HairCategory
						title={CategoryTitleList[CharacterDataType.Hair]}
						helper='And independent states form a global economic network and at the same time'
						isAnimIn={isShowContent && categoryId === CharacterDataType.Hair}
					/>
					<ClothesCategory
						title={CategoryTitleList[CharacterDataType.Clothes]}
						helper='And independent states form a global economic network and at the same time'
						isAnimIn={isShowContent && categoryId === CharacterDataType.Clothes}
					/>
					<FaceCategory
						title={CategoryTitleList[CharacterDataType.Face]}
						helper='And independent states form a global economic network and at the same time'
						isAnimIn={isShowContent && categoryId === CharacterDataType.Face}
					/>
				</div>
			</div>
		</CSSTransition>
	);
};

export default CategoryPage;
