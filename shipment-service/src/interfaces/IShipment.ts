import type { IIngredient } from "./IIngredients"
import type { TWarehouse } from "../types/TWarehouse"

export interface IShipment {
    targetWarehouse: TWarehouse,
    ingredients: IIngredient[],
    date: Date
}