import axios from "axios";
import { URL_API } from "../config/backend.config";

class LoginService {
    static async getAll() {
        return await axios.get(URL_API + '/account/')
    }

    static async deleteUser(id) {
        return await axios.delete(URL_API + '/account/' + id,)
    }

    static async getUser(id) {
        return await axios.get(URL_API + '/account/' + id,)
    }

    static async updateUser(user) {
        return await axios.put(URL_API + '/account/' + user.id, user)
    }

    static async addUser(user) {
        return await axios.post(URL_API + '/account/', user)
    }
}

export default LoginService;