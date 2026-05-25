import { describe, it, expect, vi } from 'vitest'
import { ShipmentService } from '../services/ShipmentService'
import { ShipmentRepository } from '../repositories/ShipmentRepository'
import { mock } from 'node:test'
import { IShipment } from '../interfaces/IShipment'

describe ('Shipment service - Min capacity strategies', () => {
    it('should return rejection because of small unit', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                targetWarehouse: 'south',
                ingredients: [
                    {id: 'tomatoes', unit: 243}
                ],
                date: '2026-04-26T10:00:00Z'
            })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'cheese', unit: 10}
            ],
            date: new Date ('2026-04-26T10:00:00Z')
        }
        await expect(() => serv.registerShipment(shipment)).rejects.toThrow()
    }),
    it('should return rejection because of small unit', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                targetWarehouse: 'south',
                ingredients: [
                    {id: 'tomatoes', unit: 243}
                ],
                date: '2026-04-26T10:00:00Z'
            })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'north',
            ingredients: [
                {id: 'cheese', unit: 50}
            ],
            date: new Date ('2026-04-26T10:00:00Z')
        }

        await expect(() => serv.registerShipment(shipment)).rejects.toThrow()
    }),
    it('should return rejection because of small unit', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                targetWarehouse: 'south',
                ingredients: [
                    {id: 'tomatoes', unit: 243}
                ],
                date: '2026-04-26T10:00:00Z'
            })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'east',
            ingredients: [
                {id: 'cheese', unit: 150}
            ],
            date: new Date ('2026-04-26T10:00:00Z')
        }

        await expect(() => serv.registerShipment(shipment)).rejects.toThrow()

    }),
    it('should return rejection because of small unit', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                targetWarehouse: 'south',
                ingredients: [
                    {id: 'tomatoes', unit: 243}
                ],
                date: '2026-04-26T10:00:00Z'
            })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'west',
            ingredients: [
                {id: 'cheese', unit: 100}
            ],
            date: new Date('2026-04-26T10:00:00Z')
        }

        await expect(() => serv.registerShipment(shipment)).rejects.toThrow()

    })
})

describe ('Shipment service - WorkHours strategy', () => {
    it('should rejected the shipment because of working time', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                targetWarehouse: 'south',
                ingredients: [
                    {id: 'tomatoes', unit: 243}
                ],
                date: '2026-04-26T10:00:00Z'
            })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'tomatoes', unit: 243}
            ],
            date: new Date ('2026-04-26T6:00:00Z')
        }
            
        await expect(() => serv.registerShipment(shipment)).rejects.toThrow()
    }),
    it('should rejected the shipment because of working time', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                targetWarehouse: 'south',
                ingredients: [
                    {id: 'tomatoes', unit: 243}
                ],
                date: '2026-04-26T10:00:00Z'
            })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'north',
            ingredients: [
                {id: 'tomatoes', unit: 243}
            ],
            date: new Date ('2026-04-26T21:00:00Z')
        }
            
        await expect(() => serv.registerShipment(shipment)).rejects.toThrow()
    }),
    it('should rejected the shipment because of working time', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                targetWarehouse: 'south',
                ingredients: [
                    {id: 'tomatoes', unit: 243}
                ],
                date: '2026-04-26T10:00:00Z'
            })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'east',
            ingredients: [
                {id: 'tomatoes', unit: 243}
            ],
            date: new Date ('2026-04-26T22:00:00Z')
        }
            
        await expect(() => serv.registerShipment(shipment)).rejects.toThrow()
    }),
    it('should rejected the shipment because of working time', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                targetWarehouse: 'south',
                ingredients: [
                    {id: 'tomatoes', unit: 243}
                ],
                date: '2026-04-26T10:00:00Z'
            })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'tomatoes', unit: 243}
            ],
            date: new Date ('2026-04-26T0:00:00Z')
        }
            
        await expect(() => serv.registerShipment(shipment)).rejects.toThrow()
    })
})

describe('Shipment service - MaxCapacity strategy', () => {
    it('should split the shipment', async () => {
        const mockRepo = {
            createShipment: vi.fn().mockResolvedValue({ id: 1 })
        }

        const serv = new ShipmentService(mockRepo as any)

        const shipment: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'tomatoes', unit: 500}
            ],
            date: new Date ('2026-04-26T12:00:00Z')
        }
            
        await serv.registerShipment(shipment)
        expect(mockRepo.createShipment).toHaveBeenNthCalledWith(1, {
            targetWarehouse: 'south',
            ingredients: [{ id: 'tomatoes', unit: 300 }],
            date: new Date ('2026-04-26T12:00:00Z')
        })

        expect(mockRepo.createShipment).toHaveBeenNthCalledWith(2, {
            targetWarehouse: 'south',
            ingredients: [{ id: 'tomatoes', unit: 200 }],
            date: new Date ('2026-04-26T12:00:00Z')
        })
    })
})