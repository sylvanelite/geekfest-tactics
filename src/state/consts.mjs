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
	
	static #generateId() {
	  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	  );
	}
	
	constructor(ch){
		
		this.level=0;
		this.hp=2;
		this.max_hp=2;
		this.atk=1;
		this.point_xy=0;
		this.mov=2;
		this.hasMoved=false;
		this.player_state=cbt_NO_PLAYER_STATE;
		this.min_range=1;
		this.max_range=1;
		this.movCl=st_Character.ch_cl_DEFAULT;
		
		//TODO: for display
		//this.sprite_monster = '';
		
		//for display (sprite generation)
		this.sprite_gender='male';
		this.sprite_front_arm=0;
		this.sprite_back_arm=0;
		this.sprite_torso=0;
		this.sprite_back=0;
		this.sprite_weapon=0;
		this.sprite_headgear=0;
		
		this.sprite_base_hair=0;
		this.sprite_back_hair=0;
		this.sprite_front_hair=0;
		this.sprite_ear=0;
		this.sprite_eyebrow=0;
		this.sprite_eyes=0;
		this.sprite_mouth=0;
		this.sprite_nose=0;
		this.sprite_head=0;

		this.sprite_a_wing=0;
		this.sprite_a_necklace=0;
		this.sprite_a_cape=0;
		this.sprite_a_face=0;
		this.sprite = null;
		
		//for UI purposes, to track ch between state transitionas
		this.id = st_Character.#generateId();
		//constructor
		if(ch){
			const keys = Object.keys(ch);
			for(const key of keys){
				this[key] = ch[key];
			}
		}
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