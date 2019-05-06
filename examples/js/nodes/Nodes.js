// TODO: all nodes

// core

imports(path+'core/Node.js');
imports(path+'core/TempNode.js');
imports(path+'core/InputNode.js');
imports(path+'core/ConstNode.js');
imports(path+'core/VarNode.js');
imports(path+'core/StructNode.js');
imports(path+'core/AttributeNode.js');
imports(path+'core/FunctionNode.js');
imports(path+'core/ExpressionNode.js');
imports(path+'core/FunctionCallNode.js');
imports(path+'core/NodeLib.js');
imports(path+'core/NodeUtils.js');
imports(path+'core/NodeFrame.js');
imports(path+'core/NodeUniform.js');
imports(path+'core/NodeBuilder.js');

// inputs

imports(path+'inputs/BoolNode.js');
imports(path+'inputs/IntNode.js');
imports(path+'inputs/FloatNode.js');
imports(path+'inputs/Vector2Node.js');
imports(path+'inputs/Vector3Node.js');
imports(path+'inputs/Vector4Node.js');
imports(path+'inputs/ColorNode.js');
imports(path+'inputs/Matrix3Node.js');
imports(path+'inputs/Matrix4Node.js');
imports(path+'inputs/TextureNode.js');
imports(path+'inputs/CubeTextureNode.js');
imports(path+'inputs/ScreenNode.js');
imports(path+'inputs/ReflectorNode.js');
imports(path+'inputs/PropertyNode.js');
imports(path+'inputs/RTTNode.js');

// accessors

imports(path+'accessors/UVNode.js');
imports(path+'accessors/ColorsNode.js');
imports(path+'accessors/PositionNode.js');
imports(path+'accessors/NormalNode.js');
imports(path+'accessors/CameraNode.js');
imports(path+'accessors/LightNode.js');
imports(path+'accessors/ReflectNode.js');
imports(path+'accessors/ScreenUVNode.js');
imports(path+'accessors/ResolutionNode.js');

// math

imports(path+'math/Math1Node.js');
imports(path+'math/Math2Node.js');
imports(path+'math/Math3Node.js');
imports(path+'math/OperatorNode.js');
imports(path+'math/CondNode.js');

// procedural

imports(path+'procedural/NoiseNode.js');
imports(path+'procedural/CheckerNode.js');

// bsdfs

imports(path+'bsdfs/BlinnShininessExponentNode.js');
imports(path+'bsdfs/BlinnExponentToRoughnessNode.js');
imports(path+'bsdfs/RoughnessToBlinnExponentNode.js');

// misc

imports(path+'misc/TextureCubeUVNode.js');
imports(path+'misc/TextureCubeNode.js');
imports(path+'misc/NormalMapNode.js');
imports(path+'misc/BumpMapNode.js');

// utils

imports(path+'utils/BypassNode.js');
imports(path+'utils/JoinNode.js');
imports(path+'utils/SwitchNode.js');
imports(path+'utils/TimerNode.js');
imports(path+'utils/VelocityNode.js');
imports(path+'utils/UVTransformNode.js');
imports(path+'utils/MaxMIPLevelNode.js');
imports(path+'utils/ColorSpaceNode.js');

// effects

imports(path+'effects/BlurNode.js');
imports(path+'effects/LuminanceNode.js');
imports(path+'effects/ColorAdjustmentNode.js');


// material nodes

imports(path+'materials/nodes/RawNode.js');
imports(path+'materials/nodes/SpriteNode.js');
imports(path+'materials/nodes/PhongNode.js');
imports(path+'materials/nodes/StandardNode.js');
imports(path+'materials/nodes/MeshStandardNode.js');

// materials

imports(path+'materials/NodeMaterial.js');
imports(path+'materials/SpriteNodeMaterial.js');
imports(path+'materials/PhongNodeMaterial.js');
imports(path+'materials/StandardNodeMaterial.js');
imports(path+'materials/MeshStandardNodeMaterial.js');

// postprocessing

imports(path+'postprocessing/NodePostProcessing.js');
//export { NodePass } from './postprocessing/NodePass.js');
