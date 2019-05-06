/**
 * @author sunag / http://www.sunag.com.br/
 */

/*
dependency :  (path+'core/TempNode.js');
dependency :  (path+'core/ConstNode.js');
dependency :  (path+'core/FunctionNode.js');
*/

var buff = fs.readFileSync(path+'effects/ColorAdjustmentNode.gpu');
var Shaders = bufferGPUParse(buff);
var luma = Shaders['LUMA'];
var LUMINANCE = Shaders['luminance'];

function LuminanceNode( rgb ) {

	TempNode.call( this, 'f' );

	this.rgb = rgb;

}

LuminanceNode.Nodes = ( function () {

	var LUMA = new ConstNode( luma );

	var luminance = new FunctionNode( LUMINANCE, [ LUMA ] );

	return {
		LUMA: LUMA,
		luminance: luminance
	};

} )();

LuminanceNode.prototype = Object.create( TempNode.prototype );
LuminanceNode.prototype.constructor = LuminanceNode;
LuminanceNode.prototype.nodeType = "Luminance";

LuminanceNode.prototype.generate = function ( builder, output ) {

	var luminance = builder.include( LuminanceNode.Nodes.luminance );

	return builder.format( luminance + '( ' + this.rgb.build( builder, 'v3' ) + ' )', this.getType( builder ), output );

};

LuminanceNode.prototype.copy = function ( source ) {

	TempNode.prototype.copy.call( this, source );

	this.rgb = source.rgb;

};

LuminanceNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.rgb = this.rgb.toJSON( meta ).uuid;

	}

	return data;

};

