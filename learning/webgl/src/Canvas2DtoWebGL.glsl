<<vertex_shader>>

precision highp float;  
attribute vec3 a_vertex;  
uniform vec2 u_viewport;  
uniform mat3 u_transform;  
#ifdef EXTRA_PROJECTION  
	uniform mat4 u_projection;  
#endif  
varying float v_visible;  
void main() {   
	vec3 pos = a_vertex;  
	v_visible = pos.z;  
	pos = u_transform * vec3(pos.xy,1.0);  
	pos.z = 0.0;  
	//normalize  
	pos.x = (2.0 * pos.x / u_viewport.x) - 1.0;  
	pos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);  
	#ifdef EXTRA_PROJECTION  
		pos = (u_projection * mat4(pos,1.0)).xz;  
	#endif  
	gl_Position = vec4(pos, 1.0);   
}  
			

<<flat_primitive_shader>>

precision highp float;  
varying float v_visible;  
uniform vec4 u_color;  
void main() {  
	if (v_visible == 0.0)  
		discard;  
	gl_FragColor = u_color;  
}  

<<textured_transform_shader>>

precision highp float;  
uniform sampler2D u_texture;  
uniform vec4 u_color;  
uniform vec4 u_texture_transform;  
varying vec2 v_coord;  
void main() {  
	vec2 uv = v_coord * u_texture_transform.zw + vec2(u_texture_transform.x,0.0);  
	uv.y = uv.y - u_texture_transform.y + (1.0 - u_texture_transform.w);  
	uv = clamp(uv,vec2(0.0),vec2(1.0));  
	gl_FragColor = u_color * texture2D(u_texture, uv);  
}  


<<textured_primitive_shader>>

precision highp float;  
varying float v_visible;  
uniform vec4 u_color;  
uniform sampler2D u_texture;  
uniform vec4 u_texture_transform;  
uniform vec2 u_viewport;  
uniform mat3 u_itransform;  
void main() {  
	vec2 pos = (u_itransform * vec3( gl_FragCoord.s, u_viewport.y - gl_FragCoord.t,1.0)).xy;  
	pos *= vec2( (u_viewport.x * u_texture_transform.z), (u_viewport.y * u_texture_transform.w) );  
	vec2 uv = fract(pos / u_viewport) + u_texture_transform.xy;  
	uv.y = 1.0 - uv.y;  
	gl_FragColor = u_color * texture2D( u_texture, uv);  
}  

<<gradient_primitive_shader>>

precision highp float;  
varying float v_visible;  
uniform vec4 u_color;  
uniform sampler2D u_texture;  
uniform vec4 u_gradient;  
uniform vec2 u_viewport;  
uniform mat3 u_itransform;  
void main() {  
	vec2 pos = (u_itransform * vec3( gl_FragCoord.s, u_viewport.y - gl_FragCoord.t,1.0)).xy;  
	//vec2 pos = vec2( gl_FragCoord.s, u_viewport.y - gl_FragCoord.t);  
	vec2 AP = pos - u_gradient.xy;  
	vec2 AB = u_gradient.zw - u_gradient.xy;  
	float dotAPAB = dot(AP,AB);  
	float dotABAB = dot(AB,AB);  
	float x = dotAPAB / dotABAB;  
	vec2 uv = vec2( x, 0.0 );  
	gl_FragColor = u_color * texture2D( u_texture, uv );  

}  

<<createImageShader>>

precision highp float;  
uniform sampler2D u_texture;  
uniform vec4 u_color;  
uniform vec4 u_texture_transform;  
uniform vec2 u_viewport;  
varying vec2 v_coord;  
void main() {  
	vec2 uv = v_coord * u_texture_transform.zw + vec2(u_texture_transform.x,0.0);  
	uv.y = uv.y - u_texture_transform.y + (1.0 - u_texture_transform.w);  
	uv = clamp(uv,vec2(0.0),vec2(1.0));  
	vec4 color = u_color * texture2D(u_texture, uv);  
	"+code+";  
	gl_FragColor = color;  
}  
	
<<POINT_TEXT_VERTEX_SHADER>>

precision highp float;  
attribute vec3 a_vertex;  
attribute vec2 a_coord;  
varying vec2 v_coord;  
uniform vec2 u_viewport;  
uniform mat3 u_transform;  
#ifdef EXTRA_PROJECTION  
	uniform mat4 u_projection;  
#endif  
uniform float u_pointSize;  
void main() {   
	vec3 pos = a_vertex;  
	pos = u_transform * pos;  
	pos.z = 0.0;  
	//normalize  
	pos.x = (2.0 * pos.x / u_viewport.x) - 1.0;  
	pos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);  
	#ifdef EXTRA_PROJECTION  
		pos = (u_projection * mat4(pos,1.0)).xz;  
	#endif  
	gl_Position = vec4(pos, 1.0);   
	gl_PointSize = ceil(u_pointSize);  
	v_coord = a_coord;  
}  


<<POINT_TEXT_FRAGMENT_SHADER>>

precision highp float;  
uniform sampler2D u_texture;  
uniform float u_iCharSize;  
uniform vec4 u_color;  
uniform float u_pointSize;  
uniform vec2 u_viewport;  
uniform vec2 u_angle_sincos;  
varying vec2 v_coord;  
void main() {  
	vec2 uv = vec2(1.0 - gl_PointCoord.s, gl_PointCoord.t);  
	uv = vec2( ((uv.y - 0.5) * u_angle_sincos.y - (uv.x - 0.5) * u_angle_sincos.x) + 0.5, ((uv.x - 0.5) * u_angle_sincos.y + (uv.y - 0.5) * u_angle_sincos.x) + 0.5);  
	uv = v_coord - uv * u_iCharSize + vec2(u_iCharSize*0.5);  
	uv.y = 1.0 - uv.y;  
	gl_FragColor = vec4(u_color.xyz, u_color.a * texture2D(u_texture, uv, -1.0  ).a);  
}  

<<TRIANGLE_TEXT_VERTEX_SHADER>>

precision highp float;  
#define MAX_CHARS 64;
attribute vec3 a_vertex;  
varying vec2 v_coord;  
uniform vec2 u_viewport;  
uniform vec2 u_charPos[ MAX_CHARS ];  
uniform vec2 u_charCoord[ MAX_CHARS ];  
uniform mat3 u_transform;  
uniform float u_pointSize;  
void main() {   
	vec3 pos = a_vertex;  
	v_coord = a_vertex * 0.5 + vec2(0.5);  
	int char_index = (int)pos.z;  
	pos.z = 1.0;  
	pos.xz = pos.xz * u_pointSize + u_charPos[char_index];  
	pos = u_transform * pos;  
	pos.z = 0.0;  
	//normalize  
	pos.x = (2.0 * pos.x / u_viewport.x) - 1.0;  
	pos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);  
	gl_Position = vec4(pos, 1.0);   
}  

<<TRIANGLE_TEXT_FRAGMENT_SHADER>>

precision highp float;  
uniform sampler2D u_texture;  
uniform float u_iCharSize;  
uniform vec4 u_color;  
uniform float u_pointSize;  
uniform vec2 u_viewport;  
varying vec2 v_coord;  
void main() {  
	vec2 uv = vec2(1.0 - gl_PointCoord.s, 1.0 - gl_PointCoord.t);  
	uv = v_coord - uv * u_iCharSize + vec2(u_iCharSize*0.5);  
	uv.y = 1.0 - uv.y;  
	gl_FragColor = vec4(u_color.xyz, u_color.a * texture2D(u_texture, uv, -1.0  ).a);  
}  
