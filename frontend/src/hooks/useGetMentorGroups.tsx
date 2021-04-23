import {useState, useEffect} from 'react';
import axios from '../config/axios';
import { Groups } from '../types/groups';

function useGetMentorGroups(mentorId: string) {
    const [response, setResponse] = useState<Groups | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('group');
                const data = await res.data as Groups;
                const filteredGroups = await data.result.filter(group => group.mentor === mentorId);
                const newData = await {numberOfGroups: filteredGroups.length, result: filteredGroups} as Groups;
                setResponse(newData);
            } catch(err) {
                setResponse(err);
            }
        };
        fetchData();
    }, [])

    return response;
}

export default useGetMentorGroups;