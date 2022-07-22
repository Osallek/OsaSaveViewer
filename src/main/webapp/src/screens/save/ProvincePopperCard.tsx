import { Close } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography
} from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import theme from 'theme';
import { SaveProvince } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatNumber } from 'utils/format.utils';
import { getCountryFlag, getCountryName, getCultureName, getPHistory, getReligionName } from 'utils/save.utils';

interface ProvincePopperCardProps {
  save: MapSave;
  province: SaveProvince;
  onClose: () => void;
  selectedDate: string;
  viewMore: () => void;
}

function ProvincePopperCard({ save, province, onClose, selectedDate, viewMore }: ProvincePopperCardProps) {
  const intl = useIntl();
  const history = getPHistory(province, selectedDate, save);

  return (
    <Card style={ { backgroundColor: theme.palette.primary.main, minWidth: 200 } }>
      <CardHeader
        action={
          <IconButton size='small' onClick={ () => onClose() }>
            <Close/>
          </IconButton>
        }
        avatar={
          <Avatar src={ getCountryFlag(save, history.owner) } variant='square'/>
        }
        title={ province.name }
        titleTypographyProps={ { color: 'white', variant: 'h5' } }
        style={ { paddingBottom: 8 } }
      />
      <Divider variant='middle'/>
      <CardContent style={ { color: 'white', paddingTop: 8, paddingBottom: 8 } }>
        <Typography variant='body1' style={ { alignItems: 'center', display: 'flex', marginBottom: 4 } }>
          <Avatar src='/eu4/province/owner.png' variant='square'
                  style={ { display: 'inline-block', marginRight: 4, width: 24, height: 24 } }/>
          { `${ intl.formatMessage({ id: 'province.owner' }) }: ${ getCountryName(save, history.owner) }` }
        </Typography>
        <Typography variant='body1' style={ { alignItems: 'center', display: 'flex', marginBottom: 4 } }>
          <Avatar src='/eu4/province/culture.png' variant='square'
                  style={ { display: 'inline-block', marginRight: 4, width: 24, height: 24 } }/>
          { `${ intl.formatMessage({ id: 'province.culture' }) }: ${ getCultureName(save, history.culture) }` }
        </Typography>
        <Typography variant='body1' style={ { alignItems: 'center', display: 'flex', marginBottom: 4 } }>
          <Avatar src='/eu4/province/religion.png' variant='square'
                  style={ { display: 'inline-block', marginRight: 4, width: 24, height: 24 } }/>
          { `${ intl.formatMessage({ id: 'province.religion' }) }: ${ getReligionName(save, history.religion) }` }
        </Typography>
        <Typography variant='body1' style={ { alignItems: 'center', display: 'flex', marginBottom: 4 } }>
          <Avatar src='/eu4/province/tax.png' variant='square'
                  style={ { display: 'inline-block', marginRight: 4, width: 24, height: 24 } }/>
          { `${ intl.formatMessage({ id: 'province.baseTax' }) }: ${ province.baseTax }` }
        </Typography>
        <Typography variant='body1' style={ { alignItems: 'center', display: 'flex', marginBottom: 4 } }>
          <Avatar src='/eu4/province/prod.png' variant='square'
                  style={ { display: 'inline-block', marginRight: 4, width: 24, height: 24 } }/>
          { `${ intl.formatMessage({ id: 'province.baseProduction' }) }: ${ formatNumber(province.baseProduction ?? 0) }` }
        </Typography>
        <Typography variant='body1' style={ { alignItems: 'center', display: 'flex' } }>
          <Avatar src='/eu4/province/manpower.png' variant='square'
                  style={ { display: 'inline-block', marginRight: 4, width: 24, height: 24 } }/>
          { `${ intl.formatMessage({ id: 'province.baseManpower' }) }: ${ province.baseManpower }` }
        </Typography>
      </CardContent>
      <Divider variant='middle'/>
      <CardActions disableSpacing style={ { justifyContent: 'center' } }>
        <Button size="small" color='secondary' onClick={ () => viewMore() }>
          { intl.formatMessage({ id: 'common.viewMore' }) }
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProvincePopperCard;
