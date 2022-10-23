import HttpClient from '../helpers/HttpClient'
import { User } from '../types/User'
import { endpoints } from './config/endpoints'

export default class UserApi {
    static async get(): Promise<User> {
        const { data } = await HttpClient.get<User>(endpoints.user.get)

        return data
    }
}
