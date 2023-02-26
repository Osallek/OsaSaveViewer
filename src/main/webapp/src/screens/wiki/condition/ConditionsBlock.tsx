import { ExpandMore } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Collapse, IconButton, styled, useTheme } from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton/IconButton';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';
import { useIntl } from 'react-intl';
import { Condition, Wiki } from 'types/api.types';
import ConditionsList from './ConditionsList';

interface ConditionsBlockProps {
  wiki: Wiki;
  title?: React.ReactNode;
  condition: Condition;
  wikiVersion: string;
  level: number;
  useExample: boolean;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const PCardContent = styled(CardContent)(({ theme }) => ({
  "&:last-child": {
    paddingBottom: 0,
    paddingLeft: 0,
    marginBottom: theme.spacing(1),
  }
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMoreButton = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton { ...other } />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  color: theme.palette.primary.contrastText,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ConditionsBlock({
                           wiki, title, condition, wikiVersion, level, useExample, children, sx
                         }: ConditionsBlockProps) {
  const theme = useTheme();
  const intl = useIntl();

  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant='outlined'
          sx={ {
            width: '100%',
            backgroundColor: theme.palette.primary.light,
            p: 0,
            mb: 1,
            border: `1px solid ${ expanded ? theme.palette.primary.dark : theme.palette.primary.light }`,
          } }>
      {
        title &&
        <CardHeader
          onClick={ handleExpandClick }
          action={
            <ExpandMoreButton expand={ expanded } onClick={ handleExpandClick }>
              <ExpandMore/>
            </ExpandMoreButton>
          }
          title={ title }
          titleTypographyProps={ {
            variant: 'body1',
            sx: {
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold'
            }
          } }
          sx={ { p: 1, backgroundColor: theme.palette.primary.dark, cursor: 'pointer' } }/>
      }
      <Collapse in={ expanded } timeout="auto" unmountOnExit>
        <PCardContent sx={ { p: 1, ...sx } }>
          { children }
          <ConditionsList condition={ condition } level={ level + 1 } wiki={ wiki }
                          wikiVersion={ wikiVersion } useExample={ useExample }
                          negate={ false }/>
        </PCardContent>
      </Collapse>
    </Card>
  );
}

export default ConditionsBlock;
