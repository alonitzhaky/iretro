import axios from "axios";
import { SERVER } from "../../env";
import Review from "../../models/Review";

export function getAllReviewsPerProduct(id: number) {
    return new Promise<{ data: Review[] }>((resolve) =>
        axios.get(SERVER + '/product/reviews/' + `${id}/`).then(res => resolve({ data: res.data }))
    )
}

export function sendReview(details: any) {
    const accessToken = JSON.parse(String(localStorage.getItem("token")))
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }
    return new Promise<{ data: any }>((resolve) =>
    axios.post(SERVER + '/product/reviews/submit/', {description: details.description, rating: details.rating, user: config.headers, id: details.id}, config).then(res => resolve({data: res.data}))
    )
}
