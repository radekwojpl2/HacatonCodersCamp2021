import React from 'react';
import { GroupCreate } from './groupCreate';
import useGetMentors from '../../hooks/useGetMentors';
import { User } from '../../types/user';
import useGetData from '../../hooks/useGetData';
import { Groups } from '../../types/groups';

function MentorGroupManagement() {
    const groups = useGetData<Groups>('group');
    const mentors = useGetMentors('authorization');
    const users = useGetData<User[]>('authorization')
    return (
        <>
        {console.log(groups, mentors)}
               {groups ?  mentors && users ?  <GroupCreate mentors={mentors} groups={groups} users={users}/>: "loading" : "loading"}
           
        </>
    );
}

export default MentorGroupManagement;