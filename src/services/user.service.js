import axios from "axios";
import {URL_API} from "../config/backend.config";

class UserService {
    static async getAllUsers() {
        return await axios.get(URL_API + '/users/')
    }

    static async deleteUser(id) {
        return await axios.delete(URL_API + '/users/' + id,)
    }

    static async getUser(id) {
        return await axios.get(URL_API + '/users/' + id,)
    }

    static async updateUser(user) {
        return await axios.put(URL_API + '/users/' + user.id, user)
    }

    static async addUser(user) {
        return await axios.post(URL_API + '/users/', user)
    }
}

export default UserService;