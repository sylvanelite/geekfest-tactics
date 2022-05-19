import React, {useState} from 'https://cdn.skypack.dev/react';
import {Bit} from '../state/bit.js';

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
		
	const changeHp = (newHp)=>{
		console.log(newHp);
		props.unit.hp=newHp;
		props.unitChange(props.idx,props.unit);
	};
	const changeAtk = (newAtk)=>{
		props.unit.atk=atk;
		props.unitChange(props.idx,props.unit);
	};
	const changeMov = (newMov)=>{
		props.unit.mov=newMov;
		props.unitChange(props.idx,props.unit);
	};
	const changeMinRange = (newRange)=>{
		props.unit.min_range=newRange;
		props.unitChange(props.idx,props.unit);
	};
	const changeMaxRange = (newRange)=>{
		props.unit.max_range=newRange;
		props.unitChange(props.idx,props.unit);
	};
	const changeX = (newX)=>{
		const [x,y] = Bit.GET_XY(props.unit.point_xy);
		const xy = Bit.SET_XY(newX,y);
		props.unit.point_xy = xy;
		props.unitChange(props.idx,props.unit);
	};
	const changeY = (newY)=>{
		const [x,y] = Bit.GET_XY(props.unit.point_xy);
		const xy = Bit.SET_XY(x,newY);
		props.unit.point_xy = xy;
		props.unitChange(props.idx,props.unit);
	};
	
  //TODO: x,y
  
  const [modal,setModal] = useState(false);
  
  return (<div>
  
  <button onClick={()=>setModal(true)}>{"unit"+props.idx}</button>
  
  <div class={(modal?"modal is-active":"modal")}>
	  <div class={"modal-background"} onClick={()=>setModal(false)}></div>
	  <div class={"modal-content"} style={{backgroundColor:'white'}}>
	  <div class={"section"}>
		  <div class={"columns"}>
			  <div class={"column"}>
				  <div class={"field"}>
					<label class={"label"}>HP</label>
					<div class={"control"}>
						<input class={"input"} type={"number"}  value={props.unit.hp}
							onChange={(e)=>{changeHp(e.target.value)}}
						>
						</input>
					</div>
				  </div>
				  <div class={"field"}>
					<label class={"label"}>atk</label>
					<div class={"control"}>
						<input class={"input"} type={"number"} value={props.unit.atk}
							onChange={(e)=>{changeAtk(e.target.value)}}>
						</input>
					</div>
				  </div>
				  <div class={"field"}>
					<label class={"label"}>mov</label>
					<div class={"control"}>
						<input class={"input"} type={"number"} value={props.unit.mov}
							onChange={(e)=>{changeMov(e.target.value)}}>
						</input>
					</div>
				  </div>
			  </div>
			  <div class={"column"}>
				  <div class={"field"}>
					<label class={"label"}>x</label>
					<div class={"control"}>
						<input class={"input"} type={"number"} value={Bit.GET_X(props.unit.point_xy)}
							onChange={(e)=>{changeX(e.target.value)}}>
						</input>
					</div>
					<label class={"label"}>y</label>
					<div class={"control"}>
						<input class={"input"} type={"number"} value={Bit.GET_Y(props.unit.point_xy)}
							onChange={(e)=>{changeY(e.target.value)}}>
						</input>
					</div>
				  </div>
				  <div class={"field"}>
					<label class={"label"}>min_range</label>
					<div class={"control"}>
						<input class={"input"} type={"number"} value={props.unit.min_range}
							onChange={(e)=>{changeMinRange(e.target.value)}}>
						</input>
					</div>
				  </div>
				  <div class={"field"}>
					<label class={"label"}>max_range</label>
					<div class={"control"}>
						<input class={"input"} type={"number"} value={props.unit.max_range}
							onChange={(e)=>{changeMaxRange(e.target.value)}}>
						</input>
					</div>
				  </div>
			  </div>
		  </div>
	  </div>
	  </div>
	  <button class={"modal-close is-large"} aria-label={"close"} onClick={()=>setModal(false)}></button>
	</div>
  
  </div>);
}

export {Unit};
