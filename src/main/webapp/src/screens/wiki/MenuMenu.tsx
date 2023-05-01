import { Autocomplete, Avatar, Grid, Popper, PopperProps, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { IdImageLocalised, IdLocalised } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { cleanString } from 'utils/format.utils';

interface MenuMenuProps {
  title: string;
  value?: IdLocalised | null;
  imagedValue?: IdImageLocalised | null;
  objects?: Array<IdLocalised>;
  imagedObjects?: Array<IdImageLocalised>;
  onChange: (value: IdLocalised | IdImageLocalised | null) => void;
  showId?: boolean;
  group?: boolean;
}

const MenuMenuPopper = function (props: PopperProps) {
  return <Popper { ...props } style={ { maxWidth: 'fit-content' } } placement="bottom-start"/>;
};

function MenuMenu({
                    title, value, imagedValue, objects, imagedObjects, onChange, showId = true, group = true
                  }: MenuMenuProps) {
  const theme = useTheme();

  return (
    <Grid container item xs={ 2 } style={ { marginLeft: 8 } }>
      {
        objects ?
          <Autocomplete
            fullWidth
            disablePortal
            clearOnBlur
            selectOnFocus
            handleHomeEndKeys
            value={ value }
            PopperComponent={ MenuMenuPopper }
            options={ objects }
            getOptionLabel={ option => `${ getLName(option) }${ showId ? ` (${ option.id })` : '' }` }
            isOptionEqualToValue={ (option, value) => option.id === value.id }
            groupBy={ option => group ? cleanString((getLName(option) ?? ' ').slice(0, 1)).toUpperCase() : '' }
            renderInput={ (params) =>
              <TextField { ...params } label={ title } size='small' color='secondary'
                         InputProps={ { ...params.InputProps, style: { color: theme.palette.primary.contrastText } } }
                         InputLabelProps={ {
                           ...params.InputLabelProps,
                           style: { color: theme.palette.primary.contrastText }
                         } }/>
            }
            noOptionsText=''
            renderOption={ (props, option) => {
              return (
                <li { ...props }>
                  <Grid container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                    <Typography variant='body1' component='span'>
                      { `${ getLName(option) }${ showId ? ` (${ option.id })` : '' }` }
                    </Typography>
                  </Grid>
                </li>
              )
            } }
            onChange={ (event, value) => onChange(value) }
          />
          :
          (
            imagedObjects &&
            <Autocomplete
              fullWidth
              disablePortal
              value={ imagedValue }
              options={ imagedObjects }
              getOptionLabel={ option => `${ getLName(option) }${ showId ? ` (${ option.id })` : '' }` }
              isOptionEqualToValue={ (option, value) => option.id === value.id }
              groupBy={ option => group ? cleanString((getLName(option) ?? ' ').slice(0, 1)).toUpperCase() : '' }
              renderInput={ (params) => <TextField { ...params } label={ title }/> }
              noOptionsText=''
              renderOption={ (props, option) => {
                return (
                  <li { ...props }>
                    <Grid container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                      <Avatar src={ option.image } variant='square' style={ { display: 'inline-block' } }/>
                      <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                        { `${ getLName(option) }${ showId ? ` (${ option.id })` : '' }` }
                      </Typography>
                    </Grid>
                  </li>
                )
              } }
              onChange={ (event, value) => onChange(value) }
            />
          )
      }
    </Grid>
  )
}

export default MenuMenu;
