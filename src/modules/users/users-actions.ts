import {createAction} from '@cobuildlab/react-simple-state';
import {
    OnFetchUsersData,
OnErrorFetchUsersData,
OnErrorGetUserDataByUsername,
OnGetUserDataByUsername
} from './users-events';
import { User, Users } from './users-models';
import axios from 'axios';
export const fetchUsersData = createAction( OnFetchUsersData, OnErrorFetchUsersData, async (): Promise<Users> => {
    let response;
    try{
        response = await axios.get('https://api.github.com/users');
    }catch(err: any){
        throw new Error(err);
    }
    const usersData: Users = response.data;
    return usersData;
});


export const getUserDataByUsername = createAction( OnGetUserDataByUsername, OnErrorGetUserDataByUsername, async (username: string): Promise<User> => {
    let response;
    try{
        response = await axios.get(`https://api.github.com/users/${username}`)
    }catch(err: any){
        console.error(err.message);
        throw new Error(err);
    }
    const user: User = response.data;
    return user;
});