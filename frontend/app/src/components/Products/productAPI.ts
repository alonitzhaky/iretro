import Product from "../../models/Product";
import axios from 'axios'
import { SERVER } from '../../env'
import Pagination from "../../models/Pagination";

export function getAllProductsInCategory(id: number, page: number) {
    return new Promise<{ data: Pagination }>((resolve) =>
        axios.get(SERVER + '/product/' + `${id}/`, {params: {page: page}}).then(res => resolve({ data: res.data }))
    )
}

export function getOneProduct(id: number) {
    return new Promise<{ data: any }>((resolve) =>
        axios.get(SERVER + '/product/info/' + `${id}/`).then(res => resolve({ data: res.data }))
    )
}

