import React, {useEffect, useState} from 'react';
import './styles.sass'
import {useAppDispatch} from "../../hooks/redux";
import { createCharActions } from "./reducer";
import MainPage from "./pages/MainPage";
import Categories from "./components/Categories";
import CategoryPage from "./pages/CategoryPage";
import {CreateCharApiEventNames, CreateCharApiUpdateData} from "../../../../shared/CharacterCreator/api";
import {CharacterDataType} from "../../../../shared/CharacterCreator/CharacterDataType";
import rpc from "../../../../shared/rpc";

export const callUpdateData = (type: CharacterDataType, dataObj: any) => {
	const event = CreateCharApiEventNames.UpdateData
	const data: CreateCharApiUpdateData = {
		type,
		data: dataObj,
	}
	rpc.callClient(event, data)
}

const CreateChar: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		// setTimeout(() => {
		// 	dispatch(createCharActions.show())
		// }, 100)
		// @ts-ignore
		// window.show = () => dispatch(createCharActions.show())
		// @ts-ignore
		// window.hide = () => dispatch(createCharActions.hide())
	}, [])

	return (
		<div className='CreateChar'>
			<MainPage/>
			<Categories/>
			<CategoryPage/>
		</div>
	);
};

export default CreateChar;
