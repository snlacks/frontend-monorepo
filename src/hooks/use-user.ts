import useSWR from 'swr'
import axios from 'axios'
import { UserResponse } from '@/types'
import { User } from '@/User'
import { useEffect, useState } from 'react';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_AUTH_SERVER;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

const fetcher = (path: string) => axios.post<UserResponse>(path)
    .then(res => {
        return new User(res.data)
    })
    .catch(() => { throw 'Something went wrong refreshing user' })

export default function useUser() {
    const { data, error, isLoading, mutate } = useSWR<User, Error>("/auth/refresh", fetcher, {
        errorRetryCount: 0, errorRetryInterval: 1000,
        revalidateOnFocus: false,
    })
    const [isInitial, setIsInitial] = useState(true);
    useEffect(() => {
        if (data ?? error) {
            setIsInitial(false)
        }
    }, [data, error])


    return {
        user: data,
        isLoading,
        error: error?.message,
        isInitial,
        mutate
    }
}
