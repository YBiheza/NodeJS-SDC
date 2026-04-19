import { IOrder } from "./IOrder";

export interface IStrategy {
    calculate(order: IOrder): number;
}