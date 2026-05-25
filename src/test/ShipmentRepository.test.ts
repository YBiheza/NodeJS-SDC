import {describe, it, expect, vi } from 'vitest'
import { mock } from 'node:test'
import { ShipmentService } from '../services/ShipmentService'
import { IShipment } from '../interfaces/IShipment'
import { ShipmentRepository } from '../repositories/ShipmentRepository'

describe ('Shipment Repo methods', () => {
    it('should return the input value from DB', async () => {
        const repo = new ShipmentRepository()
        const serv = new ShipmentService(repo)

        const ship: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'tomatoes', unit: 243}
            ],
            date: new Date ('2026-04-26T10:00:00Z')
        }

        const res = await serv.registerShipment(ship) 

        expect(res[0]).toEqual({
            id: 4,
            targetWarehouse: 'south',
            ingredient_id: 'tomatoes',
            unit: 243,
            date: new Date('2026-04-26T10:00:00Z')
        })
    })
    it('should return the element from DB according to the id', async () => {
        const repo = new ShipmentRepository()

        const ship: IShipment = {
            targetWarehouse: 'south',
            ingredients: [
                {id: 'sausages', unit: 257}
            ],
            date: new Date ('2026-04-26T11:00:00Z')
        }

        const res = await repo.getShipmentById(1) 

        expect(res).toEqual({
            id: 1,
            targetWarehouse: 'north',
            ingredient_id: 'milk',
            unit: 200,
            date: new Date('2026-04-25T12:00:00Z')
        })
    })
    it('should return all elements from the DB', async () => {
        const repo = new ShipmentRepository()

        const shipment1: IShipment = {
            targetWarehouse: 'south',
            ingredients: [{id: 'tomatoes', unit: 100}],
            date: new Date('2026-04-25T12:00:00Z')
        }

        const shipment2: IShipment = {
            targetWarehouse: 'south',
            ingredients: [{id: 'cheese', unit: 200}],
            date: new Date('2026-04-25T12:20:00Z')
        }

        await repo.createShipment(shipment1)
        await repo.createShipment(shipment2)
        const res = await repo.getAllShipments() 

        expect(res).toHaveLength(6)
    })
    it('should delete the element from DB according to the id', async () => {
        const repo = new ShipmentRepository()

        const res = await repo.deleteById(7) 

        expect(res).toEqual({
            id: 7,
            targetWarehouse: 'south',
            ingredient_id: 'tomatoes',
            unit: 100,
            date: new Date('2026-04-25T12:00:00Z')
        })
    })
    it('should throw an error because no such id in DB', async () => {
        const repo = new ShipmentRepository()

        await expect(() => repo.getShipmentById(27)).rejects.toThrow()
        
    })
    it('should throw an error because no such id in DB', async () => {
        const repo = new ShipmentRepository()

        await expect(() => repo.deleteById(27)).rejects.toThrow()
        
    })
   it('should throw an error because the DB is empty', async () => {
        const repo = new ShipmentRepository()

        await expect(() => repo.getAllShipments()).rejects.toThrow()
        
    })
})


