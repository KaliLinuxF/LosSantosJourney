import React from 'react';
import './index.sass'
import rpc from '../../shared/rpc';
import Auth from "./interfaces/Auth";
import Notifications from "./interfaces/Notifications";
import { SOUNDS_LIST } from './utils/audio/list';
import {useAppDispatch} from "./hooks/redux";
import {Howl} from "howler";

// @ts-ignore
window.soundSystem = {
	list: {},
	banList: [],
}

// @ts-ignore
const playSound = ({ file, volume = 0.1, loop = false }) => {
	// @ts-ignore
	const { list } = window.soundSystem;
	const dir = file.split('/')[0];
	const isListHasFile = SOUNDS_LIST.hasOwnProperty(file);
	const isFileLooped = loop && list.hasOwnProperty(file);
	// @ts-ignore
	const isFileBanned = ~window.soundSystem.banList.indexOf(dir);
	if (!isListHasFile || isFileLooped || isFileBanned) return;
	let sound = new Howl({
		// @ts-ignore
		src: [SOUNDS_LIST[file]],
		autoplay: true,
		loop,
		volume,
		onend: () => {
			if(!loop) {
				// @ts-ignore
				this.unload()
			}
		},
	});
	if (!loop) return sound.off();
	list[file] = sound;
};
// @ts-ignore
window.soundSystem.playSound = playSound;

const stopSound = (file: string) => {
	// @ts-ignore
	const { list } = window.soundSystem;
	if (!list.hasOwnProperty(file)) return;
	list[file].unload();
	delete list[file];
};
// @ts-ignore
window.soundSystem.stopSound = stopSound;

// @ts-ignore
Object.keys(SOUNDS_LIST).forEach((file) => window.soundSystem.playSound({ file, volume: 0 }));

const App: React.FC = () => {
	const dispatch = useAppDispatch()
	rpc.register('executeRpc', (action: any) =>{
		console.log(action)
		dispatch(action)
	})

	return (
		<>
			<Auth/>
			<Notifications/>
		</>
	);
};

export default App;
