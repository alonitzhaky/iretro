export default class Order {
    address: string = ""
    city: string = ""
    zip_code: string = ""
    country: string = ""
}

export interface orderData {
    address: string
    city: string
    zip_code: string
    country: string
}