# BlockCatcher
This is a WebGL game in which you must catch as many blocks as possible until time runs out. 250 points is considered a win.

## Controls:

	Move Player Bar Left/Right - Left/Right Arrow Keys
	Start Game - SPACE
		
	Red Blocks - 1 points
	Blue Blocks - 5 points
	White Blocks - 25 points

## The objective is to catch blocks with the player bar before they fall off the screen using the left and right arrowkeys. 

##  implementation:

To create this game we used classes to implement our player bar as well as the blocks. This allowed us to
keep track of their vertices' position as well as color, speed, size, and point value. After the game is started, a timer
counts down from 1 minute and a block is generated every second that passes. Interation between the player bar and block
is determined when the lower 2 vertices of a block are below the the y value of the player bar's top vertices and within
the x values of the player bar. if interaction is successful, the points will be added to the score and the block will be
deleted. Even without interaction, the blocks will continue to fall below the canvas before they get deleted at a certain
height. Movement of the blocks and player bar is controlled by a translation matrix within the vertex shader and each block
type has its own fragment shader.
