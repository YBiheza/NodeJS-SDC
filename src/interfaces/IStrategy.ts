import type { TStrategy } from "../types/TStrategy"

export interface IStrategy {
    check: TStrategy
import { IOrder } from "./IOrder";

export interface IStrategy {
    calculate(order: IOrder): number;
}