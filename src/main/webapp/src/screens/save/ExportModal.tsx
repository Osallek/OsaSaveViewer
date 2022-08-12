import {
  Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { SaveCountry } from 'types/api.types';
import { MapMode, MapSave } from 'types/map.types';
import { cleanString, stringComparator } from 'utils/format.utils';
import { getCountries, getCountrysFlag, getCountrysName } from 'utils/save.utils';

interface CompareTableProps {
  save: MapSave;
  open: boolean;
  onClose: () => void;
  onExport: (mm: MapMode, countries: Array<string>) => void;
}

function ExportModal({ save, open, onClose, onExport }: CompareTableProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [mm, setMM] = useState<MapMode>(MapMode.POLITICAL);
  const [countries, setCountries] = useState<Array<SaveCountry>>([]);
  const [options, setOptions] = useState<Array<SaveCountry>>([]);

  useEffect(() => {
    setOptions(getCountries(save).sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b))));
  }, [save]);

  const doExport = () => {
    setMM(MapMode.POLITICAL);
    setCountries([]);
    onExport(mm, countries.map(value => value.tag));
  };

  return (
    <Modal open={ open } onClose={ onClose }>
      <Grid container item xs={ 10 } lg={ 6 } xl={ 4 }
            style={ { position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)' } }>
        <Card style={ { backgroundColor: theme.palette.primary.light, width: '100%' } }>
          <CardHeader title={ intl.formatMessage({ id: 'common.export' }) }
                      titleTypographyProps={ { color: theme.palette.primary.contrastText } }
                      style={ { backgroundColor: theme.palette.primary.dark, borderTopLeftRadius: 4, borderTopRightRadius: 4 } }/>
          <CardContent>
            <Grid container rowGap={ 2 }>
              <FormControl fullWidth>
                <InputLabel id="mm">
                  <span style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'map.mod' }) }
                  </span>
                </InputLabel>
                <Select
                  id="mm-select"
                  value={ mm }
                  labelId="mm"
                  label={ intl.formatMessage({ id: 'map.mod' }) }
                  onChange={ event => setMM(event.target.value as MapMode) }
                  renderValue={ value => (
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }>
                      { intl.formatMessage({ id: `map.mod.${ value }` }) }
                    </Typography>
                  ) }
                >
                  {
                    Object.values(MapMode).map(mapMod => (
                      <MenuItem value={ mapMod } key={ mapMod }>
                        <Typography variant='body1'>
                          { intl.formatMessage({ id: `map.mod.${ mapMod }` }) }
                        </Typography>
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <Autocomplete
                fullWidth
                multiple
                disablePortal
                options={ options }
                getOptionLabel={ getCountrysName }
                getOptionDisabled={ option => countries.includes(option) }
                groupBy={ option => cleanString(getCountrysName(option).slice(0, 1)).toUpperCase() }
                renderInput={ (params) =>
                  <TextField { ...params } label={ intl.formatMessage({ id: 'common.countries' }) } variant='outlined' color='primary'
                             InputProps={ { ...params.InputProps, style: { color: theme.palette.primary.contrastText } } }
                             InputLabelProps={ { ...params.InputLabelProps, style: { color: theme.palette.primary.contrastText } } }/>
                }
                noOptionsText=''
                renderOption={ (props, option) => {
                  return (
                    <li { ...props }>
                      <Grid container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                        <Avatar src={ getCountrysFlag(option) } variant='square' style={ { display: 'inline-block' } }/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getCountrysName(option) }
                        </Typography>
                      </Grid>
                    </li>
                  )
                } }
                value={ countries }
                onChange={ (event, value) => setCountries(value) }
                renderTags={ (value: readonly SaveCountry[], getTagProps) =>
                  value.map((option: SaveCountry, index: number) => (
                    <Chip label={ getCountrysName(option) }
                          avatar={ <Avatar src={ getCountrysFlag(option) } variant='circular'/> }
                          { ...getTagProps({ index }) }
                          style={ { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText } }/>
                  ))
                }
              />
            </Grid>
          </CardContent>
          <CardActions style={ { justifyContent: 'center' } }>
            <Button variant='contained' color='primary' onClick={ doExport }>
              { intl.formatMessage({ id: 'common.export' }) }
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Modal>
  )
}

export default ExportModal;
