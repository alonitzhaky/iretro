import axios from "axios";
import Profile from "../../models/Profile";
import { SERVER } from "../../env"
import { toast } from "react-toastify";


export function getUserProfile() {
    const accessToken = JSON.parse(String(localStorage.getItem("token")))
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }
    return new Promise<{ data: Profile }>((resolve =>
        axios.get(SERVER + '/profile/', config).then(res => resolve({ data: res.data }))
    ))
}

export function updateUserProfile(profileData: any) {
    const accessToken = JSON.parse(String(localStorage.getItem("token")))
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }
    return new Promise<{ data: Profile }>((resolve) => 
    axios.put(SERVER + '/profile/update/', profileData, config)
    .then(res => {
        resolve({ data: res.data });
        console.log(res.data)
        toast.success("Your profile has been updated successfully!", {
            position: "top-center",
        });
    }));
}
