/**
 * @author sunag / http://www.sunag.com.br/
 */


//dependency :  (path+'materials/nodes/MeshStandardNode.js');
//dependency :  (path+'materials/NodeMaterial.js');
//dependency :  (path+'core/NodeUtils.js');

function MeshStandardNodeMaterial() {

	var node = new MeshStandardNode();

	NodeMaterial.call( this, node, node );

	this.type = "MeshStandardNodeMaterial";

}

MeshStandardNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
MeshStandardNodeMaterial.prototype.constructor = MeshStandardNodeMaterial;

NodeUtils.addShortcuts( MeshStandardNodeMaterial.prototype, 'properties', [
	"color",
	"roughness",
	"metalness",
	"map",
	"normalMap",
	"normalScale",
	"metalnessMap",
	"roughnessMap",
	"envMap"
] );


