onmessage = function (e) {
  const {
    data,
    mm,
    width,
    height,
    canvas,
    save,
    EMPTY_COLOR,
    IMPASSABLE_COLOR,
    IMPASSABLE_PROV_COLOR,
    OCEAN_COLOR,
    OCEAN_PROV_COLOR,
    GREEN_COLOR,
    PROSPERITY_GRADIENT,
    HRE_EMPEROR_COLOR,
    HRE_ELECTOR_COLOR,
    DEVASTATION_GRADIENT,
    HALF_RED_COLOR,
    HALF_GREEN_COLOR,
    DEV_GRADIENT,
    countries
  } = e.data;

  const colorMapping = new Map();

  colorMapping.set(`${ IMPASSABLE_PROV_COLOR.red };${ IMPASSABLE_PROV_COLOR.green };${ IMPASSABLE_PROV_COLOR.blue }`,
      {
        red: IMPASSABLE_COLOR.red,
        green: IMPASSABLE_COLOR.green,
        blue: IMPASSABLE_COLOR.blue,
        alpha: IMPASSABLE_COLOR.alpha,
      });

  colorMapping.set(`${ OCEAN_PROV_COLOR.red };${ OCEAN_PROV_COLOR.green };${ OCEAN_PROV_COLOR.blue }`,
      {
        red: OCEAN_COLOR.red,
        green: OCEAN_COLOR.green,
        blue: OCEAN_COLOR.blue,
        alpha: OCEAN_COLOR.alpha,
      });

  const dates = [];
  let timelapseDate = save.startDate;

  do {
    let d = new Date(timelapseDate);

    if (timelapseDate < save.startDate) {
      d = new Date(save.startDate);
    } else if (timelapseDate >= save.date) {
      d = new Date(save.date);
    } else {
      d = new Date(d.getFullYear() + 1, 0, 1);
    }

    timelapseDate = `${d.getFullYear().toString().padStart(4, '0')}-${(d.getMonth() + 1).toString().padStart(2,
      '0')}-${d.getDate().toString().padStart(2, '0')}`;
    dates.push(timelapseDate);
  } while (timelapseDate < save.date);

  const message = {
    mm,
    data,
    colorMapping,
    save,
    countries,
    GREEN_COLOR,
    EMPTY_COLOR,
    PROSPERITY_GRADIENT,
    HRE_EMPEROR_COLOR,
    HRE_ELECTOR_COLOR,
    DEVASTATION_GRADIENT,
    HALF_GREEN_COLOR,
    HALF_RED_COLOR,
    DEV_GRADIENT,
  }

  const exportContext = canvas.getContext('2d');
  exportContext.imageSmoothingEnabled = false;

  let count = 0;
  const images = [];
  const worker = new Worker('/eu4/script/timelapse_worker.js', { type: 'module' });

  worker.onerror = (e) => {
    console.error(e);
    postMessage({ error: e.message });
    worker.terminate();
  }
  worker.onmessageerror = (e) => {
    console.error(e);
    postMessage({ error: 'error' });
    worker.terminate();
  }
  worker.onmessage = (e) => {
    try {
      if (e && e.data) {
        const newData = exportContext.createImageData(width, height);
        newData.data.set(e.data.array);
        exportContext.putImageData(newData, 0, 0);
        canvas.convertToBlob({ type: 'image/jpeg', quality: 1 }).then(async (blob) => {
          if (blob) {
            const array = await blob.arrayBuffer();

            images.push({
              name: `img${(e.data.count + '').padStart(4, '0')}.jpg`,
              data: array
            });

            if (images.length < (dates.length / 100)) {
              worker.postMessage({ ...message, date: dates[++count], count });
            } else {
              console.log('Finished!');
              worker.terminate();

              postMessage(images, [...images.map(i => i.data)]);
            }
          }
        });
      } else {
        postMessage({ error: 'error' });
        worker.terminate();
      }
    } catch (e) {
      console.error(e);
      postMessage({ error: 'error' });
      worker.terminate();
    }
  };

  worker.postMessage({ ...message, date: dates[0], count: 0 });
}
