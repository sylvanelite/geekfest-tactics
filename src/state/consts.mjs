//battle states
const cbt_PLAYER= 0;
const cbt_ENEMY= 1;
const cbt_NO_PLAYER_STATE= 2;
const cbt_STATE_IDLE= 0;
const cbt_STATE_DISPLAY_MOVE= 1;
const cbt_STATE_SELECT_WEAPON_TARGET= 2;
class st_Character{//"st" prefix indicates it's struct-like. 
                   //All vars are 'simple' data types (numbers) not strings or objects
	static ch_cl_DEFAULT=0;//TODO: replace this with bit flag of skills
	constructor(){
		this.hp=1;
		this.atk=5;
		this.point_xy=0;
		this.mov=2;
		this.hasMoved=false;
		this.player_state=cbt_NO_PLAYER_STATE;
		this.min_range=1;
		this.max_range=2;
		this.movCl=st_Character.ch_cl_DEFAULT;
	}
}
const cbt_NULL_CHARACTER = new st_Character();//NOTE: don't compare to null directly, compare player_state instead.

export {
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_NO_PLAYER_STATE,
	cbt_STATE_IDLE,
	cbt_STATE_DISPLAY_MOVE,
	cbt_STATE_SELECT_WEAPON_TARGET,
	st_Character,
	cbt_NULL_CHARACTER
};