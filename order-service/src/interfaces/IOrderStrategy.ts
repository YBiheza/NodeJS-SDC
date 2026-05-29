import { IOrder } from "./IOrder";

export interface IOrderStrategy {
    calculate(order: IOrder): number;
}