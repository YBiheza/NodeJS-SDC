import { OrderService } from "../services/OrderService"

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
}