import React, {useCallback, useEffect, useRef, useState} from 'react';
import './styles.sass'

type FaceXYProps = {
	isShowContent: boolean
	isActive: boolean
	idx: number
	titleRef: React.RefObject<HTMLDivElement>
	setActive: () => void
	helpers: {
		x: [string, string]
		y: [string, string]
	}
	current: {
		x: number,
		y: number,
	}
	setCurrent: (newCurrent: { x: number, y: number }) => void
	style?: { [key: string]: string }
}

const FaceXY: React.FC<FaceXYProps> = ({
																				 isShowContent,
																				 isActive,
																				 idx,
																				 titleRef,
																				 setActive,
																				 helpers,
																				 current,
																				 setCurrent,
																				 style = {},
																			 }) => {
	const nodeRef = useRef(null)
	const [dragData, setDragData] = useState({
		isActive: false,
		x: 0,
		y: 0,
	})
	const debounceTimer = useRef(null)
	const [debounce, setDebounce] = useState(false)

	useEffect(() => {
		if (isActive && isShowContent) {
			if (idx === 0)
				titleRef.current?.scrollIntoView({block: "end", behavior: 'smooth'})
			else
				nodeRef.current.scrollIntoView({block: "end", behavior: 'smooth'})
		}
	}, [isActive, isShowContent, idx, titleRef])

	useEffect(() => {
		let {x, y} = dragData
		setCurrent({x, y})
	}, [dragData])

	const handleMouseUp = useCallback(() => {
		if (!isActive) return
		setDragData(prev => ({...prev, isActive: false}))
	}, [isActive, dragData, setDragData])

	useEffect(() => {
		document.addEventListener('mouseup', handleMouseUp)
		return () => {
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [handleMouseUp])

	const getPercents = (value: number) => value * 50

	const getOffset = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement
		const rect: DOMRect = target.getBoundingClientRect()
		const x = ((event.clientX - rect.left) / 170 * 2 - 1)
		const y = ((event.clientY - rect.top) / 170 * 2 - 1)
		return {x, y}
	}

	const handleMouseDown = (event: React.MouseEvent) => {
		if (!isActive) return
		let {x, y} = getOffset(event)
		setDragData({isActive: true, x, y})
	}

	const handleMouseMove = (event: React.MouseEvent) => {
		if (debounce || !dragData.isActive) return
		clearTimeout(debounceTimer.current)
		setDebounce(true)
		debounceTimer.current = setTimeout(() => setDebounce(false), 25)
		let {x, y} = getOffset(event)
		setDragData(prev => ({...prev, x, y}))
	}

	return (
		<div
			className={`FaceXY ${isActive && 'active'}`}
			style={style}
			onClick={() => {
				if (isActive) return
				setActive()
			}}
			ref={nodeRef}
		>
			<div className="helpers">
				<div className="block x">
					<div className={`helper ${current.x > 0 && 'active'}`}>{helpers.x[1]}</div>
					<div className={`helper ${current.x < 0 && 'active'}`}>{helpers.x[0]}</div>
				</div>
				<div className="block y">
					<div className={`helper ${current.y < 0 && 'active'}`}>{helpers.y[1]}</div>
					<div className={`helper ${current.y > 0 && 'active'}`}>{helpers.y[0]}</div>
				</div>
			</div>
			<div
				className="block"
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
			>
				<div
					className="circle"
					style={{
						top: `${50 + getPercents(dragData.isActive ? dragData.y : current.y)}%`,
						left: `${50 + getPercents(dragData.isActive ? dragData.x : current.x)}%`,
					}}
				/>
			</div>
		</div>
	);
};

export default FaceXY;
