/**
 * @author sunag / http://www.sunag.com.br/
 */

/*
dependency :  (path+'materials/nodes/PhongNode.js');
dependency :  (path+'materials/NodeMaterial.js');
dependency :  (path+'core/NodeUtils.js');
*/
function PhongNodeMaterial() {

	var node = new PhongNode();

	NodeMaterial.call( this, node, node );

	this.type = "PhongNodeMaterial";

}

PhongNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
PhongNodeMaterial.prototype.constructor = PhongNodeMaterial;

NodeUtils.addShortcuts( PhongNodeMaterial.prototype, 'fragment', [
	'color',
	'alpha',
	'specular',
	'shininess',
	'normal',
	'emissive',
	'ambient',
	'light',
	'shadow',
	'ao',
	'environment',
	'environmentAlpha',
	'mask',
	'position'
] );

