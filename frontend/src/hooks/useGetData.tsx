import {useState, useEffect} from 'react';
import axios from '../config/axios';

function useGetData<T>(url: string) {
    const [response, setResponse] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                const data = await res.data;
                setResponse(data);
            } catch(err) {
                setResponse(err);
            }
        };
        fetchData();
    }, [])

    return response;
}

export default useGetData;