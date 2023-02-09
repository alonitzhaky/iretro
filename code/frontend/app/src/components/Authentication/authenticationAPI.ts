import axios from 'axios'
import { toast } from 'react-toastify';
import { SERVER } from '../../env'

export function registerUser(username: string, password: string, email: string, first_name: string, last_name: string) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(SERVER + "/register/", { username, password, email, first_name, last_name }).then(res => resolve({ data: res.data })))
}
// export function loginUser(username: string, password: string) {
//     return new Promise<{ data: any }>((resolve) =>
//         axios.post(SERVER + "/login/", { username, password }).then(res => resolve({ data: res.data })))
// 
export function loginUser(details: any) {
    return new Promise<{ data: any }>((resolve) => 
    axios.post(SERVER + "/login/", {username: details.username, password: details.password})
    .then(res => resolve({data: res.data}))
    .catch((error) => { 
        if (error.response && error.response.status === 401) {
          toast.error("Incorrect Password or Username", {
            position: "top-center",
          });
          // If one or more of the fieids are missing: 
        } if (error.response && error.response.status === 400) {
          toast.error('Please check you have filled all required fields.', {
            position: "top-center",
          })
        }
      })
    )
    
}

export function logoutUser() {
    return new Promise<{data: any }>((resolve) => resolve({data: false}))
}