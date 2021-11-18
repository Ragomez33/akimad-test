import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { fetchRepositoriesByUser } from './repositories-actions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSubscription } from '@cobuildlab/react-simple-state';
import { onFetchRepositoriesByUser } from './repositores-events';
import { Repositories } from './repositores-models';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useNavigate} from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles({
    grids: {
      width: '100%',
    },
    miniCard: {
        height: 500
    },
    container: {
        marginTop: 20
    },
    button:{
        margin: '10px 0',
    },
    content:{
        display: 'flex', justifyContent:'center', padding: 100
      },
  });

export const RepositoriesComponent: React.FC = () => {
    const [isRepos, setIsRepos] = useState<Repositories>();
    const navigate = useNavigate();
    const classes = useStyles();
    const urlParams = useParams();
    const {username} = urlParams;
    useEffect(() => {
        if(username){
            fetchRepositoriesByUser(username);
        }
    }, [username]);
    useSubscription( onFetchRepositoriesByUser,(state) => {
        console.log(state);
        if(state){
            setIsRepos(state);
        }
    });
    const onClickBack = () => {
        navigate(`/users-details/${urlParams.username}`);
    };
    return (
        <Container maxWidth="lg" className={classes.container}>
    <Button className={classes.button} onClick={onClickBack} variant='contained'>Back</Button>
              <div style={{margin: '10px 0', display: 'flex', justifyContent: 'start'}}>
      <Typography component="h5" variant="h5">
        Repositories from {urlParams.username}
      </Typography>
          </div>
            <Grid container className={classes.grids} spacing={2}>
                {
                    !isRepos ? (
                        [1,2,3, 4, 5, 6].map((item) => (
                            <Grid item xs={4}>
                        <Skeleton variant="rect" width={350} height={500} />
                        </Grid>
                        ))
                    ) : (
                        isRepos?.map((item) => {
                        return (
                            <Grid item xs={4}>
                            <Card className={classes.miniCard}>
                                <CardContent>
                                <List >
                    <ListItem>
                      <ListItemText
                        primary="Name"
                        secondary={item.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Visibility"
                        secondary={item.visibility}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Has wiki?"
                        secondary={item.has_wiki ? 'Yes' : 'No'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Repositori url"
                        secondary={item.url}
                        style={{wordBreak: 'break-word'}}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Size"
                        secondary={`${item.size} kb`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Language"
                        secondary={item.language}
                      />
                    </ListItem>
                </List>
                            </CardContent>
                            </Card>
                            </Grid>
                        )
                    })
                    )
                }
               
            </Grid>
        </Container>
    );
}

