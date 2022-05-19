import React, {useState} from 'https://cdn.skypack.dev/react';

function Terrain(props) {
	
	const click = (e)=>{
		if(e.button==0){//left click
			props.cost+=1;
		}
		if(e.button==2){//right click
			props.cost-=1;
		}
		props.cellChange(props.idx,props.cost);
		return false;
	};
	
  return (<span onClick={click} style={{ userSelect: 'none'}} onContextMenu={(e)=>{click(e);e.preventDefault();return false;}}>
  {props.cost}
  </span>);
}

export {Terrain};
