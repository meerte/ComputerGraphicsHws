var canvas;
var gl;
var program;
var vPosition;

var letter1vertices, letter2vertices;
var buffer1, buffer2;

// TODO: define any global variables you need
var vColor;
var posX = 0.0;
var posY = 0.0;
var scaleX = 1.0;
var scaleY = 1.0;
var redSlider = 1.0;
var greenSlider = 0.0;
var blueSlider = 0.0;


window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create geometry data
    // M
    letter1vertices = [

        vec2(-0.7, -0.4), //0
        vec2(-0.6, -0.4),  // 1 
        vec2(-0.7, 0.3), // 2

        vec2(-0.6, 0.3), // 3
        vec2(-0.4, -0.1), // 5
        vec2(-0.4, -0.3), //7

        vec2(-0.7, 0.3), // 2
        vec2(-0.4, -0.1), // 5
        vec2(-0.4, -0.3), // 7
 
        vec2(-0.1, 0.3), // 10
        vec2(-0.2, 0.3), // 11
        vec2(-0.1, -0.4), // 9

        vec2(-0.2, -0.4), // 8
        vec2(-0.1, 0.3), // 10
        vec2(-0.2, 0.3), // 11
        vec2(-0.4, -0.1)// 5


];
// E
letter2vertices =  [
        vec2(0.1, -0.4), // 0
        vec2(0.2, -0.4), // 1
        vec2(0.1, 0.3), // 3

        vec2(0.2, 0.3), // 2
        vec2(0.6, 0.3), // 4
        vec2(0.2, 0.2), // 14

        vec2(0.6, 0.2), // 5
        vec2(0.1, 0.2), // 6
        vec2(0.2, 0.2), // 14

        vec2(0.1, 0.0), // 7
        vec2(0.1, -0.1), // 8
        vec2(0.6, 0.0), // 10

        vec2(0.6, -0.1), // 9
        vec2(0.1, -0.1), // 8
        vec2(0.1, 0.0), // 7

        vec2(0.1, -0.4), // 0
        vec2(0.2, -0.4), // 1
        vec2(0.6, -0.3), // 12

        vec2(0.6, -0.4), // 13
        vec2(0.1, -0.3), // 11
        vec2(0.1, -0.4), // 0

];
    // TODO: create vertex coordinates for your initial letters instead of these vertices

    // Load the data into the GPU		
	buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );  
  
    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );
    
    
    vColor = gl.getUniformLocation(program, "vColor"); 
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);  

	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posX = (event.target.value );
    };    
    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posY = (event.target.value );
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleX = event.target.value;
    };
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleY = event.target.value;
    };  
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        redSlider = event.target.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        greenSlider = event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        blueSlider = event.target.value;
    };

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // TODO: Send necessary uniform variables to shader and 
    // perform draw calls for drawing letters
    gl.uniform4fv(vColor, vec4(redSlider, greenSlider, blueSlider, 1));
    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    gl.uniform1f(gl.getUniformLocation(program, "posX"), posX);
    gl.uniform1f(gl.getUniformLocation(program, "posY"), posY);
    gl.uniform1f(gl.getUniformLocation(program, "scaleX"), scaleX);
    gl.uniform1f(gl.getUniformLocation(program, "scaleY"), scaleY);
    // draw triangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter1vertices.length)
    

    gl.uniform4fv(vColor, vec4(1 - redSlider, 1 - greenSlider, 1 - blueSlider, 1));
	// bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
    gl.uniform1f(gl.getUniformLocation(program, "posX"), posX);
    gl.uniform1f(gl.getUniformLocation(program, "posY"), posY);
    gl.uniform1f(gl.getUniformLocation(program, "scaleX"), scaleX);
    gl.uniform1f(gl.getUniformLocation(program, "scaleY"), scaleY);

    // draw rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter2vertices.length)

    window.requestAnimFrame(render);
}
