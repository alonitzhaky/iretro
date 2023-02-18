import axios from "axios";
import { SERVER } from "../../env"
import Cart from "../../models/Cart";
import { Order } from "../../models/Order";

export function createOrder(orderData: Order, orderDetails: Cart[]) {
    const accessToken = JSON.parse(String(localStorage.getItem("token")))
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }
    return new Promise<{ data: any }>((resolve) =>
        axios.post(SERVER + '/order/', { orderData, orderDetails }, config).then(res => resolve({ data: res.data }))
    )

}