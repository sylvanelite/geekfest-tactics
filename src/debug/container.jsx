import React, {useState,useEffect} from 'https://cdn.skypack.dev/react';
import { DebugMenu } from  './debug-menu.js';


const DebugContainer = (props) => {
	
	if(!props.enabled){
		return null;
	}
	
	const [debug, setDebug] = useState(true);
	
	let debugStyle = "column is-3";
	if(!debug){
		debugStyle = "column is-1";
	}
	const debugElem=(debug?(
	<div >
		<button onClick={()=>setDebug(false)}>hide</button>
		<DebugMenu />
	</div>):
	<div >
		<button onClick={()=>setDebug(true)}>show</button>
	</div>);

	
  return (<div class={debugStyle}>
		{debugElem}
		</div>
  );
}

export {DebugContainer};
