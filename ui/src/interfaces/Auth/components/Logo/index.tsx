import React from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";

interface ILogoProps {
	isShowAnim: boolean
	style: { [key: string]: string }
}

const Logo: React.FC<ILogoProps> = ({isShowAnim, style}) => {

	return (
		<CSSTransition in={isShowAnim} timeout={{ enter: 600, exit: 300 }} mountOnEnter unmountOnExit classNames='Logo'>
			<div className="Logo" style={style}/>
		</CSSTransition>
	);
};

export default Logo;
