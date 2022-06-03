//bit manipulation helper functions 
class Bit {
	static GET_HIGH_BYTE(a){ return( a >> 8 & 0xFF);}
	static GET_LOW_BYTE(a){ return( a & 0xFF);}
	static GET_X(a){return Bit.GET_HIGH_BYTE(a)}//more readable to say X,Y rather than high/low for points
	static GET_Y(a){return Bit.GET_LOW_BYTE(a);}
	static BIT_CHECK(a,b){return  (!!((a) & (0x01<<(b))));}

	static SET_HIGH_BYTE(a,b){ (a=(a & 0xFF00FF) | ((b & 0xFF) << 8));return a;}
	static SET_LOW_BYTE(a,b){ a = (a & 0xFFFF00) | (b & 0xFF);return a;}
	static SET_X(a,b){return Bit.SET_HIGH_BYTE(a,b);};
	static SET_Y(a,b){return Bit.SET_LOW_BYTE(a,b);};
	static SET_XY(x,y){ let ret = 0; ret=Bit.SET_X(ret,x); ret=Bit.SET_Y(ret,y); return ret;}//returns an int with x,y packed
	static BIT_SET(a,b){ ((a) |= (0x01<<(b)));return a;}
	static BIT_CLEAR(a,b){ ((a) &= ~(0x01<<(b)));return a;}

	//should be ok. max int is 53 bits in JS. this is used as a micro-optimisation in flood fill for move
	static SET_HIGHER_BYTE(a,b){ (a=(a & 0x00FFFF) | ((b & 0xFF) << 16));return a;}
	static GET_HIGHER_BYTE(a){ return( a >> 16 & 0xFF);}
	
	//use object destructuring to return x&y
	static GET_XY(xy){
		const x=Bit.GET_X(xy); 
		const y=Bit.GET_Y(xy);
		return [x,y];
	}
	
}
export {Bit};
