import { Delete, Visibility } from '@mui/icons-material';
import { Avatar, CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import theme from 'theme';
import { ServerSave } from 'types/api.types';
import { getFlagUrl } from 'utils/data.utils';
import { formatDate, formatDateTime, formatNumber } from 'utils/format.utils';
import { getName } from 'utils/save.utils';

export interface SaveTableProps {
  saves?: Array<ServerSave>;
  currentUser?: string;
  handleDelete?: (id: string) => void;
  owner: boolean;
  actionTable?: boolean;
}

function SaveTable({ saves, currentUser, handleDelete, owner, actionTable }: SaveTableProps) {
  const intl = useIntl();

  return (
    <TableContainer component={ Paper }>
      <Table>
        <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
          <TableRow>
            <TableCell style={ { color: theme.palette.primary.contrastText } }>
              { intl.formatMessage({ id: 'user.name' }) }
            </TableCell>
            <TableCell style={ { color: theme.palette.primary.contrastText } }>
              { intl.formatMessage({ id: 'user.uploadDate' }) }
            </TableCell>
            <TableCell style={ { color: theme.palette.primary.contrastText } }>
              { intl.formatMessage({ id: 'user.date' }) }
            </TableCell>
            <TableCell style={ { color: theme.palette.primary.contrastText } }>
              { intl.formatMessage({ id: 'user.country' }) }
            </TableCell>
            <TableCell style={ { color: theme.palette.primary.contrastText } }>
              { intl.formatMessage({ id: 'user.version' }) }
            </TableCell>
            <TableCell style={ { color: theme.palette.primary.contrastText } }>
              { intl.formatMessage({ id: 'user.nbPlayers' }) }
            </TableCell>
            {
              owner &&
                <TableCell style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'user.owner' }) }
                </TableCell>
            }
            <TableCell style={ { color: theme.palette.primary.contrastText } }>
              { intl.formatMessage({ id: 'user.actions' }) }
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            actionTable ?
              <TableRow>
                <TableCell align='center' colSpan={ 6 + (owner ? 1 : 0) + (handleDelete ? 1 : 0) }>
                  <CircularProgress color='primary'/>
                </TableCell>
              </TableRow>
              :
              (saves && saves.length > 0) ?
                saves.filter(save => !save.hideAll || save.ownerId === currentUser).map(save => (
                  <TableRow hover key={ save.id }>
                    <TableCell>
                      <Typography variant='body1' component='span'>
                        { save.name }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' component='span'>
                        { formatDateTime(save.creationDate) }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' component='span'>
                        { formatDate(save.date) }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Grid container alignItems='center' flexWrap='nowrap' overflow='hidden'>
                        <Avatar src={ getFlagUrl(save.flag) } variant='square' alt={ getName(save.countryName) }/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getName(save.countryName) }
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' component='span'>
                        { save.version }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' component='span'>
                        { formatNumber(save.nbPlayers) }
                      </Typography>
                    </TableCell>
                    {
                      owner &&
                        <TableCell>
                            <Link to={ `/user/${ save.ownerId }` } style={ { textDecoration: 'none' } }>
                                <Grid container alignItems='center' flexWrap='nowrap' overflow='hidden'>
                                    <Avatar src={ save.ownerImage } variant='square' alt={ save.ownerName }/>
                                    <Typography variant='body1' component='span' style={ { marginLeft: 8, color: 'inherit' } }>
                                      { save.ownerName ?? save.ownerId }
                                    </Typography>
                                </Grid>
                            </Link>
                        </TableCell>
                    }
                    <TableCell>
                      <Grid container alignItems='center' flexWrap='nowrap' overflow='hidden'>
                        <IconButton color="primary" href={ `/save/${ save.id }` }>
                          <Visibility/>
                        </IconButton>
                        {
                          handleDelete && currentUser && save.ownerId === currentUser &&
                            <IconButton color="error" onClick={ () => handleDelete(save.id) }>
                                <Delete/>
                            </IconButton>
                        }
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell colSpan={ 6 + (owner ? 1 : 0) + (handleDelete ? 1 : 0) }>
                    <Typography variant='body1' align='center'>
                      { intl.formatMessage({ id: 'user.noSave' }) }
                    </Typography>
                  </TableCell>
                </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SaveTable;
