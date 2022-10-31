#version 300 es

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_provinces;
uniform sampler2D u_currentColors;
uniform vec2 u_offset;
uniform vec4 u_border;
uniform vec4 u_ocean;
uniform vec4 u_impassable;

out vec4 outColor;

int getProvinceIdByColor(vec3 color) {
    return int(color.r * 255.0) * 256 * 256 + int(color.g * 255.0) * 256 + int(color.b * 255.0) - 1;
}

void main() {
    vec2 pos = v_texCoord + u_offset;
    vec4 color = texture(u_provinces, pos);

    if (color == u_border) {
        outColor = vec4(0.0, 0.0, 0.0, 0.9);
    } else if (color == u_ocean) {
        outColor = vec4(0.2666, 0.4196, 0.6392, 1.0);
    } else if (color == u_impassable) {
        outColor = vec4(0.3686, 0.3686, 0.3686, 1.0);
    } else {
        int id = getProvinceIdByColor(color.rgb);
        outColor = texelFetch(u_currentColors, ivec2(id, 0), 0);
    }
}
