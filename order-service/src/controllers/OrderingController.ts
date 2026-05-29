/*import { OrderService } from "../services/OrderService"

export class OrderController {
    constructor(private service: OrderService) {}

    async create (req: any, reply: any) {
        try {
            const payload = {
                ...req.body,
                date: new Date(req.body.date)
            }
            const result = await this.service.placeOrder(payload)
            return reply.send(result)
        } catch (e: any) {
            req.log?.error(e)

            return reply.status(500).send({
            error: e.message
            })
        }
    }

    async markReady(req: any, reply: any) {

        //const { orderId } = req.body
        
        try {
            const result =
            await this.service.markAsReady(req.body)

            return reply.send({ result })
            //return reply.send("your order ", req.body.id, " is", req.body.status)


        } catch (e: any) {

            return reply.status(500).send({
            error: e.message
            })
        }
}
}*/