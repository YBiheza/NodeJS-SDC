import { ProductionService } from "../services/PizzaProductionService.js"
import { AvailabilityResponse, MarkOrderReadyResponse } from "@pizza/api-contract"

export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  async CheckingAvailability(req: any, reply: any): Promise<AvailabilityResponse> {
    const availability = await this.productionService.checkAvailability(req.body)
      
    return reply.send({
      available: availability,
    } satisfies AvailabilityResponse)
  }

  async producePizza(req: any, reply: any): Promise<MarkOrderReadyResponse> {
    const result = await this.productionService.produce(req.body)
    return reply.send ({
      success: true,
      pizza: result
    })
  }
}