// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { UpdateRequestBase } from '../types/core'
import { HttpMethod } from '../types/enums/HttpMethod'

export default class HttpClient {
    static head(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return HttpClient.makeRequest(HttpMethod.HEAD, url, {}, config)
    }

    static post(
        url: string,
        formData = {},
        config: AxiosRequestConfig = {},
    ): Promise<AxiosResponse> {
        return HttpClient.makeRequest(HttpMethod.POST, url, formData, config)
    }

    static get<TResponse>(
        url: string,
        config: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<TResponse>> {
        return HttpClient.makeRequest(HttpMethod.GET, url, {}, config)
    }

    static put<T>(
        url: string,
        formData: UpdateRequestBase<T>,
        config = null,
    ): Promise<AxiosResponse> {
        return HttpClient.makeRequest(
            HttpMethod.PUT,
            url,
            formData.data,
            config || { headers: { 'If-Match': formData.version.toString() } },
        )
    }

    static delete(url: string, version = 0, config = null): Promise<AxiosResponse> {
        return HttpClient.makeRequest(
            HttpMethod.DELETE,
            url,
            {},
            config || { headers: { 'If-Match': version.toString() } },
        )
    }

    static async makeRequest(
        method: HttpMethod,
        url: string,
        formData: any = {},
        config: AxiosRequestConfig = {},
    ): Promise<AxiosResponse> {
        switch (method) {
            case HttpMethod.POST:
                return axios.post(url, formData, config)
            case HttpMethod.PUT:
                return axios.put(url, formData, config)
            case HttpMethod.DELETE:
                return axios.delete(url, config)
            case HttpMethod.GET:
                return axios.get(url, config)
            case HttpMethod.HEAD:
                return axios.head(url, config)
        }
    }
}
