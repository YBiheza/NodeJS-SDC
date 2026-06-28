import { describe, it, expect, vi } from 'vitest';
import { OrderService } from '../../../order-service/OrderService.js';
import type { IOrder } from '../interfaces/IOrder.js';
import { mock } from 'node:test';

describe('OrderService - PickHours-off', () => {
    it('should return 90 as a price after pickhours-off discount in US', async () => {
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                id: 1,
                item: ['tomatoes', 'sausages', 'peperoni'],
                totalPrice: 100,
                country: 'US',
                date: new Date(2026, 3, 8, 15, 0, 0),
                discount: 0.1,
                finalPrice: 90,
            })
        } 

        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'US',
            date: new Date(2026, 3, 8, 15, 0, 0),
            price: 100,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(90)
        expect(mockRepo.create).toHaveBeenCalled()

    }),
    it('should return 93 as a price after pickhours-off discount in LT', async () => { 
        const mockRepo = {
            create: vi.fn().mockResolvedValue({
                id: 1,
                item: ['tomatoes', 'sausages', 'peperoni'],
                totalPrice: 100,
                country: 'LT',
                date: new Date(2026, 3, 8, 17, 0, 0),
                discount: 0.1,
                finalPrice: 90,
            })
        }
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'LT',
            date: new Date(2026, 3, 8, 17, 0, 0),
            price: 100,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(93)
        expect(mockRepo.create).toHaveBeenCalled()

    })
    it('should return 85 as a price after pickhours-off discount in BY', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'BY',
            date: new Date(2026, 3, 8, 13, 0, 0),
            price: 100,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(85)
        expect(mockRepo.create).toHaveBeenCalled()

    })
    it('should return 95 as a price after pickhours-off discount in DE', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'DE',
            date: new Date(2026, 3, 8, 13, 0, 0),
            price: 100,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(95)
        expect(mockRepo.create).toHaveBeenCalled()
    })
})

describe('OrderService - PickHours-on', () => {
    const mockRepo = {
      create: vi.fn().mockResolvedValue({
        id: 1,
        item: ['tomatoes', 'sausages', 'peperoni'],
        totalPrice: 100,
        country: 'US',
        date: new Date(2026, 3, 8, 15, 0, 0),
        discount: 0.1,
        finalPrice: 90,
      })
    }
    it('should return 100 as a price in pickhours in US', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'US',
            date: new Date(2026, 3, 8, 12, 30, 0),
            price: 100,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(100)
        expect(mockRepo.create).toHaveBeenCalled()
    }),
    it('should return 100 as a price in pickhours in LT', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'LT',
            date: new Date(2026, 3, 8, 14, 0, 0),
            price: 100,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(100)
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should return 100 as a price in pickhours in BY', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'BY',
            date: new Date(2026, 3, 8, 16, 59, 0),
            price: 100,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(100)
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should return 95 as a price after pickhours-off discount in DE', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'DE',
            date: new Date(2026, 3, 8, 12, 0, 0),
            price: 100,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(95)
        expect(mockRepo.create).toHaveBeenCalled()
    })
})

describe('OrderService - PrincipalCost', () => {
    const mockRepo = {
      create: vi.fn().mockResolvedValue({
        id: 1,
        item: ['tomatoes', 'sausages', 'peperoni'],
        totalPrice: 100,
        country: 'US',
        date: new Date(2026, 3, 8, 15, 0, 0),
        discount: 0.1,
        finalPrice: 90,
      })
    }
    it('should return 880 as a price after principal cost disc in US', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'US',
            date: new Date(2026, 3, 8, 12, 30, 0),
            price: 1000,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(880)
        expect(mockRepo.create).toHaveBeenCalled()
    }),
    it('should return 540 as a price after principal cost disc in LT', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'LT',
            date: new Date(2026, 3, 8, 14, 0, 0),
            price: 600,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(540)
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should return 850 as a price after principal cost disc in BY', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'BY',
            date: new Date(2026, 3, 8, 16, 59, 0),
            price: 1000,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(850)
        expect(mockRepo.create).toHaveBeenCalled()

    })
    it('should return 186 as a price after principal cost disc in DE', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'DE',
            date: new Date(2026, 3, 8, 12, 0, 0),
            price: 200,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(186)
        expect(mockRepo.create).toHaveBeenCalled()

    })
})

describe('OrderService - Max discount', () => {
    const mockRepo = {
      create: vi.fn().mockResolvedValue({
        id: 1,
        item: ['tomatoes', 'sausages', 'peperoni'],
        totalPrice: 100,
        country: 'US',
        date: new Date(2026, 3, 8, 15, 0, 0),
        discount: 0.1,
        finalPrice: 90,
      })
    }
    it('should return 880 as a price after checking max disc(12%) in US', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'US',
            date: new Date(2026, 3, 8, 11, 30, 0),
            price: 1000,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(880)
        expect(mockRepo.create).toHaveBeenCalled()
    }),
    it('should return 540 as a price after checking max disc(10%) in LT', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'LT',
            date: new Date(2026, 3, 8, 11, 0, 0),
            price: 600,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(540)
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should return 850 as a price after checking max disc(15%) in BY', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'BY',
            date: new Date(2026, 3, 8, 14, 59, 0),
            price: 1000,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(850)
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should return 186 as a price after checking max disc(7%) in DE', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'DE',
            date: new Date(2026, 3, 8, 12, 0, 0),
            price: 200,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(186)
        expect(mockRepo.create).toHaveBeenCalled()
    })
})

describe('OrderService - Max discount', () => {
    const mockRepo = {
      create: vi.fn().mockResolvedValue({
        id: 1,
        item: ['tomatoes', 'sausages', 'peperoni'],
        totalPrice: 100,
        country: 'US',
        date: new Date(2026, 3, 8, 15, 0, 0),
        discount: 0.1,
        finalPrice: 90,
      })
    }
    it('should return 880 as a price after checking max disc(12%) in US', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'US',
            date: new Date(2026, 3, 8, 11, 30, 0),
            price: 1000,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(880)
        expect(mockRepo.create).toHaveBeenCalled()
    }),
    it('should return 540 as a price after checking max disc(10%) in LT', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'LT',
            date: new Date(2026, 3, 8, 11, 0, 0),
            price: 600,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(540)
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should return 850 as a price after checking max disc(15%) in BY', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'BY',
            date: new Date(2026, 3, 8, 14, 59, 0),
            price: 1000,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(850)
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should return 186 as a price after checking max disc(7%) in DE', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'DE',
            date: new Date(2026, 3, 8, 12, 0, 0),
            price: 200,
        };

        const result = await service.placeOrder(order)
        expect(result.finalPrice).toBe(186)
        expect(mockRepo.create).toHaveBeenCalled()
    })
})

describe('OrderService - Max discount', () => {
    const mockRepo = {
      create: vi.fn().mockResolvedValue({
        id: 1,
        item: ['tomatoes', 'sausages', 'peperoni'],
        totalPrice: 100,
        country: 'US',
        date: new Date(2026, 3, 8, 15, 0, 0),
        discount: 0.1,
        finalPrice: 90,
      })
    }
    it('should throw an error outside of working hours in US', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'US',
            date: new Date(2026, 3, 8, 8, 30, 0),
            price: 1000,
        };

        await expect(() => service.placeOrder(order)).rejects.toThrow()
        expect(mockRepo.create).toHaveBeenCalled()
    }),
    it('should throw an error outside of working hours in LT', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'LT',
            date: new Date(2026, 3, 8, 18, 0, 0),
            price: 600,
        };

        await expect(() => service.placeOrder(order)).rejects.toThrow()
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should throw an error outside of working hours in BY', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'BY',
            date: new Date(2026, 3, 8, 17, 13, 0),
            price: 1000,
        };

        await expect(() => service.placeOrder(order)).rejects.toThrow()
        expect(mockRepo.create).toHaveBeenCalled()
    })
    it('should throw an error outside of working hours in DE', async () => { 
        const service = new OrderService(mockRepo as any)
        
        const order: IOrder = {
            item: ['tomatoes', 'sausages', 'peperoni'],
            country: 'DE',
            date: new Date(2026, 3, 8, 16, 30, 0),
            price: 200,
        };

        await expect(() => service.placeOrder(order)).rejects.toThrow()
        expect(mockRepo.create).toHaveBeenCalled()
    })
})