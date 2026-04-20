import { describe, it, expect, vi } from 'vitest'
import { CapacityStrategy, ShipmentService, WorkHoursStrategy } from '../services/ShipmentService'
import { ShipmentRepository } from '../repositories/ShipmentRepository'
import { mock } from 'node:test'
import { IShipment } from '../interfaces/IShipment'

describe ('Shipment service - Min capacity strategies', () => {
    it('should return rejection because of small unit', async () => {
        const strategy = new CapacityStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'cheese', unit: 10}
            ],
            date: new Date ('2026-04-26T10:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('rejected')
        expect(res.reason).toBe('Because units lower minimum value')
    }),
    it('should return rejection because of small unit', async () => {
        const strategy = new CapacityStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'north',
            ingredients: [
                {id: 'cheese', unit: 50}
            ],
            date: new Date ('2026-04-26T10:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('rejected')
        expect(res.reason).toBe('Because units lower minimum value')
    }),
    it('should return rejection because of small unit', async () => {
        const strategy = new CapacityStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'east',
            ingredients: [
                {id: 'cheese', unit: 150}
            ],
            date: new Date ('2026-04-26T10:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('rejected')
        expect(res.reason).toBe('Because units lower minimum value')
    }),
    it('should return rejection because of small unit', async () => {
        
        const strategy = new CapacityStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'west',
            ingredients: [
                {id: 'cheese', unit: 100}
            ],
            date: new Date('2026-04-26T10:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('rejected')
        expect(res.reason).toBe('Because units lower minimum value')

    })
})

describe ('Shipment service - Work Hours strategies', () => {
    it('should return rejection because of small unit', async () => {
        const strategy = new WorkHoursStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'cheese', unit: 100}
            ],
            date: new Date ('2026-04-26T19:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('rejected')
        expect(res.reason).toBe('Because the shipment is not at working time')
    }),
    it('should return rejection because of small unit', async () => {
        const strategy = new WorkHoursStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'north',
            ingredients: [
                {id: 'cheese', unit: 200}
            ],
            date: new Date ('2026-04-26T6:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('rejected')
        expect(res.reason).toBe('Because the shipment is not at working time')
    }),
    it('should return rejection because of small unit', async () => {
        const strategy = new WorkHoursStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'east',
            ingredients: [
                {id: 'cheese', unit: 500}
            ],
            date: new Date ('2026-04-26T00:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('rejected')
        expect(res.reason).toBe('Because the shipment is not at working time')
    }),
    it('should return rejection because of small unit', async () => {
        
        const strategy = new WorkHoursStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'west',
            ingredients: [
                {id: 'cheese', unit: 400}
            ],
            date: new Date('2026-04-26T22:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('rejected')
        expect(res.reason).toBe('Because the shipment is not at working time')

    })
})

describe ('Shipment service - Splitting strategies', () => {
    it('should split the shipment because of warehouse capacity', async () => {
        const strategy = new CapacityStrategy()

        const shipment: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'cheese', unit: 600}
            ],
            date: new Date ('2026-04-26T19:00:00Z')
        }

        const res = await strategy.check(shipment)
        expect(res.result).toBe('split')
    })
})