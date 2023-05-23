import React, {useEffect, useRef, useState} from 'react';
import './styles.sass'
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {CSSTransition} from "react-transition-group";
import {PageIds} from "../../types";
import {authActions} from "../../reducer";
import Logo from "../../components/Logo";
import {calcVh} from "../../../../utils/calcVh";

const DisclaimerPage: React.FC = () => {
	const [isShowContent, setIsShowContent] = useState(false)
	const dispatch = useAppDispatch()
	const {isOpen, page, disclaimerDuration} = useAppSelector(state => state.auth)
	const isAnimIn = isOpen && page === PageIds.Disclaimer
	const timeoutRef = useRef(null)

	useEffect(() => {
		clearTimeout(timeoutRef.current)
		if(isAnimIn && disclaimerDuration) {
			timeoutRef.current = setTimeout(() => {
				dispatch(authActions.setPage(PageIds.SignIn))
			}, disclaimerDuration * 1000)
		}
	}, [isAnimIn])

	return (
		<CSSTransition
			in={isAnimIn}
			timeout={750}
			mountOnEnter
			unmountOnExit
			classNames='DisclaimerPage'
			onEntering={() => setIsShowContent(true)}
			onExit={() => setIsShowContent(false)}
		>
			<div className='DisclaimerPage'>
				<div className="bg">
					<div className="lights">
						<div className="light yellow"/>
						<div className="light blue"/>
						<div className="light pink"/>
					</div>
					<div className="lines"/>
				</div>
				<Logo isShowAnim={isShowContent} style={{marginBottom: calcVh(50)}}/>
				<CSSTransition in={isShowContent} timeout={300} mountOnEnter unmountOnExit classNames='text'>
					<div className="text">
						Los Santos Journey is not affiliated with or endorsed by Take-Two, Rockstar North Interactive or any other rights holder. All trademarks used belong to their respective owners and are not affiliated with or endorsed by Take-Two, Rockstar North Interactive.
					</div>
				</CSSTransition>
				<CSSTransition in={isShowContent} timeout={300} mountOnEnter unmountOnExit classNames='text'>
					<div className="progress">
						<div className="line" style={{ animationDuration: `${disclaimerDuration}s` }}/>
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	);
};

export default DisclaimerPage;
