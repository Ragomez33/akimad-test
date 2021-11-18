import React, {useState, useEffect} from 'react';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useDebounce } from 'use-debounce';
import { fetchUsersData, getUserDataByUsername } from '../users-actions';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    search: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(3),
      border: 'solid 2px blue',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '60%',
      height: '50px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '73%;',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'blue',
      height: 50,
      width: '80%'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      width: '100%',
    },
  }));
export const InputSearchComponent: React.FC = () => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState<string>();
    const [value] = useDebounce(searchValue, 1000);
    
    useEffect(() => {
        if(!value){
            fetchUsersData();
            return;
        }
        getUserDataByUsername(value);
    }, [value]);
    return(
        <div className={classes.root}>
        <div className={classes.search}>
        <div className={classes.searchIcon}>
                <SearchIcon />
        </div>
        <InputBase
        onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search user by github username"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
        </div>
    )
}