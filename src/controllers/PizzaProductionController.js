import { stock } from "../stock/stock.js"

export function getProducts (request, reply) {
    const {product, quantity} = request.body
    if (!stock[product]){
        stock[product] = 0
    }

    stock[product] += quantity

    return reply.send(stock);

}

export function putProducts(request, reply) {
    return reply.send(stock)
}
