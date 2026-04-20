import { orders } from "../orders/orders.js"

export function orderPizza (request, reply) {
    const order = request.body
    orders.push(order)
    return reply.send(order)
}

export function getOrder(request, reply) {
    return reply.send(orders)
}