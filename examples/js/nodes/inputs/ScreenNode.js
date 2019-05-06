/**
 * @author sunag / http://www.sunag.com.br/
 */

//dependency :  (path+'core/InputNode.js');
//dependency :  (path+'inputs/TextureNode.js');

function ScreenNode( uv ) {

	TextureNode.call( this, undefined, uv );

}

ScreenNode.prototype = Object.create( TextureNode.prototype );
ScreenNode.prototype.constructor = ScreenNode;
ScreenNode.prototype.nodeType = "Screen";

ScreenNode.prototype.getUnique = function () {

	return true;

};

ScreenNode.prototype.getTexture = function ( builder, output ) {

	return InputNode.prototype.generate.call( this, builder, output, this.getUuid(), 't', 'renderTexture' );

};


