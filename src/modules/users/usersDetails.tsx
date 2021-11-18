import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { getUserDataByUsername } from './users-actions';
import { useSubscription } from '@cobuildlab/react-simple-state';
import { OnGetUserDataByUsername } from './users-events';
import Grid from '@material-ui/core/Grid';
import { User } from './users-models';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {useNavigate} from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  title: {
    fontSize: 14,
  },
  link:{
    textDecoration: 'none'
  },
  button:{
      margin: '10px 0',
  },
  content:{
    display: 'flex', justifyContent:'center', padding: 100
  },
  actions:{
    justifyContent: 'end'
  }
});

export const UsersDetailsComponent: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User>();
    const urlParams = useParams();
  const classes = useStyles();
    useEffect(() => {
        if(urlParams.login && !userData){
            getUserDataByUsername(urlParams.login);
        }
    });

    useSubscription(OnGetUserDataByUsername, (state) => {
        if(state){
          setUserData(state);
        }
    });
    const onClickBack = () => {
        navigate('/');
    };
let content;
if(!userData){
    content = <CircularProgress />
}else{
    content = (
        <Card className={classes.root}>
      <CardContent>
          <div style={{margin: '10px 0'}}>
      <Typography component="h5" variant="h5">
        Github User Information
      </Typography>
          </div>
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={3}>
      <Avatar  src={userData?.avatar_url} style={{width: '200px', height: '200px'}}/>
      </Grid>
      <Grid item xs={9}>
        <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
        Bio
      </Typography>
          {userData?.bio || 'No bio available' }
      </Grid>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
        Username
      </Typography>
          {userData?.login}
      </Grid>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
      Company:
      </Typography>
          {userData?.company}
      </Grid>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
      Email:
      </Typography>
          {userData?.email || 'No email available'}
      </Grid>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
      Location:
      </Typography>
          {userData?.location}
      </Grid>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
      Blog link:
      </Typography>
      <a className={classes.link} href={userData?.blog || '#'} target='_blank' rel="noreferrer">
          {userData?.blog || 'No blog available'}
          </a>
         
      </Grid>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
      Twitter Username:
      </Typography>
          {userData?.twitter_username || 'No twitter username available'}
      </Grid>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
    # Public repositories:
      </Typography>
          {userData?.public_repos}
      </Grid>
      <Grid item xs={4}>
      <Typography component="h6" variant="h6">
    # Followers:
      </Typography>
          {userData?.followers}
      </Grid>
      </Grid>
          </Grid>
          <Grid item xs={3}>
          <Typography component="h5" variant="h5">
        {userData?.name}
      </Typography>
          </Grid>
      </Grid>

      </CardContent>
      <CardActions className={classes.actions}>
        <Button disabled={userData?.public_repos===0} onClick={() => navigate(`/repositories/${userData?.login}`)}>View repositories</Button>
      </CardActions>
    </Card>
    )
}
  return (
    <Container maxWidth="lg">
        <Button className={classes.button} onClick={onClickBack} variant='contained'>Back</Button>
    <div  className={classes.content}>
    {content}
    </div>
      </Container>
  );
}

