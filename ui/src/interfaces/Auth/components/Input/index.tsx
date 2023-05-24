import React, {useRef, useState} from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";

interface IInputProps {
	isShowAnim: boolean
	style: { [key: string]: string }
	placeholder: string
	value: string
	setValue: (newValue: string) => void
	hasEye?: boolean
}

const Input: React.FC<IInputProps> = ({
																				isShowAnim,
																				style,
																				placeholder,
																				value,
																				setValue,
																				hasEye
																			}) => {

	const [isHiddenValue, setIsHiddenValue] = useState(false)
	const inputRef = useRef(null)

	return (
		<CSSTransition in={isShowAnim} timeout={{enter: 600, exit: 300}} mountOnEnter unmountOnExit classNames='Input'>
			<div className="Input" style={style}>
				<input
					ref={inputRef}
					type={isHiddenValue ? "password" : "text"}
					placeholder={placeholder}
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
				<div className="bg"/>
				{hasEye && (
					<div
						className={`eye ${isHiddenValue && 'hidden'}`}
						onClick={() => {
							setIsHiddenValue(prev => !prev)
							inputRef.current?.focus()
						}}/>
				)}
			</div>
		</CSSTransition>
	);
};

export default Input
