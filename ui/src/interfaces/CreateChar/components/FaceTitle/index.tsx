import React from 'react';
import './styles.sass'
import {KeyCodes} from "../../../../utils/keyCodes";

type FaceTitleProps = {
	nodeRef: React.RefObject<HTMLDivElement>
	isActive: boolean
	title: string
	description: string
	style?: { [key: string]: string }
}

const FaceTitle: React.FC<FaceTitleProps> = ({
																			 nodeRef,
																			 isActive,
																			 title,
																			 description,
																			 style = {},
																		 }) => {

	return (
		<div className={`FaceTitle ${isActive && 'active'}`} style={style} ref={nodeRef}>
			<div className="title">{title}</div>
			<div className="description">{description}</div>
		</div>
	);
};

export default FaceTitle;
