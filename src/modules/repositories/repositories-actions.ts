import axios from 'axios';
import {createAction} from '@cobuildlab/react-simple-state';
import { onErrorFetchRepositoriesByUser, onFetchRepositoriesByUser } from './repositores-events';
import { Repositories } from './repositores-models';


export const fetchRepositoriesByUser = createAction(
    onFetchRepositoriesByUser, 
    onErrorFetchRepositoriesByUser, 
    async (username: string): Promise<Repositories> => {
        let response;
        // 
        try{
            response =  await axios.get(`https://api.github.com/users/${username}/repos`)
        }catch(err: any){
            throw new Error(err);
        }

        const respositorieData: Repositories = response.data;
        return respositorieData;
});