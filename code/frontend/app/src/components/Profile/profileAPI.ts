import axios from "axios";
import Profile from "../../models/Profile";
import { SERVER } from "../../env"

export function getUserProfile() {
    const accessToken = JSON.parse(localStorage.getItem("token") as string)
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }
    return new Promise<{ data: Profile }>((resolve =>
        axios.get(SERVER + '/profile/', config).then(res => resolve({ data: res.data }))
    ))
}