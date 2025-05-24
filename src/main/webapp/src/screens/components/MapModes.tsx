import { intl } from 'index';
import { SaveColor, SaveCountry, SaveTradeNode, SaveWar } from 'types/api.types';
import {
  DEV_GRADIENT,
  DEVASTATION_GRADIENT,
  EMPTY_COLOR,
  FULL_GREEN_COLOR,
  FULL_RED_COLOR,
  getGradient,
  GREEN_COLOR,
  HALF_GREEN_COLOR,
  HALF_RED_COLOR,
  HRE_ELECTOR_COLOR,
  HRE_EMPEROR_COLOR,
  PROSPERITY_GRADIENT
} from 'utils/colors.utils';
import { colorToHex, formatDate, formatNumber, stringComparator } from 'utils/format.utils';
import {
  getArea,
  getAreaState,
  getBuildingImage,
  getBuildingName,
  getBuildingsImage,
  getBuildingsName,
  getCHistory,
  getCountries,
  getCountry,
  getCountryName,
  getCountrysName,
  getCulture,
  getCultureName,
  getCulturesName,
  getEmperor,
  getGood,
  getGoodName,
  getGoodsImage,
  getGoodsName,
  getInstitutionName, getInstitutionImage,
  getOverlord,
  getPHistory,
  getProvinceAllLosses,
  getProvinceLosses,
  getReligion,
  getReligionName,
  getReligionsImage,
  getReligionsName,
  getSubjects,
  getSubjectTypeName,
  getTradeNode,
  getTradeNodesName,
  getWar, getInstitutionsName, getInstitutionsImage, getInstitutionIndex, getCountrysFlag, getCountryFlag, getPlayer
} from 'utils/save.utils';
import * as React from "react";
import { IMapMode, MapMode } from 'types/map.types';
import { Avatar, Grid, MenuItem, Typography } from "@mui/material";

export const mapModes: Record<MapMode, IMapMode> = {
  [MapMode.POLITICAL]: {
    mapMode: MapMode.POLITICAL,
    provinceColor: (province, save, data, countries, date) => {
      const owner = getPHistory(province, save, date).owner;

      if (!owner || (countries.length > 0 && !countries.includes(owner))) {
        return EMPTY_COLOR;
      }

      if (data && owner !== data) {
        return EMPTY_COLOR;
      }

      return getCountry(save, owner).colors.mapColor;
    },
    image: 'political',
    allowDate: true,
    prepare: (_save, dataId) => dataId,
    selectable: true,
    tooltip: (province, save, _dataId, date) => {
      const owner = getPHistory(province, save, date).owner;

      if (!owner) {
        return '';
      }

      return `${ province.name } : ${ getCountryName(save, owner) }`;
    },
    hasTooltip: true,
    supportDate: true,
    selectRenderInput: (value, save, theme) => {
      return (
        value ?
          <Grid container alignItems='center'>
            <Avatar src={ getCountryFlag(save, value) } variant='square'
                    style={ { display: 'inline-block', width: 24, height: 24 } }/>
            <Typography variant='body1' style={ {
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              marginLeft: theme.spacing(1)
            } }>
              { getCountryName(save, value) }
            </Typography>
          </Grid>
          :
          <Typography variant='body1' style={ {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            marginLeft: theme.spacing(1)
          } }>
            { intl.formatMessage({ id: 'map.mod.POLITICAL' }) }
          </Typography>
      )
    },
    selectItems: (save, theme) => {
      return save.countries
        .filter(c => c.alive)
        .sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b)))
        .map(country => (
          <MenuItem value={ country.tag } key={ country.tag }>
            <Avatar src={ getCountrysFlag(country) } variant='square'
                    style={ { display: 'inline-block' } }/>
            <Typography variant='body1' style={ { marginLeft: theme.spacing(1) } }>
              { getCountrysName(country) }
            </Typography>
          </MenuItem>
        ))
    }
  },
  [MapMode.RELIGION]: {
    mapMode: MapMode.RELIGION,
    provinceColor: (province, save, data, countries, date) => {
      const history = getPHistory(province, save, date);

      if (!history.religion || (countries.length > 0 && (!history.owner || !countries.includes(history.owner)))) {
        return EMPTY_COLOR;
      }

      if (data) {
        if (history.religion === data) {
          return getReligion(save, data).color;
        } else {
          return EMPTY_COLOR;
        }
      }

      return getReligion(save, history.religion).color;
    },
    image: 'religion',
    allowDate: true,
    prepare: (_save, dataId) => dataId,
    selectable: true,
    tooltip: (province, save, _countries, date) => {
      const religion = getPHistory(province, save, date).religion;

      if (!religion) {
        return '';
      }

      return `${ province.name } : ${ getReligionName(save, religion) }`;
    },
    hasTooltip: true,
    supportDate: true,
    selectRenderInput: (value, save, theme) => {
      const religion = value ? getReligion(save, value) : null;
      return (
        religion ?
          <Grid container>
            <div style={ {
              width: 10,
              height: 10,
              backgroundColor: colorToHex(religion.color),
              margin: 'auto'
            } }/>
            <Avatar src={ getReligionsImage(religion) } variant='square'
                    style={ { display: 'inline-block', width: 24, height: 24 } }/>
            <Typography variant='body1' style={ {
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              marginLeft: theme.spacing(1)
            } }>
              { getReligionsName(religion) }
            </Typography>
          </Grid>
          :
          <Typography variant='body1' style={ {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            marginLeft: theme.spacing(1)
          } }>
            { intl.formatMessage({ id: 'map.mod.RELIGION' }) }
          </Typography>
      )
    },
    selectItems: (save, theme) => {
      return save.religions.sort((a, b) => stringComparator(getReligionsName(a), getReligionsName(b)))
        .map(religion => (
          <MenuItem value={ religion.name } key={ religion.name }>
            <Grid container alignItems='center'>
              <div style={ {
                width: 10,
                height: 10,
                backgroundColor: colorToHex(religion.color),
                margin: 'auto'
              } }/>
              <Avatar src={ getReligionsImage(religion) } variant='square'
                      style={ { display: 'inline-block' } }/>
              <Typography variant='body1' style={ { marginLeft: theme.spacing(1) } }>
                { getReligionsName(religion) }
              </Typography>
            </Grid>
          </MenuItem>
        ))
    }
  },
  [MapMode.DEVELOPMENT]: {
    mapMode: MapMode.DEVELOPMENT,
    provinceColor: (province, save, data: Record<number, SaveColor>, countries) => {
      if (countries.length > 0) {
        const history = getPHistory(province, save);

        if (!history.owner || (history.owner && !countries.includes(history.owner))) {
          return EMPTY_COLOR;
        }
      }

      const dev = (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);
      let color = Object.values(data)[0];

      for (const value in data) {
        if ((value as unknown as keyof typeof data) > dev) {
          break;
        }

        color = data[value];
      }

      return color;
    },
    image: 'development',
    allowDate: false,
    prepare: (save) => {
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

      const toReturn: Record<number, SaveColor> = {};
      const step = (max - min) / (DEV_GRADIENT.length - 1);

      DEV_GRADIENT.forEach((value, index) => {
        toReturn[(min + index * step) | 0] = value;
      });

      return toReturn;
    },
    selectable: true,
    tooltip: (province) => {
      return `${ province.name } : ${ province.baseTax ?? 0 }/${ province.baseProduction ?? 0 }/${ province.baseManpower ?? 0 } (${ (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0) })`;
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.HRE]: {
    mapMode: MapMode.HRE,
    provinceColor: (province, save, {
      electors,
      emperor
    }: { electors: Array<string>, emperor: string }, countries, date) => {
      const history = getPHistory(province, save, date);

      if (countries.length > 0 && (!history.owner || !countries.includes(history.owner))) {
        return EMPTY_COLOR;
      }

      if (history && history.owner) {
        if (emperor === history.owner) {
          return HRE_EMPEROR_COLOR;
        } else if (electors.includes(history.owner)) {
          return HRE_ELECTOR_COLOR;
        }
      }

      return history.hre ? GREEN_COLOR : EMPTY_COLOR;
    },
    image: 'hre',
    allowDate: true,
    prepare: (save, dataId, date) => {
      return {
        electors: getCountries(save).filter(country => country.history).filter(
          country => getCHistory(country, save, date).elector).map(value => value.tag),
        emperor: getEmperor(save.hre, date ?? save.date)
      }
    },
    selectable: true,
    tooltip: (province, save, dataId, date) => {
      const history = getPHistory(province, save, date);

      if (!history.owner) {
        return '';
      }

      if (getEmperor(save.hre, date ?? save.date) === history.owner) {
        return `${ getCountryName(save, history.owner) } : ${ intl.formatMessage({ id: 'country.emperor' }) }`;
      } else if (getCountries(save).filter(country => country.history).filter(
        country => getCHistory(country, save, date).elector).map(
        value => value.tag).includes(history.owner)) {
        return `${ getCountryName(save, history.owner) } : ${ intl.formatMessage({ id: 'country.elector' }) }`;
      }

      return history.hre ? `${ getCountryName(save, history.owner) } : ${ intl.formatMessage(
        { id: 'country.hre' }) }` : '';
    },
    hasTooltip: true,
    supportDate: true,
  },
  [MapMode.GREAT_POWER]: {
    mapMode: MapMode.GREAT_POWER,
    provinceColor: (province, save, data, countries) => {
      const owner = getPHistory(province, save).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);
      return country.greatPowerRank ? country.colors.mapColor : EMPTY_COLOR;
    },
    image: 'great_power',
    allowDate: false,
    prepare: () => {
    },
    selectable: true,
    tooltip: (province, save, dataId,) => {
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      const country = getCountry(save, owner);

      if (!country.greatPowerRank) {
        return '';
      }

      return `${ getCountrysName(country) } : ${ country.greatPowerRank }`;
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.INSTITUTION]: {
    mapMode: MapMode.INSTITUTION,
    provinceColor: (province, save, { dataId, gradient }: { dataId?: string, gradient: Array<SaveColor> }, countries) => {
      if (dataId) {
        if (gradient && province.institutions && province.institutions[getInstitutionIndex(save, dataId)]) {
          return gradient[Math.floor(province.institutions[getInstitutionIndex(save, dataId)] / 10)];
        } else {
          return EMPTY_COLOR;
        }
      }

      const nbInstitutions = province.institutions?.filter(i => i >= 100.0).length ?? 0;
      return gradient[nbInstitutions];
    },
    image: 'institution',
    allowDate: false,
    prepare: (save, dataId) => {
      return {
        dataId: dataId,
        gradient: dataId ? getGradient(11, colorToHex(EMPTY_COLOR), colorToHex(GREEN_COLOR)) :
          getGradient(save.institutions.filter(value => value !== undefined && value.origin !== undefined).length + 1)
      }
    },
    selectable: true,
    tooltip: (province, save) => {
      if (!province.institutions) {
        return '';
      }

      let instit = -1;

      for (let i = 0; i < province.institutions.length; i++) {
        if (province.institutions[i] >= 100) {
          instit = i;
        }
      }

      if (instit < 0) {
        return '';
      }

      return `${ province.name } : ${ getInstitutionName(save, instit) }`;
    },
    hasTooltip: true,
    supportDate: false,
    selectRenderInput: (value, save, theme) => {
      return (
        value ?
          <Grid container alignItems='center'>
            <Avatar src={ getInstitutionImage(save, value) } variant='square'
                    style={ { display: 'inline-block', width: 24, height: 24 } }/>
            <Typography variant='body1' style={ {
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              marginLeft: theme.spacing(1)
            } }>
              { getInstitutionName(save, value) }
            </Typography>
          </Grid>
          :
          <Typography variant='body1' style={ {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            marginLeft: theme.spacing(1)
          } }>
            { intl.formatMessage({ id: 'map.mod.INSTITUTION' }) }
          </Typography>
      )
    },
    selectItems: (save, theme) => {
      return save.institutions
        .map(institution => (
          <MenuItem value={ institution.name } key={ institution.name }>
            <Avatar src={ getInstitutionsImage(institution) } variant='square'
                    style={ { display: 'inline-block' } }/>
            <Typography variant='body1' style={ { marginLeft: theme.spacing(1) } }>
              { getInstitutionsName(institution) }
            </Typography>
          </MenuItem>
        ))
    }
  },
  [MapMode.TECHNOLOGY]: {
    mapMode: MapMode.TECHNOLOGY,
    provinceColor: (province, save, {
      gradient,
      min,
      max
    }: { gradient: Array<SaveColor>, min: number, max: number }, countries) => {
      const owner = getPHistory(province, save).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);
      const tech = country.admTech + country.dipTech + country.milTech;

      return gradient[Math.min((Math.max(min, max - (max - tech) * 1.5 - 1) - min) | 0, gradient.length)];
    },
    image: 'technology',
    allowDate: false,
    prepare: (save) => {
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
    },
    selectable: true,
    tooltip: (province, save) => {
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      const country = getCountry(save, owner);

      return `${ getCountrysName(country) } : ${ country.admTech }/${ country.dipTech }/${ country.milTech }`;
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.GOOD]: {
    mapMode: MapMode.GOOD,
    provinceColor: (province, save, data, countries, date) => {
      const history = getPHistory(province, save, date);

      if (!history.tradeGood || (countries.length > 0 && (!history.owner || !countries.includes(
        history.owner)))) {
        return EMPTY_COLOR;
      }

      if (data) {
        if (history.tradeGood === data) {
          return getGood(save, data).color;
        } else {
          return EMPTY_COLOR;
        }
      }

      return getGood(save, history.tradeGood).color;
    },
    image: 'good',
    allowDate: true,
    prepare: (_save, dataId) => dataId,
    selectable: true,
    tooltip: (province, save, dataId, date) => {
      const good = getPHistory(province, save, date).tradeGood;

      if (!good) {
        return '';
      }

      return `${ province.name } : ${ getGoodName(save, good) }`;
    },
    hasTooltip: true,
    supportDate: true,
    selectRenderInput: (value, save, theme) => {
      const good = value ? getGood(save, value) : null;
      return (
        good ?
          <Grid container alignItems='center'>
            <div style={ {
              width: 10,
              height: 10,
              backgroundColor: colorToHex(good.color),
              margin: 'auto'
            } }/>
            <Avatar src={ getGoodsImage(good) } variant='square'
                    style={ { display: 'inline-block', width: 24, height: 24 } }/>
            <Typography variant='body1' style={ {
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              marginLeft: theme.spacing(1)
            } }>
              { getGoodsName(good) }
            </Typography>
          </Grid>
          :
          <Typography variant='body1' style={ {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            marginLeft: theme.spacing(1)
          } }>
            { intl.formatMessage({ id: 'map.mod.GOOD' }) }
          </Typography>
      )
    },
    selectItems: (save, theme) => {
      return save.tradeGoods.sort((a, b) => stringComparator(getGoodsName(a), getGoodsName(b)))
        .map(good => (
          <MenuItem value={ good.name } key={ good.name }>
            <Grid container alignItems='center'>
              <div style={ {
                width: 10,
                height: 10,
                backgroundColor: colorToHex(good.color),
                margin: 'auto'
              } }/>
              <Avatar src={ getGoodsImage(good) } variant='square'
                      style={ { display: 'inline-block' } }/>
              <Typography variant='body1' style={ { marginLeft: theme.spacing(1) } }>
                { getGoodsName(good) }
              </Typography>
            </Grid>
          </MenuItem>
        ))
    }
  },
  [MapMode.CULTURE]: {
    mapMode: MapMode.CULTURE,
    provinceColor: (province, save, data, countries, date) => {
      const history = getPHistory(province, save, date);

      if (!history.culture || (countries.length > 0 && (!history.owner || !countries.includes(history.owner)))) {
        return EMPTY_COLOR;
      }

      if (data) {
        if (history.culture === data) {
          return getCulture(save, data).color;
        } else {
          return EMPTY_COLOR;
        }
      }

      return getCulture(save, history.culture).color;
    },
    image: 'culture',
    allowDate: true,
    prepare: (_save, dataId) => dataId,
    selectable: true,
    tooltip: (province, save, dataId, date) => {
      const culture = getPHistory(province, save, date).culture;

      if (!culture) {
        return '';
      }

      return `${ province.name } : ${ getCultureName(save, culture) }`;
    },
    hasTooltip: true,
    supportDate: true,
    selectRenderInput: (value, save, theme) => {
      const culture = value ? getCulture(save, value) : null;
      return (
        culture ?
          <Grid container alignItems='center'>
            <div style={ {
              width: 10,
              height: 10,
              backgroundColor: colorToHex(culture.color),
              margin: 'auto'
            } }/>
            <Typography variant='body1' style={ {
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              marginLeft: theme.spacing(1)
            } }>
              { getCulturesName(culture) }
            </Typography>
          </Grid>
          :
          <Typography variant='body1' style={ {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            marginLeft: theme.spacing(1)
          } }>
            { intl.formatMessage({ id: 'map.mod.CULTURE' }) }
          </Typography>
      )
    },
    selectItems: (save, theme) => {
      return save.cultures.sort((a, b) => stringComparator(getCulturesName(a), getCulturesName(b)))
        .map(culture => (
          <MenuItem value={ culture.name } key={ culture.name }>
            <Grid container alignItems='center'>
              <div style={ {
                width: 10,
                height: 10,
                backgroundColor: colorToHex(culture.color),
                margin: 'auto'
              } }/>
              <Typography variant='body1' style={ { marginLeft: theme.spacing(1) } }>
                { getCulturesName(culture) }
              </Typography>
            </Grid>
          </MenuItem>
        ))
    }
  },
  [MapMode.DEVASTATION]: {
    mapMode: MapMode.DEVASTATION,
    provinceColor: (province, save, data, countries) => {
      const history = getPHistory(province, save);

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

      const owner = getPHistory(province, save).owner;
      const state = getAreaState(area, owner);

      if (state) {
        return PROSPERITY_GRADIENT[((state.prosperity ?? 0) / 10 | 0)];
      } else {
        return EMPTY_COLOR;
      }
    },
    image: 'devastation',
    allowDate: false,
    prepare: () => {
    },
    selectable: true,
    tooltip: (province, save) => {
      if (province.devastation) {
        return `${ province.name } : ${ intl.formatMessage({ id: 'province.devastation' }) } : ${ formatNumber(
          province.devastation) }`;
      } else {
        const area = getArea(save, province);

        if (!area) {
          return '';
        }

        const owner = getPHistory(province, save).owner;
        const state = getAreaState(area, owner);

        if (state) {
          return `${ province.name } : ${ intl.formatMessage(
            { id: 'province.prosperity' }) } : ${ formatNumber(state.prosperity) }%`;
        } else {
          return '';
        }
      }
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.PLAYERS]: {
    mapMode: MapMode.PLAYERS,
    provinceColor: (province, save, data, countries, date) => {
      const owner = getPHistory(province, save, date).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      if (data && owner !== data) {
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
    },
    image: 'players',
    allowDate: true,
    prepare: (_save, dataId) => dataId,
    selectable: true,
    tooltip: (province, save, dataId, date) => {
      const owner = getPHistory(province, save, date).owner;

      if (!owner) {
        return '';
      }

      const country = getCountry(save, owner);

      if (country.players && country.players.length > 0) {
        return `${ getCountrysName(country) } : ${ country.players[0] }`;
      }

      const overlord = getOverlord(country, save);

      return (overlord && overlord.players && overlord.players.length > 0) ? `${ getCountrysName(
        country) } : ${ overlord.players[0] }` : '';
    },
    hasTooltip: true,
    supportDate: true,
    selectRenderInput: (value, save, theme) => {
      const country = value ? getCountry(save, value) : null;
      return (
        country ?
          <Grid container alignItems='center'>
            <Avatar src={ getCountrysFlag(country) } variant='square'
                    style={ { display: 'inline-block', width: 24, height: 24 } }/>
            <Typography variant='body1' style={ {
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              marginLeft: theme.spacing(1)
            } }>
              { `${getCountrysName(country)} (${getPlayer(country)})` }
            </Typography>
          </Grid>
          :
          <Typography variant='body1' style={ {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            marginLeft: theme.spacing(1)
          } }>
            { intl.formatMessage({ id: 'map.mod.PLAYERS' }) }
          </Typography>
      )
    },
    selectItems: (save, theme) => {
      return save.countries
        .filter(c => c.alive && c.players && c.players.length > 0)
        .sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b)))
        .map(country => (
          <MenuItem value={ country.tag } key={ country.tag }>
            <Avatar src={ getCountrysFlag(country) } variant='square'
                    style={ { display: 'inline-block' } }/>
            <Typography variant='body1' style={ { marginLeft: theme.spacing(1) } }>
              { `${getCountrysName(country)} (${getPlayer(country)})` }
            </Typography>
          </MenuItem>
        ))
    }
  },
  [MapMode.LOSSES]: {
    mapMode: MapMode.LOSSES,
    provinceColor: (province, save, {
      war,
      gradient,
      maxLosses
    }: { war: SaveWar, gradient: Array<SaveColor>, maxLosses: number }, countries, date) => {
      const losses = war ? getProvinceLosses(war, province.id) : getProvinceAllLosses(province, date);

      return losses === 0 ? EMPTY_COLOR : gradient[(losses / maxLosses) * 9 | 0];
    },
    image: 'manpower',
    allowDate: true,
    prepare: (save, dataId, date) => {
      if (dataId) {
        const war = getWar(save, Number(dataId));
        const gradient = getGradient(10, colorToHex(EMPTY_COLOR), '#FF0000');
        const maxLosses = !war ? 0 : Math.max(
          ...war.history.filter(h => h.battles && h.battles.length > 0).flatMap(h => h.battles ?? []).map(
            b => b.location)
            .map(loc => getProvinceLosses(war, loc)));

        return { war, gradient, maxLosses };
      } else {
        const gradient = getGradient(10, colorToHex(EMPTY_COLOR), '#FF0000');
        const maxLosses = Math.max(...save.provinces.map(p => getProvinceAllLosses(p, date)));

        return { gradient, maxLosses };
      }
    },
    selectable: true,
    tooltip: (province, save, dataId) => {
      if (dataId) {
        const war = getWar(save, Number(dataId));

        if (!war) {
          return '';
        }

        return `${ province.name } : ${ formatNumber(getProvinceLosses(war, province.id)) }`;
      } else {
        return `${ province.name } : ${ formatNumber(getProvinceAllLosses(province)) }`;
      }
    },
    hasTooltip: true,
    supportDate: true,
  },
  [MapMode.WAR]: {
    mapMode: MapMode.WAR,
    provinceColor: (province, save, { war }: { war: SaveWar }) => {
      if (!war) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, save, war.startDate).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      if (Object.keys(war.attackers).includes(owner)) {
        return HALF_RED_COLOR;
      } else if (Object.keys(war.defenders).includes(owner)) {
        return HALF_GREEN_COLOR;
      } else {
        return EMPTY_COLOR;
      }
    },
    image: 'diplomacy',
    allowDate: false,
    prepare: (save, dataId) => {
      return { war: getWar(save, Number(dataId)) };
    },
    selectable: false,
    tooltip: (province, save, dataId) => {
      const war = getWar(save, Number(dataId));

      if (!war) {
        return '';
      }

      const owner = getPHistory(province, save, war.endDate ?? undefined).owner;

      if (!owner) {
        return '';
      }

      if (Object.keys(war.attackers).includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'war.attackers' }) }`;
      } else if (Object.keys(war.defenders).includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'war.defenders' }) }`;
      } else {
        return '';
      }
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.MANUAL_DEV]: {
    mapMode: MapMode.MANUAL_DEV,
    provinceColor: (province, save, data: Array<SaveColor>, countries) => {
      if (countries.length > 0) {
        const history = getPHistory(province, save);

        if (!history.owner || (history.owner && !countries.includes(history.owner))) {
          return EMPTY_COLOR;
        }
      }

      const dev = province.improvements ? Object.values(province.improvements).reduce((s, v) => s + v, 0) : 0;

      if (dev <= 0) {
        return EMPTY_COLOR;
      }

      return data[((dev / 3) - 1) | 0];
    },
    image: 'development',
    allowDate: false,
    prepare: (save) => {
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

      return getGradient((Math.max(max, 3) / 3) | 0, colorToHex(EMPTY_COLOR), "#00FF00");
    },
    selectable: true,
    tooltip: (province, save, dataId) => {
      const dev = province.improvements ? Object.values(province.improvements).reduce((s, v) => s + v, 0) : 0;

      return `${ province.name } : ${ dev }`;
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.DIPLOMACY]: {
    mapMode: MapMode.DIPLOMACY,
    provinceColor: (province, save, { country }: { country: SaveCountry | undefined }, countries, date) => {
      if (!country) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      if (country.tag === owner) {
        return FULL_GREEN_COLOR;
      }

      if (country.alliances && country.alliances.includes(owner)) {
        return {
          red: 97,
          green: 157,
          blue: 237,
          alpha: 255,
        };
      }

      if (country.atWarWith && country.atWarWith.includes(owner)) {
        return HALF_RED_COLOR;
      }

      if (getSubjects(country, save, date).map(value => value.second).includes(owner)) {
        return {
          red: 88,
          green: 176,
          blue: 148,
          alpha: 255,
        };
      }

      if (country.guarantees && country.guarantees.includes(owner)) {
        return {
          red: 156,
          green: 39,
          blue: 176,
          alpha: 255,
        };
      }

      if (country.guarantedBy && country.guarantedBy.includes(owner)) {
        return {
          red: 121,
          green: 39,
          blue: 176,
          alpha: 255,
        };
      }

      if (country.royalMarriages && country.royalMarriages.includes(owner)) {
        return {
          red: 74,
          green: 20,
          blue: 140,
          alpha: 255,
        };
      }

      return EMPTY_COLOR;
    },
    image: 'diplomacy',
    allowDate: false,
    prepare: (save, dataId) => {
      return { country: dataId ? getCountry(save, dataId) : undefined };
    },
    selectable: false,
    tooltip: (province, save, dataId, date) => {
      if (!dataId) {
        return '';
      }

      const country = getCountry(save, dataId);
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      if (country.tag === owner) {
        return getCountrysName(country);
      }

      if (country.alliances && country.alliances.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.ally' }) }`;
      }

      if (country.atWarWith && country.atWarWith.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.atWarWith' }) }`;
      }

      if (getSubjects(country, save, date).map(value => value.second).includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ getSubjectTypeName(save,
          getSubjects(country, save, date).find(value => value.second === owner)?.type) }`;
      }

      if (country.guarantees && country.guarantees.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.guaranty' }) }`;
      }

      if (country.guarantedBy && country.guarantedBy.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.guaranteedBy' }) }`;
      }

      if (country.royalMarriages && country.royalMarriages.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.royalMarriage' }) }`;
      }

      return '';
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.C_MANUAL_DEV]: {
    mapMode: MapMode.C_MANUAL_DEV,
    provinceColor: (province, save, { data, tag }: { data: Array<SaveColor>, tag: string | null }, countries) => {
      if (countries.length > 0) {
        const history = getPHistory(province, save);

        if (!history.owner || (history.owner && !countries.includes(history.owner))) {
          return EMPTY_COLOR;
        }
      }

      if (!tag) {
        return EMPTY_COLOR;
      }

      const dev = province.improvements ? province.improvements[tag] ?? 0 : 0;

      if (dev <= 0) {
        return EMPTY_COLOR;
      }

      return data[((dev / 3) - 1) | 0];
    },
    image: 'development',
    allowDate: false,
    prepare: (save, dataId) => {
      let min = Number.MAX_VALUE;
      let max = 0;

      save.provinces.forEach(province => {
        const dev = (province.improvements && dataId) ? province.improvements[dataId] ?? 0 : 0;

        if (dev < min) {
          min = dev;
        }

        if (dev > max) {
          max = dev;
        }
      });

      return { tag: dataId, data: getGradient((max / 3) | 0, colorToHex(EMPTY_COLOR), "#00FF00") };
    },
    selectable: false,
    tooltip: (province, save, dataId) => {
      if (!dataId) {
        return '';
      }

      return `${ province.name } : ${ province.improvements ? province.improvements[dataId] ?? 0 : 0 }`;
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.ONCE_WAR]: {
    mapMode: MapMode.ONCE_WAR,
    provinceColor: (province, save, { tag }: { tag: string | null }, countries) => {
      if (!tag) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      if (owner === tag) {
        return HALF_GREEN_COLOR;
      }

      if (save.wars && save.wars.find(
        war => (Object.keys(war.attackers).includes(tag) && Object.keys(war.defenders).includes(owner))
          || (Object.keys(war.defenders).includes(tag) && Object.keys(war.attackers).includes(
            owner))) !== undefined) {
        return HALF_RED_COLOR;
      } else {
        return EMPTY_COLOR;
      }
    },
    image: 'war',
    allowDate: false,
    prepare: (save, dataId) => {
      return { tag: dataId };
    },
    selectable: false,
    tooltip: (province, save, dataId) => {
      if (!dataId) {
        return '';
      }

      const country = getCountry(save, dataId);
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      if (owner === country.tag) {
        return getCountrysName(country);
      }

      const war = save.wars && save.wars.slice().reverse()
        .find(war => (Object.keys(war.attackers).includes(country.tag) && Object.keys(war.defenders).includes(
            owner))
          || (Object.keys(war.defenders).includes(country.tag) && Object.keys(war.attackers).includes(
            owner)));

      if (war !== undefined) {
        return `${ getCountryName(save, owner) }: ${ formatDate(war.startDate) }`;
      } else {
        return '';
      }
    },
    hasTooltip: true,
    supportDate: false,
  },
  [MapMode.TRADE_NODE]: {
    mapMode: MapMode.TRADE_NODE,
    provinceColor: (province, save, data: SaveTradeNode) => {
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
    },
    image: 'node',
    allowDate: true,
    prepare: (save, dataId, date) => {
      return dataId ? getTradeNode(save, dataId) : undefined;
    },
    selectable: true,
    tooltip: (province, save) => {
      const node = getTradeNode(save, province.node);

      if (!node) {
        return '';
      }

      return `${ province.name } : ${ getTradeNodesName(node) }`;
    },
    hasTooltip: true,
    supportDate: true,
  },
  [MapMode.BUILDINGS]: {
    mapMode: MapMode.BUILDINGS,
    provinceColor: (province, save, data: { dataId?: string, gradient: Array<SaveColor> }, countries, date) => {
      const history = getPHistory(province, save, date);

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
    },
    image: 'building',
    allowDate: true,
    prepare: (save, dataId, date) => {
      let max = 0;

      save.provinces.forEach(province => {
        const history = getPHistory(province, save, date);

        if (history && history.buildings && history.buildings.size > max) {
          max = history.buildings.size;
        }
      });

      return { dataId, gradient: getGradient(max, colorToHex(EMPTY_COLOR), "#00FF00") };
    },
    selectable: true,
    tooltip: (province, save, dataId, date) => {
      const history = getPHistory(province, save, date);

      return dataId ? `${ province.name } : ${ history.buildings && history.buildings.has(
          dataId) ? getBuildingName(save, dataId) : intl.formatMessage(
          { id: 'common.no' }) }`
        : `${ province.name } : ${ history.buildings ? history.buildings.size : 0 }`;
    },
    hasTooltip: true,
    supportDate: true,
    selectRenderInput: (value, save, theme) => (
      value ?
        <Grid container alignItems='center'>
          <Avatar src={ getBuildingImage(save, value) } variant='square'
                  style={ { display: 'inline-block', width: 24, height: 24 } }/>
          <Typography variant='body1' style={ {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            marginLeft: theme.spacing(1)
          } }>
            { value && getBuildingName(save, value) }
          </Typography>
        </Grid>
        :
        <Typography variant='body1' style={ {
          color: theme.palette.primary.contrastText,
          fontWeight: 'bold',
          marginLeft: theme.spacing(1)
        } }>
          { intl.formatMessage({ id: 'common.quantity' }) }
        </Typography>
    ),
    selectItems: (save, theme) => {
      return save.buildings.sort((a, b) => stringComparator(getBuildingsName(a), getBuildingsName(b)))
        .map(building => (
          <MenuItem value={ building.name } key={ building.name }>
            <Avatar src={ getBuildingsImage(building) } variant='square'
                    style={ { display: 'inline-block' } }/>
            <Typography variant='body1' style={ { marginLeft: theme.spacing(1) } }>
              { getBuildingsName(building) }
            </Typography>
          </MenuItem>
        ))
    }
  },
  [MapMode.GREAT_PROJECTS]: {
    mapMode: MapMode.GREAT_PROJECTS,
    provinceColor: (province, save, data, countries, date) => {
      if (!province.greatProjects || province.greatProjects.length === 0) {
        return EMPTY_COLOR;
      }

      if (countries.length > 0) {
        const history = getPHistory(province, save, date);

        if (!history.owner || !countries.includes(history.owner)) {
          return EMPTY_COLOR;
        }
      }

      return getGradient(province.greatProjects.reduce((s, v) => s + v.maxLevel, 0) + 1,
        colorToHex(FULL_RED_COLOR), colorToHex(FULL_GREEN_COLOR))[province.greatProjects.reduce(
        (s, v) => s + v.level, 0)];
    },
    image: 'great_project',
    allowDate: false,
    prepare: () => {
    },
    selectable: true,
    tooltip: (province, save, dataId, date) => {
      if (!province.greatProjects || province.greatProjects.length === 0) {
        return province.name;
      }

      return `${ province.name } : ${ province.greatProjects.reduce((s, v) => s + v.level,
        0) }/${ province.greatProjects.reduce((s, v) => s + v.maxLevel, 0) }`;
    },
    hasTooltip: true,
    supportDate: false,
  },
}
