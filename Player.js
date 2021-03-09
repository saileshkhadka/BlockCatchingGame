

var playerVShaderID = "vertexShader";
var playerFShaderID = "green";
var numOfPoints = 0;

var Player = function (gl) {
	this.gl = gl;
	this.points = [vec2( -.15,-.925),vec2( .15,-.925),vec2( .15,-.975),vec2( -.15,-.975)];
	this.leftTopMax = 0;
	this.rightBottomMax = 2;
	numOfPoints = this.points.length;
	this.shiftX = 0;
	this.shiftY = 0;
	this.deltaTrans = 0.03;
	this.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );
	gl.bufferData( gl.ARRAY_BUFFER,	flatten(this.points), gl.STATIC_DRAW );
	this.velocity = 0;
	
	
	this.attachShaders();
}

Player.prototype.attachShaders = function() {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, document.getElementById(playerVShaderID).text);
    gl.compileShader(vertexShader);
	
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader, document.getElementById(playerFShaderID).text);
	gl.compileShader(fragShader);
	
	this.shaderProgram = gl.createProgram();
	this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
	this.gl.linkProgram(this.shaderProgram);
}

Player.prototype.attachVariables = function() {
	var myPosition = this.gl.getAttribLocation(this.shaderProgram, "myPosition");
	this.gl.vertexAttribPointer( myPosition, 2, this.gl.FLOAT, false, 0, 0 );
	this.gl.enableVertexAttribArray( myPosition );
	
	this.xshiftLoc = this.gl.getUniformLocation(this.shaderProgram,"xshift");
	this.gl.uniform1f(this.xshiftLoc,this.shiftX);
	this.yshiftLoc = this.gl.getUniformLocation(this.shaderProgram,"yshift");
}

Player.prototype.moveX = function(forward, timestep) {
	var change = forward ? this.deltaTrans : -this.deltaTrans;
	change *= timestep/25;
	if (this.points[this.leftTopMax][0] + change >= -1.01 && this.points[this.rightBottomMax][0] + change < 1.01) {
		this.shiftX += change;
		for (var i=0; i<this.points.length;i++) {
		this.points[i][0] = this.points[i][0]+change;
		}
	}
}

Player.prototype.moveY = function(forward) {
}



Player.prototype.render = function(left, right, timestep) {
	gl.useProgram(this.shaderProgram);
	gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );
	if (left)
		this.moveX(false, timestep);
	if (right)
		this.moveX(true, timestep);
	this.attachVariables();
	this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.points.length);
	//window.requestAnimFrame(this.render);
}