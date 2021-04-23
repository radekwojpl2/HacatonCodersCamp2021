import {useState, useEffect} from 'react';
import {User} from '../types/user';
import axios from '../config/axios';

function useGetMentors(url: string) {
    const [response, setResponse] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                const data = await res.data as User[];
                setResponse(data.filter(user => user.role === "mentor"));
            } catch(err) {
                setResponse(err);
            }
        };
        fetchData();
    }, [])

    return response;
}

export default useGetMentors;