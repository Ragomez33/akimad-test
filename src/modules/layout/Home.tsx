import React from 'react';
import { InputSearchComponent } from '../users/components/InputSearchComponent';
import { UsersTableComponent } from '../users/usersTableComponent';


export const Home: React.FC = () => {
    return (<>
        <InputSearchComponent/>
        <UsersTableComponent />
        </>
    )
}