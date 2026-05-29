import type { TCountry } from "../types/TCountry";
import type { TStatus } from "../types/TStatus"

export interface IOrder {
  item: string[] | [],
  country: TCountry,
  date: Date,
  price: number,
  status: TStatus
}