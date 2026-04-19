import type { IOrder } from "../interfaces/IOrder"
import type { IHours } from "../interfaces/IHours"
import type { IStrategy } from "../interfaces/IStrategy"
import { db } from '../db'
import { orders } from '../db/schema'
import { OrderRepository } from "../repositories/OrderRepository"

export type TCountry = 'US' | 'LT' | 'BY' | 'DE'

const workHours: Record<TCountry, IHours> = {
    US: {start: 9, finish: 17},
    LT: {start: 9, finish: 18},
    BY: {start: 8, finish: 17},
    DE: {start: 7, finish: 16},
}

const pickHours = {
    US: {start: 12, finish: 13, disc: 0.1},
    LT: {start: 14, finish: 15, disc: 0.07},
    BY: {start: 16, finish: 17, disc: 0.15},
    DE: {start: 11, finish: 12, disc: 0.05},
}

const principalCost = {
    US: {price: 100, disc: 0.12},
    LT: {price: 300, disc: 0.1},
    BY: {price: 500, disc: 0.15},
    DE: {price: 150, disc: 0.07},
}

function isCountry(country: string): country is TCountry {
  return country in pickHours
}


function checkWorkHours (date: Date, country: TCountry) {
    const hour = date.getHours()
    const loc = workHours[country]

    if(!loc) {
        throw new Error ('The order is not available in your region')
    }
    return (hour >= loc.start && hour < loc.finish)
}

    
function checkPickHours (date: Date, country: TCountry) {
    const hour = date.getHours()
    const loc = pickHours[country]

    if(!loc) {
        throw new Error ('The order is not available in your region')
    }

    return (hour >= loc.start && hour < loc.finish) 
}

function checkTotalSum (sum: number, country: TCountry) {
    const loc = principalCost[country]
    return (sum > loc.price) 
}

class PickDiscount {
    calculate(order: IOrder) {
        const loc = pickHours[order.country]
        if (!checkPickHours(order.date, order.country)) {
            return loc.disc;
        }
    return 0
    }
}

class TotalDiscount {
    calculate(order: IOrder) {
        const loc = principalCost[order.country]
        if (checkTotalSum(order.price, order.country)) {
            return loc.disc;
        }
    return 0
    }
}

class DiscountStrategy {
  calculate(order: IOrder) {
    return 0
  }
}

export class OrderService {
    private strategies: IStrategy[]

    constructor(private orderRepository: OrderRepository) {
        this.strategies = [
            new PickDiscount(),
            new TotalDiscount()
        ]
    }
    
    //private orderRepository = new OrderRepository()
    

    async placeOrder(orderData: IOrder) {
        if (!checkWorkHours(orderData.date, orderData.country)) {
            throw new Error("Orders are not accepted outside working hours")
        }

        const discounts = this.strategies.map((strategy) => strategy.calculate(orderData))
        const disc = Math.max(...discounts)

        const finalPrice = orderData.price * (1 - disc)
        
        const order = await this.orderRepository.create({
            item: orderData.item,
            totalPrice: orderData.price,
            country: orderData.country,
            date: orderData.date,
            discount: disc,
            finalPrice: finalPrice,
        })
        return order
    }
    async GetOrderById (id: number) {
        const resById = await this.orderRepository.getOrderById(id)            
        return resById
    }

    async GetAll() {
        const items = await this.orderRepository.getAll()
        return items
    }

    async Delete(id: number) {
        return await this.orderRepository.deleteById(id)
    }
}