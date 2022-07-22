#version 300 es

precision highp float;

in vec2 a_position;

uniform vec2 u_offset;
uniform float u_zoom;
uniform vec2 u_ratio;

out vec2 v_texCoord;

void main() {
    vec2 centeredPosition = (a_position - u_offset) * 2.0;
    centeredPosition = centeredPosition - 1.0;
    centeredPosition = centeredPosition * u_ratio;

    gl_Position = vec4(centeredPosition * vec2(u_zoom, -u_zoom), 0, 1);

    v_texCoord = a_position;
}