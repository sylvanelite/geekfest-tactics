import React from 'https://cdn.skypack.dev/react';
import {Sy} from "../state/main.js";

function DebugMenu(props) {
	const hide = "";
	const click = ()=>{
		console.log("here");
		console.log(Sy.cbt_terrain);
	};
	/*
	todo: some kind of save/load button, opens a .json file and stores it into Sy
	then some kind of eidtor: map height/width, terrain, units 
	
	plus the ability to step forward/back in turns?
	
	*/
  return (<div 
		style={{float:"right",display:""}}
		onClick={click}
  >debug</div>);
}

export {DebugMenu};
