import React from 'react';
import './styles.sass'
import {ButtonIcon, ButtonType} from "../../types";

interface IButtonProps {
	text: string
	style?: { [key: string]: string }
	type: ButtonType
	onClick?: () => void
	icon: ButtonIcon,
}

const Button: React.FC<IButtonProps> = ({
																					text,
																					style = {},
																					type,
																					onClick = () => {
																					},
																					icon,
																				}) => {

	return (
			<div
				className={`Button type-${type}`}
				style={style}
				onClick={onClick}>
				<div className="text">{text}</div>
				<div className={`icon icon-${icon}`}/>
			</div>
	);
};

export default Button;
