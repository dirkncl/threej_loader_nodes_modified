/**
 * @author sunag / http://www.sunag.com.br/
 */

/*
dependency :  (path+'materials/nodes/SpriteNode.js');
dependency :  (path+'materials/NodeMaterial.js');
dependency :  (path+'core/NodeUtils.js');
*/
function SpriteNodeMaterial() {

	var node = new SpriteNode();

	NodeMaterial.call( this, node, node );

	this.type = "SpriteNodeMaterial";

}

SpriteNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
SpriteNodeMaterial.prototype.constructor = SpriteNodeMaterial;

NodeUtils.addShortcuts( SpriteNodeMaterial.prototype, 'fragment', [
	'color',
	'alpha',
	'mask',
	'position',
	'spherical'
] );


