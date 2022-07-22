export type Texture = {
  texture: WebGLTexture | null;
  image?: HTMLImageElement;
  width: number;
  height: number;
}

export type ProvincesTexture = {
  array: Uint8Array | null;
  texture: WebGLTexture | null;
}