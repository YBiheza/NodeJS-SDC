import type { IShipment } from "../interfaces/IShipment"
import { ShipmentService } from "../services/ShipmentService"

export class ShipmentController {
    constructor(private service: ShipmentService) {}

    async create (req: any, reply: any) {
        console.log(req.body)
        try {
            const payload = {
                ...req.body,
                date: new Date(req.body.date)
            }        
            const result = await this.service.registerShipment(payload)
            console.log('controller result:', result)
            return reply.send(result)
        } catch (e: any) {
            req.log?.error(e)

            return reply.status(500).send({
                error: e.message
            })
        }
    }
}