import { Backdrop, Dialog, Fade, Grow, Popper } from '@mui/material';
import { intl } from 'index';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import mapWorker from 'screens/save/map_worker';
import ProvinceDialogContent from 'screens/save/ProvinceModalCard';
import ProvincePopperCard from 'screens/save/ProvincePopperCard';
import WorkerBuilder from 'screens/save/worker_builder';
import theme from 'theme';
import { SaveColor, SaveProvince } from 'types/api.types';
import { ProvincesTexture, Texture } from 'types/gl.types';
import { MapMode, mapModes, MapSave } from 'types/map.types';
import { getTexture } from 'utils';
import { IMPASSABLE_COLOR, OCEAN_COLOR } from 'utils/colors.utils';
import { getColorsUrl, getProvincesUrl } from 'utils/data.utils';
import { getProvinceAt, getTextureFromSave, initShaderProgram, prepareTexture } from 'utils/gl.utils';
import { getProvince } from 'utils/save.utils';

interface SaveMapProps {
  save?: MapSave;
  mapMode: MapMode;
  setReady: (ready: boolean) => void;
}

const SaveMap = forwardRef(({ save, mapMode, setReady }: SaveMapProps, ref) => {
    const offsetBounce = 25;
    const [displayable, setDisplayable] = useState<boolean>(false);
    const canvas = useRef<HTMLCanvasElement>(null);
    const popoverDiv = useRef<HTMLDivElement>(null);
    const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);
    const [program, setProgram] = useState<WebGLProgram | null>(null);

    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [moved, setMoved] = useState<boolean>(false);
    const [offset, setOffset] = useState<number[]>([0, 0]);
    const [offsetLoc, setOffsetLoc] = useState<WebGLUniformLocation | null>(null);
    const [lastOffset, setLastOffset] = useState<number>(Date.now());
    const [lastMousePos, setLastMousePos] = useState<number[]>([0, 0]);

    const [zoom, setZoom] = useState<number>(1);
    const [zoomLoc, setZoomLoc] = useState<WebGLUniformLocation | null>(null);

    const [provincesContext, setProvincesContext] = useState<CanvasRenderingContext2D | null>(null);
    const [provincesTexture, setProvincesTexture] = useState<Texture | null>(null);
    const [provincesLoc, setProvincesLoc] = useState<WebGLUniformLocation | null>(null);

    const [nbProvincesLoc, setNbProvincesLoc] = useState<WebGLUniformLocation | null>(null);

    const [idColorsContext, setIdColorsContext] = useState<CanvasRenderingContext2D | null>(null);
    const [idColorsTexture, setIdColorsTexture] = useState<Texture | null>(null);
    const [idColorsLoc, setIdColorsLoc] = useState<WebGLUniformLocation | null>(null);

    const [currentColorsTexture, setCurrentColorsTexture] = useState<ProvincesTexture | null>(null);
    const [currentColorsLoc, setCurrentColorsLoc] = useState<WebGLUniformLocation | null>(null);

    const [deltaLoc, setDeltaLoc] = useState<WebGLUniformLocation | null>(null);
    const [ratioLoc, setRatioLoc] = useState<WebGLUniformLocation | null>(null);

    const [clickedProvince, setClickedProvince] = useState<SaveProvince | null>(null);
    const [provinceModalOpen, setProvinceModalOpen] = useState<boolean>(false);

    const closeModal = () => {
      setClickedProvince(null);
      setProvinceModalOpen(false);
    }

    const adjustOffset = useCallback((offsetX: number, offsetY: number, customZoom?: number) => {
      if (gl && canvas.current && provincesTexture !== null) {
        const scaledWidth = gl.canvas.width / ((customZoom ?? zoom));
        const scaledHeight = gl.canvas.height / ((customZoom ?? zoom));

        offsetX = Math.max(offsetX, (scaledWidth - provincesTexture.width) / 4);
        offsetX = Math.min(offsetX, (provincesTexture.width - scaledWidth) / 4);

        if (scaledHeight > provincesTexture.height) {
          offsetY = 0;
        } else {
          offsetY = Math.max(offsetY, (scaledHeight - provincesTexture.height) / 4);
          offsetY = Math.min(offsetY, (provincesTexture.height - scaledHeight) / 4);
        }

        setOffset([offsetX, offsetY]);
      }
    }, [gl, provincesTexture, zoom]);

    const zoomInOut = useCallback((e: WheelEvent) => {
      setClickedProvince(null);

      if (canvas.current && provincesTexture !== null) {
        let newZoom = zoom - (e.deltaY / 1000);
        const min = canvas.current.width / provincesTexture.width;
        newZoom = Math.max(newZoom, min);
        newZoom = Math.min(newZoom, 12 * min);
        adjustOffset(offset[0], offset[1], newZoom);
        setZoom(newZoom);
      }
    }, [provincesTexture, zoom, adjustOffset, offset]);

    const moveMap = useCallback((e: MouseEvent) => {
      setClickedProvince(null);
      if (canvas.current && Date.now() > lastOffset + offsetBounce) {
        let newOffsetX = offset[0] - ((e.clientX - lastMousePos[0]) / (zoom * 2));
        let newOffsetY = offset[1] - ((e.clientY - lastMousePos[1]) / (zoom * 2));

        adjustOffset(newOffsetX, newOffsetY);

        setLastOffset(Date.now);
        setLastMousePos([e.clientX | 0, e.clientY | 0]);
        setMoved(true);
      }
    }, [adjustOffset, lastMousePos, lastOffset, offset, zoom]);

    const resize = useCallback((draw: boolean) => {
      if (gl && provincesTexture && ratioLoc) {
        const width = gl.canvas.clientWidth;
        const height = gl.canvas.clientHeight;

        gl.canvas.width = width;
        gl.canvas.height = height;

        gl.uniform2f(ratioLoc, provincesTexture.width / width, provincesTexture.height / height);

        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        if (draw) {
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      }
    }, [gl, provincesTexture, ratioLoc]);

    const clickProvince = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      if (gl && save) {
        if (!moved && provincesContext && provincesTexture && idColorsContext) {
          const scaledWidth = gl.canvas.width / zoom;
          const scaledHeight = gl.canvas.height / zoom;

          const x = ((e.clientX / gl.canvas.width * scaledWidth) + (offset[0] - (scaledWidth - provincesTexture.width) / 4) * 2) | 0;
          const y = ((e.clientY / gl.canvas.height * scaledHeight) + (offset[1] - (scaledHeight - provincesTexture.height) / 4) * 2) | 0;

          if (y >= 0 && y <= provincesTexture.height) { //Clicking inside image
            const provinceId = getProvinceAt(x, y, provincesContext, idColorsContext);
            const province = getProvince(save, provinceId);

            setClickedProvince((clickedProvince && province && (clickedProvince.id === provinceId)) ? null : province);
          }
        }
      }
    }, [clickedProvince, save, gl, idColorsContext, moved, offset, provincesContext, provincesTexture, zoom]);

    useEffect(() => {
      if (canvas.current !== null) {
        if (mouseDown) {
          canvas.current.onpointermove = e => moveMap(e);
        } else {
          canvas.current.onpointermove = null;
        }
      }
    }, [mouseDown, moveMap]);

    useEffect(() => {
      if (canvas.current !== null) {
        canvas.current.onwheel = e => zoomInOut(e);
      }
    }, [zoomInOut]);

    useEffect(() => {
      if (canvas.current !== null) {
        setGl(canvas.current.getContext('webgl2'));
        canvas.current.onmousedown = e => {
          setMouseDown(true);
          setLastMousePos([e.clientX | 0, e.clientY | 0]);
        }
      }
    }, [save]);

    useEffect(() => {
      window.onmouseup = e => {
        setMouseDown(false);
        if (Math.abs(e.clientX - lastMousePos[0]) <= 1 && Math.abs(e.clientY - lastMousePos[1]) <= 1) {
          setMoved(false);
        }
      }
    }, [save, lastMousePos]);

    useEffect(() => {
      window.onresize = () => resize(true);
    }, [resize])

    useEffect(() => {
      ;(async () => {
        if (gl) {
          const program = await initShaderProgram(gl);

          if (!program) {
            return;
          }

          setProgram(program);
        }
      })()
    }, [gl]);

    useEffect(() => {
      if (save && gl) {
        setCurrentColorsTexture(prepareTexture(save, gl));
      }
    }, [save, gl]);

    useEffect(() => {
      if (displayable && gl && currentColorsTexture && save) {
        getTextureFromSave(currentColorsTexture, save, gl, mapMode);

        gl.bindTexture(gl.TEXTURE_2D, currentColorsTexture.texture);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        setReady(true);
      }
    }, [save, currentColorsTexture, gl, mapMode, currentColorsLoc, setReady, displayable]);

    useEffect(() => setClickedProvince(null), [mapMode]);

    useEffect(() => {
      if (gl && program && save) {
        gl.useProgram(program);

        const VERTICES = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);

        const posLoc = gl.getAttribLocation(program, "a_position");
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(posLoc);

        setOffsetLoc(gl.getUniformLocation(program, "u_offset"));
        setZoomLoc(gl.getUniformLocation(program, "u_zoom"));
        setProvincesLoc(gl.getUniformLocation(program, "u_provinces"));
        setIdColorsLoc(gl.getUniformLocation(program, "u_idColors"));
        setNbProvincesLoc(gl.getUniformLocation(program, "u_nbProvinces"));
        setCurrentColorsLoc(gl.getUniformLocation(program, "u_currentColors"));
        setDeltaLoc(gl.getUniformLocation(program, "u_delta"));
        setRatioLoc(gl.getUniformLocation(program, "u_ratio"));

        gl.clearColor(1.0, 0.0, 1.0, 1.0);

        getTexture(getProvincesUrl(save.provinceImage), gl).then(value => {
          setProvincesTexture(value);

          if (value && value.image) {
            const provinceCanvas = document.createElement("canvas");
            provinceCanvas.width = value.width;
            provinceCanvas.height = value.height;

            const context2D = provinceCanvas.getContext("2d")!;
            context2D.imageSmoothingEnabled = false;
            context2D.drawImage(value.image, 0, 0, value.width, value.height);

            setProvincesContext(context2D);
          }
        });

        getTexture(getColorsUrl(save.colorsImage), gl).then(value => {
          setIdColorsTexture(value);

          if (value && value.image) {
            const idColorsCanvas = document.createElement("canvas");
            idColorsCanvas.width = value.width;
            idColorsCanvas.height = value.height;

            const context2D = idColorsCanvas.getContext("2d")!;
            context2D.imageSmoothingEnabled = false;
            context2D.drawImage(value.image, 0, 0, value.width, value.height);

            setIdColorsContext(context2D);
          }
        });
      }
    }, [program, gl, save]);

    useEffect(() => {
      if (gl && provincesTexture !== null && provincesLoc !== null && idColorsTexture !== null && idColorsLoc !== null
        && nbProvincesLoc !== null && currentColorsTexture !== null && currentColorsLoc !== null && deltaLoc !== null) {
        resize(false);

        gl.uniform1i(nbProvincesLoc, idColorsTexture.width);
        gl.uniform2f(deltaLoc, 1.0 / provincesTexture.width, 1.0 / provincesTexture.height);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, provincesTexture.texture);
        gl.uniform1i(provincesLoc, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, idColorsTexture.texture);
        gl.uniform1i(idColorsLoc, 1);

        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, currentColorsTexture.texture);
        gl.uniform1i(currentColorsLoc, 2);

        setDisplayable(true);
      }
    }, [idColorsLoc, idColorsTexture, gl, nbProvincesLoc, provincesLoc, provincesTexture, currentColorsTexture, currentColorsLoc, deltaLoc, ratioLoc, resize]);

    useEffect(() => {
      if (gl && zoomLoc && offsetLoc && provincesTexture) {
        gl.uniform1f(zoomLoc, zoom);
        gl.uniform2f(offsetLoc, offset[0] / provincesTexture.width, offset[1] / provincesTexture.height);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    }, [gl, zoomLoc, zoom, offsetLoc, offset, provincesTexture]);

    useImperativeHandle(ref, () => ({
      async exportImage() {
        return new Promise((resolve) => {
          if (save && provincesTexture && provincesContext && idColorsContext) {
            const exportCanvas = document.createElement<'canvas'>('canvas');
            exportCanvas.width = provincesTexture.width;
            exportCanvas.height = provincesTexture.height;

            const exportContext = exportCanvas.getContext('2d')!;
            exportContext.imageSmoothingEnabled = false;
            const colorMapping = new Map<string, SaveColor>();

            const colorsData = idColorsContext.getImageData(0, 0, idColorsContext.canvas.width, idColorsContext.canvas.height).data;

            const modeData = mapModes[mapMode].prepare(save);
            for (const province of save.provinces) {
              const key = `${ colorsData[(province.id - 1) * 4] };${ colorsData[(province.id - 1) * 4 + 1] };${ colorsData[(province.id - 1) * 4 + 2] };${ colorsData[(province.id - 1) * 4 + 3] }`;
              const value = mapModes[mapMode].provinceColor(province, save, modeData);

              colorMapping.set(key, value);
            }

            for (const province of save.impassableProvinces) {
              const key = `${ colorsData[(province.id - 1) * 4] };${ colorsData[(province.id - 1) * 4 + 1] };${ colorsData[(province.id - 1) * 4 + 2] };${ colorsData[(province.id - 1) * 4 + 3] }`;
              const value: SaveColor = {
                red: IMPASSABLE_COLOR.red,
                green: IMPASSABLE_COLOR.green,
                blue: IMPASSABLE_COLOR.blue,
                alpha: IMPASSABLE_COLOR.alpha,
              };

              colorMapping.set(key, value);
            }

            for (const province of save.oceansProvinces) {
              const key = `${ colorsData[(province.id - 1) * 4] };${ colorsData[(province.id - 1) * 4 + 1] };${ colorsData[(province.id - 1) * 4 + 2] };${ colorsData[(province.id - 1) * 4 + 3] }`;
              const value: SaveColor = {
                red: OCEAN_COLOR.red,
                green: OCEAN_COLOR.green,
                blue: OCEAN_COLOR.blue,
                alpha: OCEAN_COLOR.alpha,
              };

              colorMapping.set(key, value);
            }

            for (const province of save.lakesProvinces) {
              const key = `${ colorsData[(province.id - 1) * 4] };${ colorsData[(province.id - 1) * 4 + 1] };${ colorsData[(province.id - 1) * 4 + 2] };${ colorsData[(province.id - 1) * 4 + 3] }`;
              const value: SaveColor = {
                red: OCEAN_COLOR.red,
                green: OCEAN_COLOR.green,
                blue: OCEAN_COLOR.blue,
                alpha: OCEAN_COLOR.alpha,
              };

              colorMapping.set(key, value);
            }

            console.log('looping');
            console.time('loop');

            const workerInstance = new WorkerBuilder(mapWorker);
            workerInstance.onmessage = (message) => {
              if (message) {
                console.timeEnd('loop');
                console.log('looped');

                const newData = exportContext.createImageData(provincesTexture.width, provincesTexture.height);
                newData.data.set(message.data);
                exportContext.putImageData(newData, 0, 0);

                const url = exportCanvas.toDataURL('image/png', 1);
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", `${ save.name.replace(/\.[^/.]+$/, "") }_${ intl.formatMessage({ id: `map.mod.${ mapMode }` }) }`)

                if (document.body) {
                  document.body.appendChild(link)
                  link.click()
                }

                resolve(true);
              }
            };

            const message = {
              data: provincesContext.getImageData(0, 0, provincesTexture.width, provincesTexture.height).data,
              colorMapping,
              IMPASSABLE_COLOR
            }
            workerInstance.postMessage(message, [message.data.buffer]);
          }
        });
      }
    }));

    return (
      <>
        {
          save &&
            <>
                <canvas id='save-map-canvas'
                        ref={ canvas }
                        style={ {
                          width: '100%',
                          height: '100%',
                          minHeight: 500,
                          minWidth: 500,
                          backgroundColor: '#5e5e5e'
                        } }
                        onClick={ e => clickProvince(e) }/>
                <div ref={ popoverDiv } style={ { position: 'fixed', left: lastMousePos[0], top: lastMousePos[1] } }/>
              {
                (popoverDiv.current && clickedProvince && !mouseDown && !provinceModalOpen) &&
                  <Popper open anchorEl={ popoverDiv.current } placement='top' transition>
                    { ({ TransitionProps }) => (
                      <Grow { ...TransitionProps } timeout={ 350 }>
                        <div>
                          <ProvincePopperCard province={ clickedProvince } onClose={ () => setClickedProvince(null) } save={ save }
                                              viewMore={ () => setProvinceModalOpen(true) }/>
                        </div>
                      </Grow>
                    ) }
                  </Popper>
              }
              {
                (clickedProvince && provinceModalOpen) &&
                  <Dialog
                      open={ provinceModalOpen }
                      onClose={ () => closeModal() }
                      scroll='paper'
                      closeAfterTransition
                      fullWidth
                      maxWidth='md'
                      BackdropComponent={ Backdrop }
                      BackdropProps={ {
                        timeout: 500,
                      } }
                  >
                      <Fade in={ provinceModalOpen }>
                          <div style={ {
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            zIndex: 1
                          } }>
                              <ProvinceDialogContent province={ clickedProvince } save={ save }/>
                          </div>
                      </Fade>
                  </Dialog>
              }
            </>
        }
      </>
    )
  })
;

export default SaveMap;
