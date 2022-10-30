onmessage = function (message) {
  const {
    data,
    colorMapping,
    colorsData,
    mm,
    save,
    EMPTY_COLOR,
    IMPASSABLE_COLOR,
    GREEN_COLOR,
    PROSPERITY_GRADIENT,
    HRE_EMPEROR_COLOR,
    HRE_ELECTOR_COLOR,
    DEVASTATION_GRADIENT,
    HALF_RED_COLOR,
    HALF_GREEN_COLOR,
    DEV_GRADIENT,
    date,
    countries,
    count
  } = message.data;

  console.log(date);

  const prepare = prepareMm(mm, save, null, date, DEV_GRADIENT, EMPTY_COLOR);

  for (const province of save.provinces) {
    const key = `${colorsData[(province.id - 1) * 4]};${colorsData[(province.id - 1) * 4 + 1]};${colorsData[(province.id - 1) * 4 + 2]};${colorsData[(province.id - 1) * 4 + 3]}`;
    const value = provinceColor(mm, province, save, prepare, countries, date, EMPTY_COLOR, GREEN_COLOR, PROSPERITY_GRADIENT, HRE_EMPEROR_COLOR, HRE_ELECTOR_COLOR, DEVASTATION_GRADIENT, PROSPERITY_GRADIENT, HALF_RED_COLOR, HALF_GREEN_COLOR);

    colorMapping.set(key, value);
  }

  const array = new Uint8Array(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const key = `${data[i]};${data[i + 1]};${data[i + 2]};${data[i + 3]}`;
    const value = colorMapping.get(key);

    if (value) {
      array[i] = value.red;
      array[i + 1] = value.green;
      array[i + 2] = value.blue;
      array[i + 3] = value.alpha;
    } else {
      array[i] = IMPASSABLE_COLOR.red;
      array[i + 1] = IMPASSABLE_COLOR.green;
      array[i + 2] = IMPASSABLE_COLOR.blue;
      array[i + 3] = IMPASSABLE_COLOR.alpha;
    }
  }

  postMessage({ array, date, count }, [array.buffer]);
};

function prepareMm(mm, save, dataId, date, DEV_GRADIENT, EMPTY_COLOR) {
  switch (mm) {
    case 'POLITICAL':
      return {};
    case 'RELIGION':
      return {};
    case 'DEVELOPMENT': {
      let min = 3;
      let max = Number.MAX_VALUE;

      save.provinces.forEach(province => {
        const dev = (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);

        if (dev < min) {
          min = dev;
        }

        if (dev > max) {
          max = dev;
        }
      });

      min = Math.max(3, min);
      max = Math.min(min + 50, max);

      const toReturn = {};
      const step = (max - min) / (DEV_GRADIENT.length - 1);

      DEV_GRADIENT.forEach((value, index) => {
        toReturn[(min + index * step) | 0] = value;
      });

      return toReturn;
    }
    case 'HRE':
      return {
        electors: getCountries(save).filter(country => country.history).filter(country => getCHistory(country, save, date).elector).map(value => value.tag),
        emperor: getEmperor(save.hre, date ?? save.date)
      }
    case 'GREAT_POWER':
      return {};
    case 'INSTITUTION': {
      return {
        gradient: getGradient(save.institutions.filter(value => value !== undefined && value.origin >= 0).length + 1)
      }
    }
    case 'TECHNOLOGY': {
      let maxAdm = 1;
      let maxDip = 1;
      let maxMil = 1;
      let minAdm = Number.MAX_VALUE;
      let minDip = Number.MAX_VALUE;
      let minMil = Number.MAX_VALUE;

      save.countries.forEach(country => {
        if (country.alive) {
          maxAdm = Math.max(maxAdm, country.admTech);
          maxDip = Math.max(maxDip, country.dipTech);
          maxMil = Math.max(maxMil, country.milTech);
          minAdm = Math.min(minAdm, country.admTech);
          minDip = Math.min(minDip, country.dipTech);
          minMil = Math.min(minMil, country.milTech);
        }
      });

      const max = maxAdm + maxDip + maxMil;
      const min = minAdm + minDip + minMil;

      return {
        min,
        max,
        gradient: getGradient(max - min)
      }
    }
    case 'GOOD':
      return {};
    case 'CULTURE':
      return {};
    case 'DEVASTATION':
      return {};
    case 'PLAYERS':
      return {};
    case 'MANUAL_DEV': {
      let min = Number.MAX_VALUE;
      let max = 0;

      save.provinces.forEach(province => {
        const dev = province.improvements ? Object.values(province.improvements).reduce((s, v) => s + v, 0) : 0;

        if (dev < min) {
          min = dev;
        }

        if (dev > max) {
          max = dev;
        }
      });

      return getGradient((max / 3) | 0, colorToHex(EMPTY_COLOR), "#00FF00");
    }
    case 'TRADE_NODE':
      return {};
    case 'BUILDINGS': {
      let max = 0;

      save.provinces.forEach(province => {
        const history = getPHistory(province, date);

        if (history && history.buildings && history.buildings.size > max) {
          max = history.buildings.size;
        }
      });

      return { dataId, gradient: getGradient(max, colorToHex(EMPTY_COLOR), "#00FF00") };
    }
    default: {
      return {};
    }
  }
}

function provinceColor(mm, province, save, data, countries, date, EMPTY_COLOR, GREEN_COLOR, HRE_EMPEROR_COLOR, HRE_ELECTOR_COLOR, DEVASTATION_GRADIENT, PROSPERITY_GRADIENT, HALF_RED_COLOR, HALF_GREEN_COLOR) {
  switch (mm) {
    case 'POLITICAL': {
      const owner = getPHistory(province, date).owner;

      if (!owner || (countries.length > 0 && !countries.includes(owner))) {
        return EMPTY_COLOR;
      }

      return getCountry(save, owner).colors.mapColor;
    }
    case 'RELIGION': {
      const history = getPHistory(province, date);

      if (!history.religion || (countries.length > 0 && (!history.owner || !countries.includes(history.owner)))) {
        return EMPTY_COLOR;
      }

      return getReligion(save, history.religion).color;
    }
    case 'DEVELOPMENT': {
      if (countries.length > 0) {
        const history = getPHistory(province, date);

        if (!history.owner || (history.owner && !countries.includes(history.owner))) {
          return EMPTY_COLOR;
        }
      }

      const dev = (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);
      let color = Object.values(data)[0];

      for (const value in data) {
        if (value > dev) {
          break;
        }

        color = data[value];
      }

      return color;
    }
    case 'HRE': {
      const history = getPHistory(province, date);

      if (countries.length > 0 && (!history.owner || !countries.includes(history.owner))) {
        return EMPTY_COLOR;
      }

      if (history && history.owner) {
        if (data.emperor === history.owner) {
          return HRE_EMPEROR_COLOR;
        } else if (data.electors.includes(history.owner)) {
          return HRE_ELECTOR_COLOR;
        }
      }

      return history.hre ? GREEN_COLOR : EMPTY_COLOR;
    }
    case 'GREAT_POWER': {
      const owner = getPHistory(province, date).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);
      return country.greatPowerRank ? country.colors.mapColor : EMPTY_COLOR;
    }
    case 'INSTITUTION': {
      const owner = getPHistory(province, date).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);

      return data.gradient[country.nbInstitutions];
    }
    case 'TECHNOLOGY': {
      const owner = getPHistory(province, date).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);
      const tech = country.admTech + country.dipTech + country.milTech;

      return data.gradient[Math.min((Math.max(data.min, data.max - (data.max - tech) * 1.5 - 1) - data.min) | 0, data.gradient.length)];
    }
    case 'GOOD': {
      const history = getPHistory(province, date);

      if (!history.tradeGood || (countries.length > 0 && (!history.owner || !countries.includes(history.owner)))) {
        return EMPTY_COLOR;
      }

      return getGood(save, history.tradeGood).color;
    }
    case 'CULTURE': {
      const history = getPHistory(province, date);

      if (!history.culture || (countries.length > 0 && (!history.owner || !countries.includes(history.owner)))) {
        return EMPTY_COLOR;
      }

      return getCulture(save, history.culture).color;
    }
    case 'DEVASTATION': {
      const history = getPHistory(province, date);

      if (countries.length > 0 && (!history.owner || !countries.includes(history.owner))) {
        return EMPTY_COLOR;
      }

      if (province.devastation) {
        return DEVASTATION_GRADIENT[10 - (province.devastation / 10 | 0)];
      }

      const area = getArea(save, province);

      if (!area) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, date).owner;
      const state = getAreaState(area, owner);

      if (state) {
        return PROSPERITY_GRADIENT[((state.prosperity ?? 0) / 10 | 0)];
      } else {
        return EMPTY_COLOR;
      }
    }
    case 'PLAYERS': {
      const owner = getPHistory(province, save, date).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);

      if (country.players && country.players.length > 0) {
        return country.colors.mapColor;
      }

      const overlord = getOverlord(country, save);

      if (overlord && overlord.players && overlord.players.length > 0 && date) {
        const subject = getSubjects(overlord, save, date).find(value => value.second === owner);

        if (subject) {
          return subject.date <= date ? overlord.colors.mapColor : EMPTY_COLOR;
        }
      }

      return EMPTY_COLOR;
    }
    case 'MANUAL_DEV': {
      if (countries.length > 0) {
        const history = getPHistory(province, date);

        if (!history.owner || (history.owner && !countries.includes(history.owner))) {
          return EMPTY_COLOR;
        }
      }

      const dev = province.improvements ? Object.values(province.improvements).reduce((s, v) => s + v, 0) : 0;

      if (dev <= 0) {
        return EMPTY_COLOR;
      }

      return data[((dev / 3) - 1) | 0];
    }
    case 'TRADE_NODE': {
      if (!province.node) {
        return EMPTY_COLOR;
      }

      const node = getTradeNode(save, province.node);

      if (!node) {
        return EMPTY_COLOR;
      }

      if (data) {
        if (node === data) {
          return GREEN_COLOR;
        }

        if (data.incoming && data.incoming.find(value => value.from === node.name)) {
          return HALF_GREEN_COLOR;
        }

        if (node.incoming && node.incoming.find(value => value.from === data.name)) {
          return HALF_RED_COLOR;
        }

        return EMPTY_COLOR;
      }

      return node.color;
    }
    case 'BUILDINGS': {
      const history = getPHistory(province, date);

      if (countries.length > 0 && (!history.owner || !countries.includes(history.owner))) {
        return EMPTY_COLOR;
      }

      if (!history.buildings || history.buildings.size === 0) {
        return EMPTY_COLOR;
      }

      if (data.dataId) {
        if (Array.from(history.buildings).includes(data.dataId)) {
          return GREEN_COLOR;
        } else {
          return EMPTY_COLOR;
        }
      }

      return data.gradient[history.buildings.size - 1];
    }
    default: {
      return EMPTY_COLOR;
    }
  }
}

function getPHistory(province, date) {
  let history = { date };

  for (let i = 0; i < province.histories.length; i++) {
    const h = province.histories[i];

    if (h.date && h.date > date) {
      if (i === 0) {
        return h;
      } else {
        return province.histories[i - 1];
      }
    }
  }

  return province.histories.length > 0 ? province.histories[province.histories.length - 1] : history;
}

function getCountry(save, tag) {
  return tag ? save.countries.find(country => tag.toUpperCase() === country.tag) ?? save.countries[0] : save.countries[0];
}

function getCountries(save) {
  return save.countries.filter(c => c.alive);
}

function getReligion(save, name) {
  return save.religions.find(religion => name === religion.name) ?? save.religions[0];
}

function getCulture(save, name) {
  return save.cultures.find(culture => name === culture.name) ?? save.cultures[0];
}

function getGood(save, name) {
  return save.tradeGoods.find(good => name === good.name) ?? save.tradeGoods[0];
}

function getTradeNode(save, name) {
  return (save.tradeNodes && name) ? save.tradeNodes.find(node => name === node.name) : undefined;
}

function getArea(save, province) {
  return save.areas.find(value => value.provinces.includes(province.id)) ?? save.areas[0];
}

function getAreaState(area, tag) {
  return (area.states && tag) ? area.states[tag] : null;
}

function getOverlord(country, save) {
  const overlord = save.diplomacy.dependencies.find(dependency => dependency.second === country.tag);

  return overlord ? getCountry(save, overlord.first) : undefined;
}

function getSubjects(country, save, date) {
  return save.diplomacy.dependencies.filter(dependency => dependency.first === country.tag && dependency.date <= (date ?? save.date) && (dependency.endDate === undefined || dependency.endDate >= (date ?? save.date)));
}

function getGradient(midPoints, minColor = "#FF0000", maxColor = "#00FF00") {
  return new Gradient().setColorGradient(minColor, maxColor).setMidpoint(midPoints).getColors().map(hex => hexToColor(hex));
}

function hexToColor(hex) {
  const bigint = parseInt(hex.substring(1), 16);

  return {
    red: (bigint >> 16) & 255,
    green: (bigint >> 8) & 255,
    blue: bigint & 255,
    alpha: 255,
  }
}

function getEmperor(empire, date) {
  if ((empire.dismantleDate && date <= empire.dismantleDate) || !empire.oldEmperors || empire.oldEmperors.length === 0) {
    return undefined;
  }

  let tag = empire.oldEmperors[0].country;

  for (const oldEmperor of empire.oldEmperors) {
    if (oldEmperor.date > date) {
      break;
    }

    tag = oldEmperor.country;
  }

  return tag;
}

function getCHistory(country, save, date) {
  return (date && save.date !== date) ? getCHistoryInternal(country, date)
    : save.currentCountries.get(country.tag) ?? save.currentCountries.values().next().value;
}

function getCHistoryInternal(country, date) {
  let history = { date };

  if (!country.history) {
    return history;
  }

  for (const h of country.history) {
    if (!h.date || h.date <= date) {
      let acceptedCultures = (history && history.acceptedCultures) ?? [];

      if (h.acceptedCultures) {
        acceptedCultures = acceptedCultures.concat(h.acceptedCultures);
      }

      if (h.removeAcceptedCultures) {
        acceptedCultures = acceptedCultures.filter(e => !h.removeAcceptedCultures?.includes(e))
      }

      let ideasLevel = (history && history.ideasLevel) ?? {};

      if (h.ideasLevel) {
        Object.entries(h.ideasLevel).forEach(([key, value]) => {
          if (value) {
            ideasLevel[key] = h.date;
          } else {
            delete ideasLevel[key];
          }
        });
      }

      let countryFlags = (history && history.countryFlags) ?? {};

      if (h.setCountryFlag) {
        countryFlags[h.setCountryFlag] = h.date;
      }

      let decisions = (history && history.decisions) ?? {};

      if (h.decision) {
        decisions[h.decision] = h.date;
      }

      history = {
        ...(typeof history === 'object' ? history : {}),
        ...h,
        acceptedCultures,
        ideasLevel,
        countryFlags,
        decisions,
      };

      if (history.union && h.monarch && h.monarch.country === country.tag) {
        delete history.union;
      }
    } else {
      break;
    }
  }

  return history;
}

function colorToHex(color) {
  return '#' + [color.red, color.green, color.blue].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex
  }).join('');
}

class GradientColor {
  constructor(startColor = "", endColor = "", minNum = 0, maxNum = 10) {
    this.setColorGradient = (colorStart, colorEnd) => {
      startColor = getHexColor(colorStart);
      endColor = getHexColor(colorEnd);
    };

    this.setMidpoint = (minNumber, maxNumber) => {
      minNum = minNumber;
      maxNum = maxNumber;
    };

    this.getColor = (numberValue) => {
      if (numberValue) {
        return (
          "#" +
          generateHex(
            numberValue,
            startColor.substring(0, 2),
            endColor.substring(0, 2)
          ) +
          generateHex(
            numberValue,
            startColor.substring(2, 4),
            endColor.substring(2, 4)
          ) +
          generateHex(
            numberValue,
            startColor.substring(4, 6),
            endColor.substring(4, 6)
          )
        );
      }
    };

    const generateHex = (number, start, end) => {
      if (number < minNum) {
        number = minNum;
      } else if (number > maxNum) {
        number = maxNum;
      }

      const midPoint = maxNum - minNum;
      const startBase = parseInt(start, 16);
      const endBase = parseInt(end, 16);
      const average = (endBase - startBase) / midPoint;
      const finalBase = Math.round(average * (number - minNum) + startBase);
      const balancedFinalBase =
        finalBase < 16 ? "0" + finalBase.toString(16) : finalBase.toString(16);
      return balancedFinalBase;
    };

    const getHexColor = (color) => {
      return color.substring(color.length - 6, color.length);
    };
  }
}

//Sorry to https://www.npmjs.com/package/javascript-color-gradient could not find a better solution

class Gradient {
  constructor(
    colorGradients = "",
    maxNum = 10,
    colors = ["", ""],
    intervals = []
  ) {
    const setColorGradient = (gradientColors) => {
      if (gradientColors.length < 2) {
        throw new Error(
          `setColorGradient should have more than ${gradientColors.length} color`
        );
      } else {
        const increment = maxNum / (gradientColors.length - 1);
        const firstColorGradient = new GradientColor();
        const lower = 0;
        const upper = 0 + increment;
        firstColorGradient.setColorGradient(
          gradientColors[0],
          gradientColors[1]
        );
        firstColorGradient.setMidpoint(lower, upper);
        colorGradients = [firstColorGradient];
        intervals = [
          {
            lower,
            upper,
          },
        ];

        for (let i = 1; i < gradientColors.length - 1; i++) {
          const gradientColor = new GradientColor();
          const lower = 0 + increment * i;
          const upper = 0 + increment * (i + 1);
          gradientColor.setColorGradient(
            gradientColors[i],
            gradientColors[i + 1]
          );
          gradientColor.setMidpoint(lower, upper);
          colorGradients[i] = gradientColor;
          intervals[i] = {
            lower,
            upper,
          };
        }
        colors = gradientColors;
      }
    };

    this.setColorGradient = (...gradientColors) => {
      setColorGradient(gradientColors);
      return this;
    };

    this.getColors = () => {
      const gradientColorsArray = [];
      for (let j = 0; j < intervals.length; j++) {
        const interval = intervals[j];
        const start = interval.lower === 0 ? 1 : Math.ceil(interval.lower);
        const end =
          interval.upper === maxNum
            ? interval.upper + 1
            : Math.ceil(interval.upper);
        for (let i = start; i < end; i++) {
          gradientColorsArray.push(colorGradients[j].getColor(i));
        }
      }
      return gradientColorsArray;
    };

    this.getColor = (numberValue) => {
      if (isNaN(numberValue)) {
        throw new TypeError(`getColor should be a number`);
      } else if (numberValue <= 0) {
        throw new TypeError(`getColor should be greater than ${numberValue}`);
      } else {
        const toInsert = numberValue + 1;
        const segment = (maxNum - 0) / colorGradients.length;
        const index = Math.min(
          Math.floor((Math.max(numberValue, 0) - 0) / segment),
          colorGradients.length - 1
        );
        return colorGradients[index].getColor(toInsert);
      }
    };

    this.setMidpoint = (maxNumber) => {
      if (!isNaN(maxNumber) && maxNumber >= 0) {
        maxNum = maxNumber;
        setColorGradient(colors);
      } else if (maxNumber <= 0) {
        throw new RangeError(`midPoint should be greater than ${maxNumber}`);
      } else {
        throw new RangeError("midPoint should be a number");
      }
      return this;
    };
  }
}
