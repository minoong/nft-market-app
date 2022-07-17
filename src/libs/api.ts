import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

const client = axios.create({
 timeout: 1000 * 10,
})

// eslint-disable-next-line import/prefer-default-export
export function apiCall<T>(config: AxiosRequestConfig<T>): AxiosPromise<T> {
 return client(config)
}
