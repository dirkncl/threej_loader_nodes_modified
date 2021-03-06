/**
 * @author sunag / http://www.sunag.com.br/
 */


/*
dependency :  (path+'core/TempNode.js');
dependency :  (path+'core/FunctionNode.js');
dependency :  (path+'inputs/FloatNode.js');
dependency :  (path+'inputs/Vector2Node.js');
dependency :  (path+'accessors/UVNode.js');
*/
//var BLURX = fs.readFileSync(path+'effects/blurX.glsl');
//var BLURY = fs.readFileSync(path+'effects/blurY.glsl');
var buff = fs.readFileSync(path+'effects/BlurNode.gpu');
var Shaders = bufferGPUParse(buff);
var BLURX = Shaders['blurX'];
var BLURY = Shaders['blurY'];

function BlurNode( value, uv, radius, size ) {

	TempNode.call( this, 'v4' );

	this.value = value;
	this.uv = uv || new UVNode();
	this.radius = new Vector2Node( 1, 1 );

	this.size = size;

	this.blurX = true;
	this.blurY = true;

	this.horizontal = new FloatNode( 1 / 64 );
	this.vertical = new FloatNode( 1 / 64 );

}

BlurNode.Nodes = ( function () {

	var blurX = new FunctionNode( BLURX);

	var blurY = new FunctionNode( BLURY);

	return {
		blurX: blurX,
		blurY: blurY
	};

} )();


BlurNode.prototype = Object.create( TempNode.prototype );
BlurNode.prototype.constructor = BlurNode;
BlurNode.prototype.nodeType = "Blur";

BlurNode.prototype.updateFrame = function ( frame ) {

	if ( this.size ) {

		this.horizontal.value = this.radius.x / this.size.x;
		this.vertical.value = this.radius.y / this.size.y;

	} else if ( this.value.value && this.value.value.image ) {

		var image = this.value.value.image;

		this.horizontal.value = this.radius.x / image.width;
		this.vertical.value = this.radius.y / image.height;

	}

};

BlurNode.prototype.generate = function ( builder, output ) {

	if ( builder.isShader( 'fragment' ) ) {

		var blurCode = [], code;

		var blurX = builder.include( BlurNode.Nodes.blurX ),
			blurY = builder.include( BlurNode.Nodes.blurY );

		if ( this.blurX ) {

			blurCode.push( blurX + '( ' + this.value.build( builder, 'sampler2D' ) + ', ' + this.uv.build( builder, 'v2' ) + ', ' + this.horizontal.build( builder, 'f' ) + ' )' );

		}

		if ( this.blurY ) {

			blurCode.push( blurY + '( ' + this.value.build( builder, 'sampler2D' ) + ', ' + this.uv.build( builder, 'v2' ) + ', ' + this.vertical.build( builder, 'f' ) + ' )' );

		}

		if ( blurCode.length == 2 ) code = '( ' + blurCode.join( ' + ' ) + ' / 2.0 )';
		else if ( blurCode.length ) code = '( ' + blurCode[ 0 ] + ' )';
		else code = 'vec4( 0.0 )';

		return builder.format( code, this.getType( builder ), output );

	} else {

		console.warn( "THREE.BlurNode is not compatible with " + builder.shader + " shader." );

		return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

	}

};

BlurNode.prototype.copy = function ( source ) {

	TempNode.prototype.copy.call( this, source );

	this.value = source.value;
	this.uv = source.uv;
	this.radius = source.radius;

	if ( source.size !== undefined ) this.size = new THREE.Vector2( source.size.x, source.size.y );

	this.blurX = source.blurX;
	this.blurY = source.blurY;

};

BlurNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.value = this.value.toJSON( meta ).uuid;
		data.uv = this.uv.toJSON( meta ).uuid;
		data.radius = this.radius.toJSON( meta ).uuid;

		if ( this.size ) data.size = { x: this.size.x, y: this.size.y };

		data.blurX = this.blurX;
		data.blurY = this.blurY;

	}

	return data;

};

