/*

dimensions:

96 px tall on the side
64 px (vertical) through the middle of the top surface
128px (horizontal) through the middle of the top surface

96+64 = 160px total height
template image size: 148x164
(10px padding on horizontal, 2px padding on total vertical)
(gives a center of: padding+width/2 x padding+height/2 
					74x34)
*/


//https://gist.github.com/jordwest/8a12196436ebcf8df98a2745251915b5
const i_x = 1;
const i_y = 0.5;
const j_x = -1;
const j_y = 0.5;

// Sprite size
const w = 128;
const h = 128;

//screen width/2
const start_x = 382;

class Isometric{
	static to_screen_coordinate(tile) {
	  // Accounting for sprite size
	  return {
		x: start_x+tile.x * i_x * 0.5 * w + tile.y * j_x * 0.5 * w,
		y: tile.x * i_y * 0.5 * h + tile.y * j_y * 0.5 * h,
	  };
	}

	// Going from screen coordinate to grid coordinate

	static invert_matrix(a, b, c, d) {
	  // Determinant 
	  const det = (1 / (a * d - b * c));
	  
	  return {
		a: det * d,
		b: det * -b,
		c: det * -c,
		d: det * a,
	  };
	}

	static to_grid_coordinate(screen) {
		screen.x-=start_x;
	  const a = i_x * 0.5 * w;
	  const b = j_x * 0.5 * w;
	  const c = i_y * 0.5 * h;
	  const d = j_y * 0.5 * h;
	  
	  const inv = Isometric.invert_matrix(a, b, c, d);
	  
	  return {
		x: Math.floor(screen.x * inv.a + screen.y * inv.b),
		y: Math.floor(screen.x * inv.c + screen.y * inv.d),
	  };
	}
	
}


export {Isometric};