import React from 'react';
import './styles.sass'
import {CSSTransition} from "react-transition-group";

interface ICheckboxProps {
	text: string
	isShowAnim: boolean
	style?: { [key: string]: string }
	checked: boolean
	setChecked: (newValue: boolean) => void
}

const Checkbox: React.FC<ICheckboxProps> = ({text, isShowAnim, style, checked, setChecked}) => {

	return (
		<CSSTransition in={isShowAnim} timeout={{enter: 600, exit: 300}} mountOnEnter unmountOnExit classNames='Checkbox'>
			<div className={`Checkbox ${checked && 'active'}`} style={style} onClick={() => setChecked(!checked)}>
				<div className='box'>
					<div className="tick"/>
				</div>
				<div className="text">{text}</div>
			</div>
		</CSSTransition>
	);
};

export default Checkbox;
