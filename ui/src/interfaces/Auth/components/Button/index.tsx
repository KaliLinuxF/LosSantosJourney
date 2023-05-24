import React from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";
import {ButtonType} from "../../types";

interface IButtonProps {
	text?: string
	isShowAnim: boolean
	style?: { [key: string]: string }
	type: ButtonType
	arrowState?: 'none' | 'right' | 'left'
	square?: boolean
	disabled?: boolean
	onClick?: () => void
	centeredText?: boolean
}

const Button: React.FC<IButtonProps> = ({
																					text,
																					isShowAnim,
																					style = {},
																					type,
																					arrowState = 'none',
																					square,
																					disabled,
																					onClick = () => {
																					},
																					centeredText,
																				}) => {

	return (
		<CSSTransition in={isShowAnim} timeout={{enter: 600, exit: 300}} mountOnEnter unmountOnExit classNames='Button'>
			<div
				className={`Button ${square && 'square'} ${disabled && 'disabled'} type-${type} ${centeredText && 'centeredText'}`}
				style={style}
				onClick={onClick}>
				{text}
				{arrowState !== 'none' && <div className={`arrow ${arrowState === "left" && 'back'}`}/>}
			</div>
		</CSSTransition>
	);
};

export default Button;
