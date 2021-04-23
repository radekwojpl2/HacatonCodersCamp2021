import React from 'react';
import { User } from '../../types/user';
import {GroupDisplayUser} from './groupDisplayUser';
import useGetData from '../../hooks/useGetData';
import { Groups } from '../../types/groups';
import { Typography } from '@material-ui/core';

export const UserGroupManagement = () => {
    const groups = useGetData<Groups>('group');
    const users = useGetData<User[]>('authorization')
    return (
        <>
               {groups  && users ?  <GroupDisplayUser groups={groups} users={users}/>: "loading"}
x        </>
    );
}