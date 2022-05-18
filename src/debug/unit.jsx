import React, {useState} from 'https://cdn.skypack.dev/react';

function Unit(props) {
		/*
		this.hp=1;
		this.atk=5;
		this.point_xy=0;
		this.mov=2;
		this.hasMoved=false;
		this.player_state=cbt_NO_PLAYER_STATE;
		this.min_range=1;
		this.max_range=2;
		this.movCl=st_Character.ch_cl_DEFAULT;
		*/
		
	const changeHp = ()=>{
		props.unit.hp+=1;
		props.unitChange(props.idx,props.unit);
	};
	const changeAtk = ()=>{
		props.unit.atk+=1;
		props.unitChange(props.idx,props.unit);
	};
	const changeMov = ()=>{
		props.unit.mov+=1;
		props.unitChange(props.idx,props.unit);
	};
	const changeMinRange = ()=>{
		props.unit.min_range+=1;
		props.unitChange(props.idx,props.unit);
	};
	const changeMaxRange = ()=>{
		props.unit.max_range+=1;
		props.unitChange(props.idx,props.unit);
	};
	
  //TODO: x,y
  return (<div>
  hp:<span onClick={changeHp}> {props.unit.hp} </span>
  atk:<span onClick={changeAtk}> {props.unit.atk} </span>
  mov:<span onClick={changeMov}> {props.unit.mov} </span>
  min_range:<span onClick={changeMinRange}> {props.unit.min_range} </span>
  max_range:<span onClick={changeMaxRange}> {props.unit.max_range} </span>
  </div>);
}

export {Unit};
