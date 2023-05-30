import React, {useCallback, useEffect} from 'react';
import './styles.sass'
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {KeyCodes} from "../../../../utils/keyCodes";

interface RangeProps {
	isActive: boolean
	setActive?: () => void
	title: string
	description: string
	min?: number
	max?: number
	step?: number
	startPoint?: number
	value: number
	setValue: (value: number) => void
	style?: {
		[key: string]: string
	}
}

const Range: React.FC<RangeProps> = ({
																			 isActive,
																			 setActive = () => {},
																			 title,
																			 description,
																			 min = -1,
																			 max = 1,
																			 step = .1,
																			 startPoint = 0,
																			 value,
																			 setValue,
																			 style = {},
																		 }) => {

	const handleKeyDown = useCallback(
		// @ts-ignore
		({keyCode}) => {
			if(!isActive) return

			let newValue = value

			switch (keyCode) {
				case KeyCodes.ArrowLeft:
					newValue -= step
					break;
				case KeyCodes.ArrowRight:
					newValue += step
					break;
			}

			if(newValue < min) newValue = min
			else if(newValue > max) newValue = max

			setValue(newValue)
		},
		[isActive, value, step, setValue]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div
			className={`Range ${isActive && 'active'}`}
			style={style}
			onClick={() => {
				if(isActive) return
				setActive()
			}}
		>
			<div className="title">{title}</div>
			<Slider
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={setValue}
				startPoint={startPoint}
				keyboard={false}
			/>
			<div className="description">{description}</div>
		</div>
	);
};

export default Range;
