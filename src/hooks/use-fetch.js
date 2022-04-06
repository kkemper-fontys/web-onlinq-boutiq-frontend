import {useCallback, useState} from "react";

//TODO change url
const url = 'https://127.0.0.1:8000/api/';
const headers = {'Content-type': 'application/json'};

export const useFetch = () => {
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (slug, method = "GET", details = {}) => {
        setLoading(true);

        const response = await fetch(`${url}${slug}.json`, {
            method,
            body: method === 'GET' ? null : details,
            headers
        });

        const data = await response.json();
        setLoading(false);
        return data;
    }, []);

    return {fetchData, loading};
};