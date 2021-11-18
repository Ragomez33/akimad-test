import {createEvent} from '@cobuildlab/react-simple-state';
import { Users, User } from './users-models';

    export const OnFetchUsersData = createEvent<Users>();
    export const OnErrorFetchUsersData = createEvent();

    export const OnGetUserDataByUsername = createEvent<User>();
    export const OnErrorGetUserDataByUsername = createEvent();