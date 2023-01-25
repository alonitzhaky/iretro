import Product from "../../models/Product";
import axios from 'axios'
import { SERVER } from '../../env'

export function getAllProducts() {
    return new Promise<{ data: Product[] }>((resolve) =>
        axios.get(SERVER + '/product/').then(res => resolve({ data: res.data }))
    );
}

export function addProduct(product: Product) {
    return new Promise<{ data: Product }>((resolve) =>
        axios.post(SERVER, product).then(res => resolve({ data: res.data }))
    );
}

export function deleteProduct(id: number) {
    return new Promise<{ data: number }>((resolve) =>
        axios.delete(SERVER + "/" + id).then(res => resolve({ data: id }))
    );
}

export function updateProduct(product: Product) {
    return new Promise<{ data: any }>((resolve) =>
        axios.put(SERVER + "/" + product.id, product).then(res => resolve({ data: res.data }))
    );
}

