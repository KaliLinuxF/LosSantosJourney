import React, {useCallback, useEffect, useRef, useState} from 'react';
import './styles.sass'
import {KeyCodes} from "../../../../utils/keyCodes";

type FaceTitleProps = {
	isActive: boolean
	title: string
	description: string
	style?: { [key: string]: string }
}

const FaceTitle: React.FC<FaceTitleProps> = ({
																			 isActive,
																			 title,
																			 description,
																			 style = {},
																		 }) => {

	return (
		<div className={`FaceTitle ${isActive && 'active'}`} style={style}>
			<div className="title">{title}</div>
			<div className="description">{description}</div>
		</div>
	);
};

export default FaceTitle;
