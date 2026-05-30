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
}