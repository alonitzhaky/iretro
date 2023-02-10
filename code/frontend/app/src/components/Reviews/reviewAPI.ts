import axios from "axios";
import { SERVER } from "../../env";
import Review from "../../models/Review";

export function getAllReviewsPerProduct(id: number) {
    return new Promise<{ data: Review[] }>((resolve) => 
    axios.get(SERVER + '/product/reviews/' + `${id}/`).then(res => resolve({data: res.data}))
    )
}