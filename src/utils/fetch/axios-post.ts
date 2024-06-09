import axios from "axios"
/**
 * @template T The request argument
 * @template K The ressponse body
 */
export declare function IAxiosFetcher<T = any, K = undefined>(path: string, { arg }: {
    arg: T;
}): Promise<K>;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_AUTH_SERVER
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.withCredentials = true

type AxiosFetcherPost = typeof IAxiosFetcher;

export const axiosPost: AxiosFetcherPost = <T, K>(path: string, { arg }: { arg: T }) => {
    return axios
        .post<K>(path, arg, {
        })
        .then((res) => {
            return res.data;
        })
};