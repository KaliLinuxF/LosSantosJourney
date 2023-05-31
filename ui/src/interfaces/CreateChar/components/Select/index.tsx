import React, {useCallback, useEffect, useRef, useState} from 'react';
import './styles.sass'
import {KeyCodes} from "../../../../utils/keyCodes";

type SelectProps = {
	isShowContent: boolean
	isActive: boolean
	setActive: () => void
	hasMinus?: boolean
	title: string
	description: string
	list: { id: number, name: string }[]
	currentId: number
	setCurrentId: (newCurrentId: number) => void
	style?: { [key: string]: string }
}

const Select: React.FC<SelectProps> = ({
																				 isShowContent,
																				 isActive,
																				 setActive,
																				 hasMinus = false,
																				 title,
																				 description,
																				 list,
																				 currentId,
																				 setCurrentId,
																				 style = {},
																			 }) => {
	const nodeRef = useRef(null)
	const currentIndex = list.findIndex(({id}) => id === currentId)
	const [controlKeys, setControlKeys] = useState({
		arrowLeft: false,
		arrowRight: false,
	})

	const min = hasMinus ? -1 : 0

	useEffect(() => {
		if (isActive && isShowContent)
			nodeRef.current.scrollIntoView({block: "end", behavior: 'smooth'})
	}, [isActive])

	const handleKeyDown = useCallback(
		// @ts-ignore
		({keyCode}) => {
			if (!isActive) return

			let index = currentIndex

			switch (keyCode) {
				case KeyCodes.ArrowLeft:
					index -= 1
					break;
				case KeyCodes.ArrowRight:
					index += 1
					break;
			}

			const length = list.length - 1
			if (index < min) index = min
			else if (index > length) index = length

			setCurrentId(list[index].id)
		},
		[isActive, currentIndex, list, setCurrentId]
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
					if (currentIndex < min) return
					setControlKeys(prev => ({...prev, arrowLeft: false}))
					break;
				case KeyCodes.ArrowRight:
					if (currentIndex > list.length - 1) return
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
			className={`Select ${isActive && 'active'}`}
			style={style}
			onClick={() => {
				if (isActive) return
				setActive()
			}}
			ref={nodeRef}
		>
			<div className="title">{title}</div>
			<div className="description">{description}</div>
			<div className="control">
				<div
					className={`arrow ${isActive && currentIndex > 0 && 'active'} ${controlKeys.arrowLeft && 'pressed'}`}
					onClick={() => {
						let newIndex = currentIndex - 1
						if(newIndex < min) newIndex = min
						setCurrentId(newIndex)
					}}
				/>
				<div className="current">{list[currentIndex]?.name}</div>
				<div
					className={`arrow ${isActive && currentIndex < list.length - 1 && 'active'} ${controlKeys.arrowRight && 'pressed'}`}
					onClick={() => {
						let newIndex = currentIndex + 1
						const length = list.length - 1
						if(newIndex > length) newIndex = length
						setCurrentId(newIndex)
					}}
				/>
			</div>
		</div>
	);
};

export default Select;
