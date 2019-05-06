/**
 * @author sunag / http://www.sunag.com.br/
 */

//dependency :  (path+'core/TempNode.js');
//dependency :  (path+'core/FunctionNode.js');
//dependency :  (path+'utils/MaxMIPLevelNode.js');
//dependency :  (path+'bsdfs/BlinnShininessExponentNode.js');

var GetSpecularMIPLevel = fs.readFileSync(path+'bsdfs/getSpecularMIPLevel.gpu');

function RoughnessToBlinnExponentNode( texture ) {

	TempNode.call( this, 'f' );

	this.texture = texture;

	this.maxMIPLevel = new MaxMIPLevelNode( texture );
	this.blinnShininessExponent = new BlinnShininessExponentNode();

}

RoughnessToBlinnExponentNode.Nodes = ( function () {

	var getSpecularMIPLevel = new FunctionNode( GetSpecularMIPLevel );

	return {
		getSpecularMIPLevel: getSpecularMIPLevel
	};

} )();

RoughnessToBlinnExponentNode.prototype = Object.create( TempNode.prototype );
RoughnessToBlinnExponentNode.prototype.constructor = RoughnessToBlinnExponentNode;
RoughnessToBlinnExponentNode.prototype.nodeType = "RoughnessToBlinnExponent";

RoughnessToBlinnExponentNode.prototype.generate = function ( builder, output ) {

	if ( builder.isShader( 'fragment' ) ) {

		this.maxMIPLevel.texture = this.texture;

		var getSpecularMIPLevel = builder.include( RoughnessToBlinnExponentNode.Nodes.getSpecularMIPLevel );

		return builder.format( getSpecularMIPLevel + '( ' + this.blinnShininessExponent.build( builder, 'f' ) + ', ' + this.maxMIPLevel.build( builder, 'f' ) + ' )', this.type, output );

	} else {

		console.warn( "THREE.RoughnessToBlinnExponentNode is not compatible with " + builder.shader + " shader." );

		return builder.format( '0.0', this.type, output );

	}

};

RoughnessToBlinnExponentNode.prototype.copy = function ( source ) {

	TempNode.prototype.copy.call( this, source );

	this.texture = source.texture;

};

RoughnessToBlinnExponentNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.texture = this.texture;

	}

	return data;

};


