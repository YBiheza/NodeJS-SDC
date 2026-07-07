import { DataBaseResponse } from "@pizza/api-contract"
import { OrderPizzaService } from "../services/OrderPizzaService"

export class OrderPizzaController {
  constructor (private readonly orderPizzaService: OrderPizzaService) {}

  async RegisterNewPizza (req: any, reply: any): Promise<DataBaseResponse> {
    const order = await this.orderPizzaService.RegisterPizza(req.body)

    return reply.send({
      order,
    }) 
  }

  async UpdateStatus (req: any, reply: any): Promise<DataBaseResponse[]> {
    const readyPizza = await this.orderPizzaService.updateOrder(req.body)
    return readyPizza
  }
}