#version 300 es

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_provinces;
uniform sampler2D u_idColors;
uniform sampler2D u_currentColors;
uniform int u_nbProvinces;
uniform vec2 u_offset;
uniform vec2 u_delta;

out vec4 outColor;

bool isBorder(vec3 color, vec2 pos) {
    if (color != texture(u_provinces, vec2(pos.x, pos.y + u_delta.y)).rgb) {
        return true;
    }

    if (color != texture(u_provinces, vec2(pos.x, pos.y - u_delta.y)).rgb) {
        return true;
    }

    if (color != texture(u_provinces, vec2(pos.x + u_delta.x, pos.y)).rgb) {
        return true;
    }

    if (color != texture(u_provinces, vec2(pos.x - u_delta.x, pos.y)).rgb) {
        return true;
    }

    return false;
}

int getProvinceIdByColor(vec3 color) {
    int i = 0;

    while (i < u_nbProvinces) {
        if (color == texelFetch(u_idColors, ivec2(i, 0), 0).rgb) {
            return i;
        }

        i = i + 1;
    }

    return -1;
}

void main() {
    vec2 pos = v_texCoord + u_offset;
    vec4 color = texture(u_provinces, pos);

    if (isBorder(color.rgb, pos)) {
        outColor = vec4(0.0, 0.0, 0.0, 0.9);
    } else {
        int id = getProvinceIdByColor(color.rgb);
        outColor = texelFetch(u_currentColors, ivec2(id, 0), 0);
    }
}