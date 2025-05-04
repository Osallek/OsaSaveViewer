import { Avatar, GridLegacy, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { SaveCountry, SaveMonarch } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatDate, formatDuration, formatNumber } from 'utils/format.utils';
import { getMonarchs, getPersonality, getPersonalitysImage, getPersonalitysName } from 'utils/save.utils';

interface CountryMonarchTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryMonarchTab({ country, save }: CountryMonarchTabProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [monarchs, setMonarchs] = useState<Array<SaveMonarch>>([]);

  useEffect(() => {
    setMonarchs(getMonarchs(save, country));
  }, [country]);

  return (
    <>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto', minWidth: '50%', marginTop: 8 } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.monarch.name' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.monarch.start' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.monarch.end' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.monarch.duration' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.monarch.personalities' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.monarch.skills' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {
                  monarchs.map((monarch, i) => (
                      <TableRow key={ `monarch-${ country.tag }-${ i }` }>
                        <TableCell style={ {
                          backgroundColor: theme.palette.primary.light,
                          borderBottomColor: theme.palette.primary.main
                        } }>
                          <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                            { monarch.name }
                          </Typography>
                        </TableCell>
                        <TableCell>
                          { formatDate(monarch.monarchDate) }
                        </TableCell>
                        <TableCell>
                          { formatDate(monarch.deathDate) }
                        </TableCell>
                        <TableCell>
                          { formatDuration(monarch.duration) }
                        </TableCell>
                        <TableCell>
                          <GridLegacy container>
                            { monarch.personalities?.map(p => getPersonality(save, p)).map((personality, index) => (
                              <Tooltip key={ `${ country.tag }-${ personality.name }` }
                                       title={ getPersonalitysName(personality) }>
                                <Avatar src={ getPersonalitysImage(personality) } variant='square' alt={ getPersonalitysName(personality) }
                                        style={ {
                                          width: 28,
                                          height: 28,
                                          marginRight: index + 1 === (monarch.personalities ? monarch.personalities.length : 0) ? 0 : 8,
                                        } }/>
                              </Tooltip>
                            )) }
                          </GridLegacy>
                        </TableCell>
                        <TableCell>
                          { `${ monarch.adm } / ${ monarch.dip } / ${ monarch.mil } (${ monarch.adm + monarch.dip + monarch.mil })` }
                        </TableCell>
                      </TableRow>
                    )
                  )
                }
              </>
              <TableRow>
                <TableCell colSpan={ 4 }>
                </TableCell>
                <TableCell align='right'>
                  { intl.formatMessage({ id: 'common.mean' }) }
                </TableCell>
                <TableCell>
                  { monarchs.filter(m => m.duration !== undefined).length > 0 &&
                    `${ formatNumber(monarchs.map(m => m.adm * (m.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      monarchs.map(m => (m.duration ?? 0)).reduce((a, b) => a + b, 0)) } /
                  ${ formatNumber(monarchs.map(m => m.dip * (m.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      monarchs.map(m => (m.duration ?? 0)).reduce((a, b) => a + b, 0)) } /
                  ${ formatNumber(monarchs.map(m => m.mil * (m.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      monarchs.map(m => (m.duration ?? 0)).reduce((a, b) => a + b, 0)) }
                  (${ formatNumber(monarchs.map(m => (m.adm + m.dip + m.mil) * (m.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      monarchs.map(m => (m.duration ?? 0)).reduce((a, b) => a + b, 0)) })` }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
    </>
  )
}

export default CountryMonarchTab;
