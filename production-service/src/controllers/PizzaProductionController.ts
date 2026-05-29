import { ProductionService } from "../services/PizzaProductionService.js"

export class ProductionController {
  constructor(private service: ProductionService) {}

  async create(req: any, reply: any) {
    try {
      const result = await this.service.produce(req.body)
      return reply.send(result)

    } catch (e: any) {
        req.log?.error(e)

        return reply.status(500).send({
        error: e.message
      })
    }
  }
}
