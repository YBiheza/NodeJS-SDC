import type { TCountry } from "../services/OrderService";

export interface IOrder {
  item: string[] | [],
  country: TCountry,
  date: Date,
  price: number,
}