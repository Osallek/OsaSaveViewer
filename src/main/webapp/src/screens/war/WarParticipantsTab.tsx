import { GridLegacy, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import { SaveWar, SaveWarParticipant } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { colorToHex, formatNumber, numberComparator } from 'utils/format.utils';
import { getCountry, getCountryName } from 'utils/save.utils';

interface WarParticipantsTabProps {
  war: SaveWar;
  save: MapSave;
}

const renderActiveShape = (props: any, total: number, save: MapSave) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={ cx } y={ cy } dy={ 8 } textAnchor="middle" fill={ fill }>
        <tspan x={ cx } dy="-0.1cm">{ getCountryName(save, payload.tag) }</tspan>
        <tspan x={ cx } dy="0.5cm">{ `${ formatNumber(value) } (${ formatNumber(value * 100 / total) })%` }</tspan>
      </text>
      <Sector
        cx={ cx }
        cy={ cy }
        innerRadius={ innerRadius }
        outerRadius={ outerRadius }
        startAngle={ startAngle }
        endAngle={ endAngle }
        fill={ fill }
      />
      <Sector
        cx={ cx }
        cy={ cy }
        startAngle={ startAngle }
        endAngle={ endAngle }
        innerRadius={ outerRadius + 6 }
        outerRadius={ outerRadius + 10 }
        fill={ fill }
      />
    </g>
  );
};

function WarParticipantsTab({ war, save }: WarParticipantsTabProps) {
  const intl = useIntl();

  const [charts, setCharts] = useState<SaveWarParticipant[][]>([[], []]);
  const [totals, setTotals] = useState<number[]>([0, 0]);
  const [activeIndex, setActiveIndex] = useState<number[]>([0, 0]);

  useEffect(() => {
    setCharts([Object.values(war.attackers).sort((a, b) => -numberComparator(a.value, b.value)),
      Object.values(war.defenders).sort((a, b) => -numberComparator(a.value, b.value))]);
    setTotals([Object.values(war.attackers).map(value => value.value).reduce((s, d) => s + d ?? 0, 0),
      Object.values(war.defenders).map(value => value.value).reduce((s, d) => s + d ?? 0, 0)]);
  }, [war, save]);

  return (
    <GridLegacy container item xs={ 12 } md={ 10 } lg={ 8 } xl={ 8 } style={ { width: 'fit-content', justifyContent: 'space-between' } }>
      <GridLegacy container item xs={ 6 } style={ { flexDirection: 'column', alignContent: 'space-between' } } key='participation-attackers'>
        <Typography variant='h6' style={ { textAlign: 'center' } }>
          { intl.formatMessage({ id: 'war.attackers' }) }
        </Typography>
        <PieChart
          width={ 500 }
          height={ 500 }
        >
          <Pie
            activeIndex={ activeIndex[0] }
            activeShape={ props => renderActiveShape(props, totals[0], save) }
            data={ charts[0] }
            innerRadius={ 100 }
            outerRadius={ 120 }
            dataKey='value'
            onMouseEnter={ (_, index) => {
              setActiveIndex(prevState => [index, prevState[1]]);
            } }
          >
            { charts[0].map((entry, index) => (
              <Cell key={ `cell-${ index }` } fill={ colorToHex(getCountry(save, entry.tag).colors.countryColor) }/>
            )) }
          </Pie>
        </PieChart>
      </GridLegacy>
      <GridLegacy container item xs={ 6 } style={ { flexDirection: 'column', alignContent: 'space-between' } } key='participation-defenders'>
        <Typography variant='h6' style={ { textAlign: 'center' } }>
          { intl.formatMessage({ id: 'war.defenders' }) }
        </Typography>
        <PieChart
          width={ 500 }
          height={ 500 }
        >
          <Pie
            activeIndex={ activeIndex[1] }
            activeShape={ props => renderActiveShape(props, totals[1], save) }
            data={ charts[1] }
            innerRadius={ 100 }
            outerRadius={ 120 }
            dataKey='value'
            onMouseEnter={ (_, index) => {
              setActiveIndex(prevState => [prevState[0], index]);
            } }
          >
            { charts[1].map((entry, index) => (
              <Cell key={ `cell-${ index }` } fill={ colorToHex(getCountry(save, entry.tag).colors.countryColor) }/>
            )) }
          </Pie>
        </PieChart>
      </GridLegacy>
    </GridLegacy>
  )
}

export default WarParticipantsTab;
