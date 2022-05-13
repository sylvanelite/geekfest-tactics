//https://burtleburtle.net/bob/rand/smallprng.html (I wrote this PRNG. I place it in the public domain. )
//https://github.com/bryc/code/blob/master/jshash/PRNGs.md (License: Public domain. )
//https://gist.github.com/imneme/85cff47d4bad8de6bdeb671f9c76c814 - The MIT License (MIT)
//JSF / smallprng
// 3-rotate version, improves randomness.

class PRNG{
	static RNG_A=42;
	static RNG_B=1234;
	static RNG_C=5678;
	static RNG_D=9001;

	static prng(seed){
		if(seed){
			PRNG.RNG_A=seed;
			PRNG.RNG_B=seed*10;
			PRNG.RNG_C=seed*100;
			PRNG.RNG_D=seed*1000;
		}
		PRNG.RNG_A |= 0; PRNG.RNG_B |= 0; PRNG.RNG_C |= 0; PRNG.RNG_D |= 0;
		const t = PRNG.RNG_A - (PRNG.RNG_B << 23 | PRNG.RNG_B >>> 9) | 0;
		PRNG.RNG_A = PRNG.RNG_B ^ (PRNG.RNG_C << 16 | PRNG.RNG_C >>> 16) | 0;
		PRNG.RNG_B = PRNG.RNG_C + (PRNG.RNG_D << 11 | PRNG.RNG_D >>> 21) | 0;
		PRNG.RNG_B = PRNG.RNG_C + PRNG.RNG_D | 0;
		PRNG.RNG_C = PRNG.RNG_D + t | 0;
		PRNG.RNG_D = PRNG.RNG_A + t | 0;
		
		return (PRNG.RNG_D >>> 0) / 4294967296;//remove divide to make an int instead of float?
	}
}

export {PRNG};
