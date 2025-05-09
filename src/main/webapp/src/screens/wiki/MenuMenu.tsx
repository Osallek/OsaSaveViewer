import { Autocomplete, Avatar, Grid, Popper, PopperProps, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { IdImageLocalised, IdLocalised } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { cleanString } from 'utils/format.utils';

interface MenuMenuProps<T extends (IdLocalised | IdImageLocalised)> {
  title: string;
  value?: T | null;
  objects?: Array<T>;
  onChange: (value: T | null) => void;
  showId?: boolean;
  group?: (value: T) => string;
  imageFunction?: (value: T) => string;
}

const MenuMenuPopper = function (props: PopperProps) {
  return <Popper { ...props } style={ { maxWidth: 'fit-content' } } placement="bottom-start"/>;
};

function MenuMenu<T extends (IdLocalised | IdImageLocalised)>({
                                                                title,
                                                                value,
                                                                objects,
                                                                onChange,
                                                                showId = true,
                                                                group = t => cleanString((getLName(t) ?? ' ').slice(0, 1)).toUpperCase(),
                                                                imageFunction,
                                                              }: MenuMenuProps<T>) {
  const theme = useTheme();

  return (
    <Grid container size={ 2 } sx={ { marginLeft: 1, flexGrow: 1 } }>
      {
        objects &&
          <Autocomplete
              fullWidth
              disablePortal
              clearOnBlur
              selectOnFocus
              handleHomeEndKeys
              value={ value }
              options={ objects }
              getOptionLabel={ option => `${ getLName(option) }${ showId ? ` (${ option.id })` : '' }` }
              isOptionEqualToValue={ (option, value) => option.id === value.id }
              groupBy={ group }
              renderInput={ (params) =>
                <TextField { ...params } label={ title } size="small" color="secondary"
                           slotProps={ {
                             input: {
                               ...params.InputProps,
                               sx: { color: theme.palette.primary.contrastText }
                             },
                             inputLabel: {
                               ...params.InputLabelProps,
                               sx: { color: theme.palette.primary.contrastText }
                             },
                             htmlInput: {
                               ...params.inputProps,
                               sx: { width: '100% !important' }
                             }
                           } }/>
              }
              noOptionsText=""
              renderOption={ ({ key, ...props }, option) => {
                return (
                  <li key={ key } { ...props }>
                    <Grid container alignItems="center" style={ { width: '100%' } } key={ props.id }>
                      { imageFunction && 'image' in option &&
                          <Avatar src={ imageFunction(option) } variant="square" style={ { display: 'inline-block' } }/> }
                      <Typography variant="body1" component="span"
                                  style={ { marginLeft: 'image' in option ? 8 : undefined } }>
                        { `${ getLName(option) }${ showId ? ` (${ option.id })` : '' }` }
                      </Typography>
                    </Grid>
                  </li>
                );
              } }
              onChange={ (event, value) => onChange(value) }
              slots={ {
                popper: MenuMenuPopper
              } }
          />
      }
    </Grid>
  );
}

export default MenuMenu;
