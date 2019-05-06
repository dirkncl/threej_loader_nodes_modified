/**
 * @author sunag / http://www.sunag.com.br/
 */

/*
dependency :  (path+'materials/nodes/StandardNode.js');
dependency :  (path+'materials/NodeMaterial.js');
dependency :  (path+'core/NodeUtils.js');
*/
function StandardNodeMaterial() {

	var node = new StandardNode();

	NodeMaterial.call( this, node, node );

	this.type = "StandardNodeMaterial";

}

StandardNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
StandardNodeMaterial.prototype.constructor = StandardNodeMaterial;

NodeUtils.addShortcuts( StandardNodeMaterial.prototype, 'fragment', [
	'color',
	'alpha',
	'roughness',
	'metalness',
	'reflectivity',
	'clearCoat',
	'clearCoatRoughness',
	'normal',
	'emissive',
	'ambient',
	'light',
	'shadow',
	'ao',
	'environment',
	'mask',
	'position'
] );


