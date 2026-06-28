import type { IHours } from "../interfaces/IHours"
import type { ICapacity } from '../interfaces/ICapacity'
import type { IShipment } from "../interfaces/IShipment"
import type { TWarehouse } from "../types/TWarehouse"
import type { TStrategy } from "../types/TStrategy"
import type { IShipmentStrategy } from "../interfaces/IShipmentStrategy"
import { ShipmentRepository } from "../repositories/ShipmentRepository"
import { calculateAmountOfFullBatches, calculateSizeOfIncompleteBatch } from "../algorythms/splittingShipment"

const warehouses: Record <TWarehouse, IHours> = {
    south: {start: 8, finish: 16},
    north: {start: 10, finish: 18},
    east: {start: 7, finish: 15},
    west: {start: 9, finish: 17},
}

const capacities: Record <TWarehouse, ICapacity> = {
    south: {min: 50, max: 300},
    north: {min: 100, max: 600},
    east: {min: 200, max: 1000},
    west: {min: 200, max: 1000},
}

function workHours (date: Date, region: TWarehouse) {
    const hour = date.getHours()
    const warehouse = warehouses[region]

    if(!warehouse) {
        throw new Error ('Mistake: here is no such warehouse')
    }
    return (hour >= warehouse.start && hour < warehouse.finish)
}

function capacityMinCheck (unitQuantity: number, region: TWarehouse) {
    const warehouse = capacities[region]

    return (unitQuantity > warehouse.min)
}

function capacityMaxCheck (unitQuantity: number, region: TWarehouse) {
    const warehouse = capacities[region]

    return (unitQuantity < warehouse.max)
}

export class CapacityStrategy implements IShipmentStrategy {
    check: TStrategy = (shipment: IShipment) => {
        const wh = capacities[shipment.targetWarehouse]
        for (const ingredient of shipment.ingredients) {
            if (!capacityMinCheck(ingredient.unit, shipment.targetWarehouse )) {
                return {
                    result: 'rejected', 
                    reason: 'Because units lower minimum value'
                }
            } else {
                if(!capacityMaxCheck(ingredient.unit, shipment.targetWarehouse)) {
                    const fullUnits = calculateAmountOfFullBatches(
                        {amount: ingredient.unit}, wh. max)
                    
                    const remainder = calculateSizeOfIncompleteBatch(
                        {amount: ingredient.unit}, wh. max)

                    const shipments: IShipment[] = []

                    for (let i = 0; i < fullUnits; i++) {
                        shipments.push({
                            targetWarehouse: shipment.targetWarehouse,
                            ingredients: [{
                                id: ingredient.id,
                                unit: wh.max
                            }],                            
                            date: shipment.date,
                        })
                    }

                    if (remainder > 0) {
                        shipments.push({
                            targetWarehouse: shipment.targetWarehouse,
                            date: shipment.date,
                            ingredients: [{
                                id: ingredient.id,
                                unit: remainder
                            }]
                        })
                    }
                    return (
                        {result: 'split', shipment: shipments}
                    )
                }
            }
        }
        return {result: 'completed!'}
    }
}

export class WorkHoursStrategy implements IShipmentStrategy{
    check: TStrategy = (shipment: IShipment) => {
        const wh = warehouses[shipment.targetWarehouse]
        if (!workHours(shipment.date, shipment.targetWarehouse)) {
            return {result: 'rejected', reason: 'Because the shipment is not at working time'}
        } else {
            return {result: 'completed!'}
        }
    }
}

export class ShipmentService {
    private readonly strategies: IShipmentStrategy[]

    constructor (private readonly repo: ShipmentRepository) {
        this.strategies = [
            new WorkHoursStrategy(),
            new CapacityStrategy()
        ]
    }

    async registerShipment (shipment: IShipment) {
        const results = []
        for (const strategy of this.strategies) {
            const result = strategy.check(shipment)

            if (result.result === 'rejected') {
                throw new Error(result.reason)
            }

            if (result.result === 'split') {
                for (const sh of result.shipment) {
                    await this.repo.createShipment(sh)
                }
            }
        }
        
        const saved = await this.repo.createShipment(shipment)
        return saved
    }

    async getShipmentById(id: number) {
        const resById = await this.repo.getShipmentById(id)
        return resById;
    }

    async getAllShipments () {
        const allShipments = await this.repo.getAllShipments
        return allShipments
    }

    async deleteShipment (id: number) {
        return await this.repo.deleteById(id) 
    }

    async deleteExpired () {
        return await this.repo.deleteExpired()
    }
}

