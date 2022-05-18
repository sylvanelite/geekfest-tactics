import React, {useState} from 'https://cdn.skypack.dev/react';

function Terrain(props) {
	
	const click = ()=>{
		props.cost+=1;
		props.cellChange(props.idx,props.cost);
	};
	
  return (<span onClick={click}>
  {props.cost}
  </span>);
}

export {Terrain};
