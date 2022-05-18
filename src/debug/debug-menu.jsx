import React, {useState} from 'https://cdn.skypack.dev/react';

import {Unit} from "./unit.js";
import {Terrain} from "./terrain.js";

import {Bit} from "../state/bit.mjs";
import {Sy} from "../state/main.js";
import {Sy_api as api} from "../state/api.js";
import {
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_NO_PLAYER_STATE,
	st_Character,
} from "../state/consts.js";

const initialUnits = ()=>{
	const ch0 = new st_Character();
	const ch1 = new st_Character();
	const ch2 = new st_Character();
	const ch3 = new st_Character();

	ch0.player_state = cbt_PLAYER;
	ch0.point_xy = Bit.SET_XY(0,0);
	ch1.player_state = cbt_PLAYER;
	ch1.point_xy = Bit.SET_XY(1,0);
	ch2.player_state = cbt_ENEMY;
	ch2.point_xy = Bit.SET_XY(1,3);
	ch3.player_state = cbt_ENEMY;
	ch3.point_xy = Bit.SET_XY(1,4);
	return [ch0,ch1,ch2,ch3];
};
const initialTerrain = ()=>{
	return {
		width:3,
		height:5,
		terrain:[
		1 ,1 ,1 ,
		99,1 ,1 ,
		99,1 ,1 ,
		1 ,1 ,99,
		1 ,1 ,99,
		]
	};
};

function DebugMenu(props) {
	
	const [terrainData,setTerrain] = useState(initialTerrain());
	const [unitData,setUnits] = useState(initialUnits());
	
	const click = ()=>{
		console.log("debug");
	};
	const apply = ()=>{
		console.log("apply");
		api.api_generateRoom(42,terrainData,unitData);
	};
	
	
	const units = ()=>{
		const playerUnits = [];
		const enemyUnits = [];
		const unitClick = (idx,newUnit)=>{
			setUnits((oldUnits)=>{
				const unt = [];
				for(const unit of oldUnits){//shallow copy of unchanged units.
					unt.push(unit);
				}
				unt[idx]=newUnit;
				return unt;
			});
		};
		
		for(let i=0;i<unitData.length;i+=1){
			const ch = unitData[i];
			const res = (ch.player_state == cbt_PLAYER?playerUnits:enemyUnits);
			res.push(<Unit unit={ch} unitChange={unitClick} idx={i}/>);
		}
		
		return (<div>
		Units(P):
			{playerUnits}
			Units(E):
			{enemyUnits}
		</div>);
		
	}
	const terrain = ()=>{
		const res = [];
		const cellClick =(idx,newCost)=>{
			setTerrain((oldTerrain)=>{
				const ter = oldTerrain.terrain.slice();
				ter[idx]=newCost;
				return {
					width:oldTerrain.width,
					height:oldTerrain.height,
					terrain:ter
				};
			});
		};
		let idx = 0;
		for(let j=0;j<terrainData.height;j+=1){
			for(let i=0;i<terrainData.width;i+=1){
				let ch = " ";
				const terrain = terrainData.terrain[idx];//TODO: should pass this in to Sy to read from state?
				res.push(<Terrain cost={terrain} cellChange={cellClick}  idx={idx}/>);
				idx+=1;
			}
			res.push(<br/>)
		}
		return (<div>
		{res}
		</div>);
	}
	const enemyUnits = ()=>{
		
	}
	
	
	
  return (<div style={{float:"right",display:""}}>
  <div onClick={click}> debug</div>
  
  <button onClick={apply} >apply</button>
  
  {terrain()}
  {units()}
	
  </div>);
}

export {DebugMenu};
