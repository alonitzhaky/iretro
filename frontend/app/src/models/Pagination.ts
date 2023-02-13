import Product from "./Product"

export default class Pagination {
    count: number = 0
    next: string = ""
    previous: string = ""
    results: Product[] = []
}