import React from 'react';
import { GroupCreate } from './groupCreate';
import { GroupDisplay } from './groupDisplay';
import MentorGroupManagement   from './mentorGroupManagement';
import { UserGroupManagement } from './userGroupManagement';

export const GroupManagement = () => (
        <>
            <MentorGroupManagement />
            <UserGroupManagement />
        </>
    )
