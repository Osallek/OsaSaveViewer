onmessage = function (e) {
  const {
    data,
    colorsData,
    mm,
    width,
    height,
    canvas,
    save,
    EMPTY_COLOR,
    IMPASSABLE_COLOR,
    OCEAN_COLOR,
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

  for (const province of save.impassableProvinces) {
    const key = `${colorsData[(province.id - 1) * 4]};${colorsData[(province.id - 1) * 4 + 1]};${colorsData[(province.id - 1) * 4 + 2]};${colorsData[(province.id - 1) * 4 + 3]}`;
    const value = {
      red: IMPASSABLE_COLOR.red,
      green: IMPASSABLE_COLOR.green,
      blue: IMPASSABLE_COLOR.blue,
      alpha: IMPASSABLE_COLOR.alpha,
    };

    colorMapping.set(key, value);
  }

  for (const province of save.oceansProvinces) {
    const key = `${colorsData[(province.id - 1) * 4]};${colorsData[(province.id - 1) * 4 + 1]};${colorsData[(province.id - 1) * 4 + 2]};${colorsData[(province.id - 1) * 4 + 3]}`;
    const value = {
      red: OCEAN_COLOR.red,
      green: OCEAN_COLOR.green,
      blue: OCEAN_COLOR.blue,
      alpha: OCEAN_COLOR.alpha,
    };

    colorMapping.set(key, value);
  }

  for (const province of save.lakesProvinces) {
    const key = `${colorsData[(province.id - 1) * 4]};${colorsData[(province.id - 1) * 4 + 1]};${colorsData[(province.id - 1) * 4 + 2]};${colorsData[(province.id - 1) * 4 + 3]}`;
    const value = {
      red: OCEAN_COLOR.red,
      green: OCEAN_COLOR.green,
      blue: OCEAN_COLOR.blue,
      alpha: OCEAN_COLOR.alpha,
    };

    colorMapping.set(key, value);
  }

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
    colorsData,
    save,
    IMPASSABLE_COLOR,
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

            if (images.length < (dates.length / 1)) {
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
