import './styles.sass';
import React, {useEffect} from "react";
import {useAppSelector} from "../../hooks/redux";
import {Notification} from "./types";
import {useDispatch} from "react-redux";
import {notificationsActions} from "./reducer";
import {NotificationPositions} from "../../../../shared/notifications/types";

const Notifications: React.FC = () => {
	const dispatch = useDispatch()
	const {list, rendered} = useAppSelector(state => state.notifications)

	useEffect(() => {
		// @ts-ignore
		window.sendNotify = (data) => dispatch(notificationsActions.send(data))
		// @ts-ignore
		window.removeNotify = (id) => {
			dispatch(notificationsActions.removeFromRendered(id))
			setTimeout(() => {
				dispatch(notificationsActions.removeFromList(id))
			}, 500)
		}
	}, [])

	const renderList = (list: Notification[]) => list.map(({id, type, text}) => {
		const animationName = ~rendered.indexOf(id) ? 'enter' : 'exit'
		return (
			<div
				className={`Notify type-${type}`}
				key={id}
				style={{
					animation: `.4s ease 0s 1 normal none running ${animationName}`,
				}}>
				{text}
			</div>
		)
	})

	return (
		<>
			<div className="NotificationsList topLeft">
				{renderList(list.filter(({position}) => position === NotificationPositions.TopLeft))}
			</div>
			<div className="NotificationsList bottom">
				{renderList(list.filter(({position}) => position === NotificationPositions.Bottom).reverse())}
			</div>
		</>
	);
};

export default Notifications;
