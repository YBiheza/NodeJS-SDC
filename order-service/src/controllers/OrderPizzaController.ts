import { OrderPizzaService } from "../services/OrderPizzaService"

export class OrderPizzaController {
  constructor(private service: OrderPizzaService) {}

  async create(req: any, reply: any) {
    try {
      const result = await this.service.RegisterPizza(req.body)
      return reply.send(result)

    } catch (e: any) {
        req.log?.error(e)

        return reply.status(500).send({
        error: e.message
      })
    }
  }

  async getAll(req: any, reply: any) {
    const result = await this.service.getAllOrders()
    return reply.send(result)
  }

  async getUpdate(req: any, reply: any) {
    const res = await this.service.updateOrder(req.body)
    return reply.send(res)
  }
}