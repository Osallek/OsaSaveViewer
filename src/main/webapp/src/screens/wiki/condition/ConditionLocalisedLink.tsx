import { Avatar, Grid, Paper, styled, Theme, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { JSX, useState } from 'react';
import { useIntl } from 'react-intl';
import { IntlShape } from 'react-intl/src/types';
import { Link } from 'react-router-dom';
import { Localised } from 'types/api.types';
import { WikiType } from 'types/wiki.types';
import { getLName } from 'utils/data.utils';

interface ConditionLocalisedLinkProps extends TypographyProps {
  wikiVersion: string;
  type?: WikiType;
  record?: Record<string, Localised>;
  negate: boolean;
  condition?: string;
  value?: string;
  avatar?: string;
  avatarWidth?: string;
  colons?: boolean;
  suffix?: string | React.ReactElement;
  inlineSuffix?: string;
  link?: boolean;
  grid?: boolean;
}

interface DefaultNodeProps extends ConditionLocalisedLinkProps {
  intl: IntlShape;
  theme: Theme;
}

const innerDefaultNode = (props: DefaultNodeProps) => {
  const {
    intl, theme, condition, negate, suffix, wikiVersion, colons = true, value, type, link = true, avatar, sx, grid,
    avatarWidth, inlineSuffix, ...others
  } = props;

  return (
    <>
      {
        condition &&
        <Typography variant='body1'
                    sx={ {
                      color: theme.palette.primary.contrastText,
                      display: 'inline',
                      ...sx
                    } }
                    { ...others }>
          { intl.formatMessage({ id: `wiki.condition.${ condition }${ negate ? '.not' : '' }` }) }
        </Typography>
      }
      {
        (value || avatar) && (
          <>
            { colons &&
              <Typography variant='body1'
                          sx={ { color: theme.palette.primary.contrastText, display: 'inline', ml: 0.5, mr: 0.5 } }>
                { ':' }
              </Typography>
            }
            {
              link ?
                <NoColorLink to={ link ? `/wiki/${ wikiVersion }/${ type?.path }/${ value }` : '' }>
                  <ConditionLocalisedLinkChildren { ...props }/>
                </NoColorLink>
                :
                <ConditionLocalisedLinkChildren { ...props } sx={ { ...props.sx, fontStyle: '' } }/>
            }
          </>
        )
      }
      {
        suffix &&
        (
          typeof suffix === 'string' ?
            <Typography variant='body1'
                        sx={ { color: theme.palette.primary.contrastText, ...sx } } { ...others }>
              { suffix }
            </Typography>
            :
            suffix
        )
      }
    </>
  )
}

const NoColorLink = styled(Link)({
  textDecoration: 'none',
});

function ConditionLocalisedLinkChildren({
                                          wikiVersion, type, negate, condition, avatar, colons, suffix, value, record,
                                          link = true, sx, grid, avatarWidth, inlineSuffix, ...others
                                        }: ConditionLocalisedLinkProps): JSX.Element {
  const [hover, setHover] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <Paper elevation={ 0 } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
           sx={ {
             p: 0.5,
             backgroundColor: (hover && link) ? 'rgba(55, 71, 79, 0.24)' : 'transparent',
             cursor: link ? 'pointer' : undefined,
             width: 'fit-content'
           } }>
      <Grid container alignItems='center' sx={ { width: 'fit-content' } }>
        {
          avatar &&
          <Avatar src={ avatar } variant='square'
                  sx={ { display: 'inline-block', width: avatarWidth ?? 32, height: 32, mr: 0.5 } }/>
        }
        {
          value &&
          <Typography variant='body1' { ...others }
                      sx={ {
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        display: 'inline',
                        mr: 0.5,
                        ...sx,
                      } }>
            { ` ${ record && record[value] ? getLName(record[value]) : value }${ inlineSuffix ?? '' }` }
          </Typography>
        }
      </Grid>
    </Paper>
  )
}

function ConditionLocalisedLink(props: ConditionLocalisedLinkProps): JSX.Element {
  const theme = useTheme();
  const intl = useIntl();
  const { grid = true, value, sx } = props;

  return (
    grid ?
      (
        <Grid container alignItems='center' key={ `tooltip-total-${ value }` } sx={ { ...sx } }>
          { innerDefaultNode({ theme, intl, ...props }) }
        </Grid>
      )
      :
      (
        innerDefaultNode({ theme, intl, ...props })
      )
  )
}

export default ConditionLocalisedLink;
