import React, {useCallback, useEffect, useRef, useState} from 'react';
import './styles.sass'
import {KeyCodes} from "../../../../utils/keyCodes";

type ColorProps = {
	isShowContent: boolean
	isActive: boolean
	setActive: () => void
	title: string
	description: string
	list: string[]
	current: number
	setCurrent: (newCurrent: number) => void
	style?: { [key: string]: string }
}

const Color: React.FC<ColorProps> = ({
																			 isShowContent,
																			 isActive,
																			 setActive,
																			 title,
																			 description,
																			 list,
																			 current,
																			 setCurrent,
																			 style = {},
																		 }) => {
	const nodeRef = useRef(null)
	const [controlKeys, setControlKeys] = useState({
		arrowLeft: false,
		arrowRight: false,
	})

	useEffect(() => {
		if (isActive && isShowContent)
			nodeRef.current.scrollIntoView({block: "end", behavior: 'smooth'})
	}, [isActive])

	const handleKeyDown = useCallback(
		// @ts-ignore
		({keyCode}) => {
			if (!isActive) return

			let index = current

			switch (keyCode) {
				case KeyCodes.ArrowLeft:
					index -= 1
					break;
				case KeyCodes.ArrowRight:
					index += 1
					break;
			}

			const length = list.length - 1
			if (index < 0) index = 0
			else if (index > length) index = length

			setCurrent(index)
		},
		[isActive, current, list, setCurrent]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	const handleControlKeyDown = useCallback(
		// @ts-ignore
		({keyCode}) => {
			if (!isActive) return

			switch (keyCode) {
				case KeyCodes.ArrowLeft:
					setControlKeys(prev => ({...prev, arrowLeft: true}))
					break;
				case KeyCodes.ArrowRight:
					setControlKeys(prev => ({...prev, arrowRight: true}))
					break;
			}
		},
		[isActive, controlKeys, setControlKeys]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleControlKeyDown);
		return () => {
			document.removeEventListener('keydown', handleControlKeyDown);
		};
	}, [handleControlKeyDown]);

	const handleControlKeyUp = useCallback(
		// @ts-ignore
		({keyCode}) => {
			switch (keyCode) {
				case KeyCodes.ArrowLeft:
					if (current < 0) return
					setControlKeys(prev => ({...prev, arrowLeft: false}))
					break;
				case KeyCodes.ArrowRight:
					if (current > list.length - 1) return
					setControlKeys(prev => ({...prev, arrowRight: false}))
					break;
			}
		},
		[controlKeys, setControlKeys]
	);

	useEffect(() => {
		document.addEventListener('keyup', handleControlKeyUp);
		return () => {
			document.removeEventListener('keyup', handleControlKeyUp);
		};
	}, [handleControlKeyUp]);

	return (
		<div
			className={`Color ${isActive && 'active'}`}
			style={style}
			onClick={() => {
				if (isActive) return
				setActive()
			}}
			ref={nodeRef}
		>
			<div className="title">{title}</div>
			<div className="description">{description}</div>
			<div className="list">{
				list.map((color, idx) => {
					const isActive = idx === current
					return (
						<div
							key={idx}
							className={`item ${isActive && 'active'}`}
							style={{backgroundColor: color}}
							onClick={() => setCurrent(idx)}
						/>
					)
				})}
			</div>
		</div>
	);
};

export default Color;
