import React, {useEffect, useState} from 'react';
import { useSubscription } from '@cobuildlab/react-simple-state';
import {OnFetchUsersData, OnGetUserDataByUsername, OnErrorGetUserDataByUsername} from './users-events';
import {fetchUsersData} from './users-actions';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Users } from './users-models';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useNavigate} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
    table: {
      minHeight: 400,
      overflowX: 'hidden',
    },
    root: {
      minWidth: 275,
    },
    headers:{
      fontWeight: 'bolder', 
      fontSize: '25px'
    },
    rowText:{
      fontSize: '20px'
    }
  });
export const UsersTableComponent: React.FC  = () => {
  let navigate = useNavigate();

  const classes = useStyles();
    const [rows, setRows] = useState<Users>();
    useEffect(() => {
        if(!rows){
            fetchUsersData();
        }
    });
    useSubscription(OnFetchUsersData, (stateData) => {
        if(stateData){
            setRows(stateData);
        }
    });
    useSubscription(OnGetUserDataByUsername, (state) => {
      if(state){
        setRows([state]);
      }
  });
  useSubscription(OnErrorGetUserDataByUsername, (state) => {
    toast.error('User not found :(');
});
    return (
      <Container maxWidth="lg">
<Card className={classes.root}>
      <CardContent>
        <div style={{display: 'flex', justifyContent:'center', padding: 100}}>
        <TableContainer className={classes.table}>
        {!rows ? (
          <div style={{display: 'flex', justifyContent:'center'}}>
            <CircularProgress />
          </div>
          ) : (
            <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headers}>ID</TableCell>
                <TableCell className={classes.headers} align="center">Github Username</TableCell>
                <TableCell className={classes.headers} align="center">Show info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              rows.map((row) => (
                <TableRow
                key={row.id}
              >
                <TableCell component="th" scope="row" className={classes.rowText}>
                  {row.id}
                </TableCell>
                <TableCell align="center" className={classes.rowText}>{row.login}</TableCell>
                <TableCell align="center" >
                  <IconButton onClick={() => navigate(`/users-details/${row.login}`)}>
                <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              ))
            }
            </TableBody>
          </Table>
      )}
    </TableContainer>
        </div>
        </CardContent>
        </Card>
      </Container>
    )
};