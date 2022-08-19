import { ProvincesTexture, Texture } from 'types/gl.types';
import { MapMode, mapModes, MapSave } from 'types/map.types';
import { IMPASSABLE_COLOR, OCEAN_COLOR } from 'utils/colors.utils';

export function loadShader(gl: WebGL2RenderingContext, type: GLenum, source: string) {
  const shader = gl.createShader(type);

  if (shader) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  }

  return shader;
}

export async function initShaderProgram(gl: WebGL2RenderingContext): Promise<WebGLProgram | null> {
  const vsSource = fetch('/eu4/map/save-map.vert').then((r) => r.text());
  const fsSource = fetch('/eu4/map/save-map.frag').then((r) => r.text());

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, await vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, await fsSource);

  const shaderProgram = gl.createProgram();

  if (shaderProgram && vertexShader && fragmentShader) {
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
  }

  return shaderProgram;
}

export function getTexture(url: string, gl: WebGL2RenderingContext): Promise<Texture | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'anonymous'

    image.onload = function () {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.bindTexture(gl.TEXTURE_2D, null);

      resolve({
        texture,
        width: image.width,
        height: image.height,
        image
      });
    };

    image.src = url;
  });
}

export function prepareArray(array: Uint8Array, save: MapSave): void {
  for (const province of save.impassableProvinces) {
    array[(province.id - 1) * 4] = IMPASSABLE_COLOR.red;
    array[(province.id - 1) * 4 + 1] = IMPASSABLE_COLOR.green;
    array[(province.id - 1) * 4 + 2] = IMPASSABLE_COLOR.blue;
    array[(province.id - 1) * 4 + 3] = IMPASSABLE_COLOR.alpha;
  }

  for (const province of save.oceansProvinces) {
    array[(province.id - 1) * 4] = OCEAN_COLOR.red;
    array[(province.id - 1) * 4 + 1] = OCEAN_COLOR.green;
    array[(province.id - 1) * 4 + 2] = OCEAN_COLOR.blue;
    array[(province.id - 1) * 4 + 3] = OCEAN_COLOR.alpha;
  }

  for (const province of save.lakesProvinces) {
    array[(province.id - 1) * 4] = OCEAN_COLOR.red;
    array[(province.id - 1) * 4 + 1] = OCEAN_COLOR.green;
    array[(province.id - 1) * 4 + 2] = OCEAN_COLOR.blue;
    array[(province.id - 1) * 4 + 3] = OCEAN_COLOR.alpha;
  }
}

export function prepareTexture(save: MapSave, gl: WebGL2RenderingContext): ProvincesTexture {
  const array = new Uint8Array(save.nbProvinces * 4);
  prepareArray(array, save);

  return {
    array,
    texture: gl.createTexture()
  };
}

export function getTextureFromSave(provincesTexture: ProvincesTexture, save: MapSave, gl: WebGL2RenderingContext, mapMod: MapMode, dataId: string | null) {
  if (provincesTexture.array) {
    fillMapArray(provincesTexture.array, save, mapMod, dataId);

    gl.bindTexture(gl.TEXTURE_2D, provincesTexture.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, save.nbProvinces, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, provincesTexture.array);

    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}

export function fillMapArray(array: Uint8Array, save: MapSave, mapMod: MapMode, dataId: string | null) {
  const data = mapModes[mapMod].prepare(save, dataId);

  for (const province of save.provinces) {
    const color = mapModes[mapMod].provinceColor(province, save, data, []);
    array[(province.id - 1) * 4] = color.red;
    array[(province.id - 1) * 4 + 1] = color.green;
    array[(province.id - 1) * 4 + 2] = color.blue;
    array[(province.id - 1) * 4 + 3] = color.alpha;
  }
}

export function getProvinceAt(x: number, y: number, provincesContext: CanvasRenderingContext2D, idColorContext: CanvasRenderingContext2D): number {
  const provinceColor = provincesContext.getImageData(x, y, 1, 1).data;

  for (let i = 0; i < idColorContext.canvas.width; i++) {
    if (arraysEqual(idColorContext.getImageData(i, 0, 1, 1).data, provinceColor)) {
      return i + 1;
    }
  }

  return -1;
}

export function isSaveProvinceLeft(x: number, y: number, provincesContext: CanvasRenderingContext2D): boolean {
  if (x === 0) {
    return false;
  } else if (x === provincesContext.canvas.width) {
    return false;
  }

  return arraysEqual(provincesContext.getImageData(x, y, 1, 1).data, provincesContext.getImageData(x - 1, y, 1, 1).data);
}

function arraysEqual(a: Uint8ClampedArray, b: Uint8ClampedArray) {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
