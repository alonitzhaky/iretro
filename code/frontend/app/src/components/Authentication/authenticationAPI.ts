import axios from 'axios'
import { SERVER } from '../../env'

export function registerUser(username: string, password: string, email: string) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(SERVER + "/register/", { username, password, email }).then(res => resolve({ data: res.data })))
}
// export function loginUser(username: string, password: string) {
//     return new Promise<{ data: any }>((resolve) =>
//         axios.post(SERVER + "/login/", { username, password }).then(res => resolve({ data: res.data })))
// 
export function loginUser(details: any) {
    return new Promise<{ data: any }>((resolve) => 
    axios.post(SERVER + "/login/", {username: details.username, password: details.password}).then(res => resolve({data: res.data})))
    
}
