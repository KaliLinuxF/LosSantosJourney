import React, {useCallback, useEffect, useRef, useState} from 'react';
import './styles.sass'
import {KeyCodes} from "../../../../utils/keyCodes";

type FaceXProps = {
	isShowContent: boolean
	isActive: boolean
	setActive: () => void
	title: string
	description: string
	helpers: [string, string]
	current: number
	setCurrent: (newCurrent: number) => void
	style?: { [key: string]: string }
}

const FaceX: React.FC<FaceXProps> = ({
																			 isShowContent,
																			 isActive,
																			 setActive,
																			 title,
																			 description,
																			 helpers,
																			 current,
																			 setCurrent,
																			 style = {},
																		 }) => {
	const nodeRef = useRef(null)

	useEffect(() => {
		if (isActive && isShowContent)
			nodeRef.current.scrollIntoView({block: "end", behavior: 'smooth'})
	}, [isActive])

	return (
		<div
			className={`FaceX ${isActive && 'active'}`}
			style={style}
			onClick={() => {
				if (isActive) return
				setActive()
			}}
		>
			<div className="title">{title}</div>
			<div className="description">{description}</div>
		</div>
	);
};

export default FaceX;
