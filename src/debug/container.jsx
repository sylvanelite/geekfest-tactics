import React, {useState,useEffect} from 'https://cdn.skypack.dev/react';
import { DebugMenu } from  './debug-menu.js';


const DebugContainer = (props) => {
	const [debug, setDebug] = useState(true);
	
	let debugElem = null;
	if(props.enabled){
		debugElem=(debug?(
		<div class={"column"}>
			<button onClick={()=>setDebug(false)}>hide</button>
			<DebugMenu />
		</div>):
		<div class={"column is-1"}>
			<button onClick={()=>setDebug(true)}>show</button>
		</div>);
	}
	
  return (<div>
		{debugElem}
		</div>
  );
}

export {DebugContainer};
